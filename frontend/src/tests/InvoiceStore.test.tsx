import { renderHook, act } from '../utils/testUtils.tsx';
import { useInvoiceStore } from '../store/invoiceStore';

describe('Invoice Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useInvoiceStore.setState({ invoices: [] });
  });

  test('should add invoice', () => {
    const { result } = renderHook(() => useInvoiceStore());

    const mockInvoice = {
      id: '1',
      songId: 101,
      songName: 'Locked club',
      author: 'Deftones',
      progress: 0.4,
      issuedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    };

    act(() => {
      result.current.addInvoice(mockInvoice);
    });

    expect(result.current.invoices).toHaveLength(1);
    expect(result.current.invoices[0]).toEqual(mockInvoice);
  });

  test('should return most recent invoice for song', () => {
    const { result } = renderHook(() => useInvoiceStore());

    const oldInvoice = {
      id: '1',
      songId: 101,
      songName: 'Locked club',
      author: 'Deftones',
      progress: 0.4,
      issuedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    };
    const newInvoice = {
      id: '2',
      songId: 102,
      songName: 'Dreaming',
      author: 'Mansur Brown',
      progress: 0.8,
      issuedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    };

    act(() => {
      result.current.addInvoice(oldInvoice);
      result.current.addInvoice(newInvoice);
    });

    const mostRecent = result.current.getInvoiceForSong(102);
    expect(mostRecent).toEqual(newInvoice);
  });
});