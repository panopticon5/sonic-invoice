import {
  Paper,
  Title,
  Timeline,
  Text,
  Badge,
  Group,
  Stack,
  ScrollArea,
  Center,
  ThemeIcon,
  Progress,
  Card
} from '@mantine/core';
import { IconFileInvoice, IconUser, IconClock } from '@tabler/icons-react';
import { Invoice } from '../types';

interface InvoiceHistoryProps {
  invoices: Invoice[];
}

export const InvoiceHistory = ({ invoices }: InvoiceHistoryProps) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString('en-GB', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getProgressColor = (progress: number): string => {
    if (progress < 0.3) return 'red';
    if (progress < 0.7) return 'yellow';
    return 'green';
  };

  // Sort invoices by date (newest first)
  const sortedInvoices = [...invoices].sort((a: Invoice, b: Invoice) =>
    new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime()
  );

  return (
    <Paper shadow="sm" p="lg" withBorder h="100%">
      <Group justify="space-between" mb="md">
        <Title order={2}>Invoice History</Title>
        <Badge variant="filled" size="lg">
          {invoices.length}
        </Badge>
      </Group>

      {invoices.length === 0 ? (
        <Center py="xl">
          <Stack align="center" gap="xs">
            <ThemeIcon size="xl" variant="light" color="gray">
              <IconFileInvoice size={24} />
            </ThemeIcon>
            <Text c="dimmed" size="sm">No invoices issued yet</Text>
            <Text c="dimmed" size="xs">Click "Issue Invoice" to create one</Text>
          </Stack>
        </Center>
      ) : (
        <ScrollArea h={600} type="hover">
          <Timeline active={sortedInvoices.length - 1} bulletSize={24} lineWidth={2}>
            {sortedInvoices.map((invoice, index) => (
              <Timeline.Item
                key={invoice.id}
                bullet={<IconFileInvoice size={12} />}
                title={
                  <Group justify="space-between">
                    <Text size="sm" fw={500}>{invoice.songName}</Text>
                    <Badge size="xs" variant="light">
                      #{invoice.songId}
                    </Badge>
                  </Group>
                }
              >
                <Card p="sm" mt="xs" withBorder>
                  <Stack gap="xs">
                    <Group gap="xs">
                      <ThemeIcon size="sm" variant="light" color="blue">
                        <IconUser size={14} />
                      </ThemeIcon>
                      <Text size="xs" c="dimmed">Author:</Text>
                      <Text size="xs" fw={500}>{invoice.author}</Text>
                    </Group>

                    <Group gap="xs">
                      <ThemeIcon size="sm" variant="light" color="green">
                        <IconClock size={14} />
                      </ThemeIcon>
                      <Text size="xs" c="dimmed">Issued:</Text>
                      <Text size="xs" fw={500}>{formatDate(invoice.issuedAt)}</Text>
                    </Group>

                    <Stack gap={4}>
                      <Text size="xs" c="dimmed">Calculation Progress:</Text>
                      <Progress
                        value={invoice.progress * 100}
                        color={getProgressColor(invoice.progress)}
                        size="sm"
                        radius="xl"
                        striped
                      />
                      <Text size="xs" fw={600} ta="center">
                        {(invoice.progress * 100).toFixed(0)}% Complete
                      </Text>
                    </Stack>

                    {index === 0 && (
                      <Badge
                        size="sm"
                        variant="dot"
                        color="green"
                        fullWidth
                      >
                        Latest Invoice
                      </Badge>
                    )}
                  </Stack>
                </Card>
              </Timeline.Item>
            ))}
          </Timeline>
        </ScrollArea>
      )}
    </Paper>
  );
};