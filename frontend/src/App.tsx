import { useState, useEffect } from 'react';
import {
  MantineProvider,
  Container,
  Grid,
  Stack,
} from '@mantine/core';
import { SongsTable } from './components/SongsTable';
import { InvoiceHistory } from './components/InvoiceHistory';
import { Header } from './components/Header';
import { NotificationBanner } from './components/NotificationBanner';
import { Song, Invoice, isApiError } from './types.ts';
import { songsApi } from './api/songsApi';
import { useInvoiceStore } from './store/invoiceStore';

function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { invoices, addInvoice, getInvoiceForSong } = useInvoiceStore();

  // Fetch songs from backend
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const data = await songsApi.getSongs();
        setSongs(data);
        setError(null);
      } catch (err) {
        if (isApiError(err)) {
          setError(`Failed to fetch songs. Status: ${err.statusCode}, Message: ${err.message}`);
        } else if (err instanceof Error) {
          setError(`Failed to fetch songs. Error: ${err.message}`);
        } else {
          setError('An unknown error occurred while fetching songs');
        }
        console.error('Error fetching songs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchSongs, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleIssueInvoice = (song: Song) => {
    const invoice: Invoice = {
      id: Date.now().toString(),
      songId: song.id,
      songName: song.name,
      author: song.author,
      progress: song.progress,
      issuedAt: new Date().toISOString(),
    };

    addInvoice(invoice);

    // Show notification
    setNotification(`Invoice issued for "${song.name}" by ${song.author}`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <MantineProvider defaultColorScheme="light">
      <Container size="xl" py="md">
        <Header invoiceCount={invoices.length} />

        {/* Notification */}
        <NotificationBanner 
          message={notification}
          onClose={() => setNotification(null)}
          variant="success"
        />

        {/* Error Alert */}
        <NotificationBanner 
          message={error}
          onClose={() => setError(null)}
          variant="error"
        />

        {/* Main Content */}
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <Stack>
              <SongsTable
                songs={songs}
                loading={loading}
                onIssueInvoice={handleIssueInvoice}
                getInvoiceForSong={getInvoiceForSong}
              />
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 4 }}>
            <InvoiceHistory invoices={invoices} />
          </Grid.Col>
        </Grid>
      </Container>
    </MantineProvider>
  );
}

export default App;