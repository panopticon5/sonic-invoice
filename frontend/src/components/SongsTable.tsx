import {
  Table,
  Button,
  Progress,
  Paper,
  Title,
  Text,
  Group,
  Badge,
  Stack,
  Skeleton,
  Center,
  Tooltip
} from '@mantine/core';
import { IconFileInvoice, IconClock, IconTrendingUp } from '@tabler/icons-react';
import { Invoice, Song } from '../types';

interface SongsTableProps {
  songs: Song[];
  loading: boolean;
  onIssueInvoice: (song: Song) => void;
  getInvoiceForSong: (songId: number) => Invoice | undefined;
}

export const SongsTable = ({
                                                        songs,
                                                        loading,
                                                        onIssueInvoice,
                                                        getInvoiceForSong,
                                                      }: SongsTableProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatProgress = (progress: number): string => {
    return `${(progress * 100).toFixed(0)}%`;
  };

  const getProgressColor = (progress: number): string => {
    if (progress < 0.3) return 'red';
    if (progress < 0.7) return 'yellow';
    return 'green';
  };

  if (loading && songs.length === 0) {
    return (
      <Paper shadow="sm" p="lg" withBorder>
        <Title order={2} mb="md">Songs & Royalty Calculations</Title>
        <Stack data-testid="loading-skeleton">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} height={50} />
          ))}
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper shadow="sm" p="lg" withBorder>
      <Group justify="space-between" mb="md">
        <Title order={2}>Songs & Royalty Calculations</Title>
        <Badge variant="dot" color="green">
          Live Updates
        </Badge>
      </Group>

      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Song Name</Table.Th>
            <Table.Th>Author</Table.Th>
            <Table.Th style={{ width: '200px' }}>Progress</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {songs.map((song: Song) => {
            const invoice = getInvoiceForSong(song.id);
            const progressChanged = invoice && Math.abs(song.progress - invoice.progress) > 0.01;

            return (
              <Table.Tr key={song.id}>
                <Table.Td>
                  <Badge variant="light">{song.id}</Badge>
                </Table.Td>
                <Table.Td>
                  <Text fw={500}>{song.name}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{song.author}</Text>
                </Table.Td>
                <Table.Td>
                  <Stack gap="xs">
                    <Group gap="xs">
                      <Progress
                        value={song.progress * 100}
                        color={getProgressColor(song.progress)}
                        size="lg"
                        radius="xl"
                        style={{ flex: 1 }}
                        striped
                        animated
                      />
                      <Text size="sm" fw={600}>
                        {formatProgress(song.progress)}
                      </Text>
                    </Group>
                    {progressChanged && (
                      <Tooltip label="Progress has changed since last invoice">
                        <Badge
                          size="sm"
                          variant="light"
                          color="orange"
                          leftSection={<IconTrendingUp size={12} />}
                        >
                          Updated
                        </Badge>
                      </Tooltip>
                    )}
                  </Stack>
                </Table.Td>
                <Table.Td>
                  <Stack gap="xs">
                    <Button
                      size="sm"
                      leftSection={<IconFileInvoice size={16} />}
                      onClick={() => onIssueInvoice(song)}
                      variant={invoice ? 'light' : 'filled'}
                    >
                      Issue Invoice
                    </Button>

                    {invoice && (
                      <Paper p="xs" bg="gray.0" radius="sm">
                        <Stack gap={4}>
                          <Group gap="xs">
                            <IconClock size={14} color="gray" />
                            <Text size="xs" c="dimmed">Last issued:</Text>
                          </Group>
                          <Text size="xs" fw={500}>
                            {formatDate(invoice.issuedAt)}
                          </Text>
                          <Badge
                            size="sm"
                            variant="outline"
                            color="blue"
                          >
                            {formatProgress(invoice.progress)}
                          </Badge>
                        </Stack>
                      </Paper>
                    )}
                  </Stack>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>

      {songs.length === 0 && !loading && (
        <Center py="xl">
          <Text c="dimmed">No songs available</Text>
        </Center>
      )}
    </Paper>
  );
};