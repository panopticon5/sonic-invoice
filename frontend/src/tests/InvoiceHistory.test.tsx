import { render, screen } from '../test-utils';
import { InvoiceHistory } from '../components/InvoiceHistory';
import { Invoice } from '../types';

describe('Invoice History', () => {
  const mockInvoices: Invoice[] = [
    {
      id: '1',
      songId: 101,
      songName: 'Test Song 1',
      author: 'Test Author 1',
      progress: 0.4,
      issuedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
      id: '2',
      songId: 102,
      songName: 'Test Song 2',
      author: 'Test Author 2',
      progress: 0.8,
      issuedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    },
  ];

  it('renders the component with title and invoice count', () => {
    render(<InvoiceHistory invoices={mockInvoices} />);
    
    expect(screen.getByText('Invoice History')).toBeInTheDocument();
    expect(screen.getByText(mockInvoices.length.toString())).toBeInTheDocument();
  });

  it('displays a message when there are no invoices', () => {
    render(<InvoiceHistory invoices={[]} />);
    
    expect(screen.getByText('No invoices issued yet')).toBeInTheDocument();
    expect(screen.getByText('Click "Issue Invoice" to create one')).toBeInTheDocument();
  });

  it('renders all invoices in the timeline', () => {
    render(<InvoiceHistory invoices={mockInvoices} />);
    
    mockInvoices.forEach(invoice => {
      expect(screen.getByText(invoice.songName)).toBeInTheDocument();
      expect(screen.getByText(`#${invoice.songId}`)).toBeInTheDocument();
      expect(screen.getByText(invoice.author)).toBeInTheDocument();
    });
  });

  it('sorts invoices by date (newest first)', () => {
    render(<InvoiceHistory invoices={mockInvoices} />);
    
    // The second invoice is newer and should appear first in the list
    const songNames = screen.getAllByText(/Test Song/);
    expect(songNames[0].textContent).toBe(mockInvoices[1].songName);
    expect(songNames[1].textContent).toBe(mockInvoices[0].songName);
  });
});
