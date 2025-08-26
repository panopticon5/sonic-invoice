import { Paper, Group, Title, Text, Badge } from '@mantine/core';
import { IconMusic } from '@tabler/icons-react';

interface HeaderProps {
  invoiceCount: number;
}

export const Header = ({ invoiceCount }: HeaderProps) => {
  return (
    <Paper shadow="sm" p="lg" mb="lg" withBorder>
      <Group justify="space-between" align="center">
        <Group>
          <IconMusic size={32} />
          <div>
            <Title order={1}>Sonic Invoice</Title>
            <Text size="sm" c="dimmed">
              Music Distribution Platform - Invoice Management
            </Text>
          </div>
        </Group>
        <Badge size="lg" variant="light">
          {invoiceCount} Invoices Issued
        </Badge>
      </Group>
    </Paper>
  );
};
