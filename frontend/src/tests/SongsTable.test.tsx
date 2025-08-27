import { render, screen, fireEvent } from '../utils/testUtils.tsx';
import { SongsTable } from '../components/SongsTable';
import { Song, Invoice } from '../types';

describe('Songs Table', () => {
  const mockSongs: Song[] = [
    { id: 1, name: 'Locked club', author: 'Deftones', progress: 0.4 },
    { id: 2, name: 'Dreaming', author: 'Mansur Brown', progress: 0.8 },
  ];

  const mockInvoice: Invoice = {
    id: '1',
    songId: 1,
    songName: 'Locked club',
    author: 'Deftones',
    progress: 0.3,
    issuedAt: new Date().toISOString(),
  };

  const mockOnIssueInvoice = jest.fn();
  const mockGetInvoiceForSong = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls onIssueInvoice with correct song when issue button is clicked', () => {
    render(
      <SongsTable
        songs={mockSongs}
        loading={false}
        onIssueInvoice={mockOnIssueInvoice}
        getInvoiceForSong={mockGetInvoiceForSong}
      />
    );

    const buttons = screen.getAllByRole('button', { name: /issue invoice/i });
    fireEvent.click(buttons[0]);
    expect(mockOnIssueInvoice).toHaveBeenCalledWith(mockSongs[0]);
  });

  it('shows loading state when loading is true', () => {
    render(
      <SongsTable
        songs={[]}
        loading={true}
        onIssueInvoice={mockOnIssueInvoice}
        getInvoiceForSong={mockGetInvoiceForSong}
      />
    );
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('displays correct invoice information when getInvoiceForSong returns an invoice', () => {
    mockGetInvoiceForSong.mockImplementation((id) => 
      id === 1 ? mockInvoice : undefined
    );

    render(
      <SongsTable
        songs={mockSongs}
        loading={false}
        onIssueInvoice={mockOnIssueInvoice}
        getInvoiceForSong={mockGetInvoiceForSong}
      />
    );

    expect(mockGetInvoiceForSong).toHaveBeenCalledTimes(2);
    expect(screen.getByText('Last issued:')).toBeInTheDocument();
  });
});
