import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Invoice, InvoiceStore } from '../types';

export const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set, get) => ({
      invoices: [],

      addInvoice: (invoice: Invoice): void => {
        set((state: InvoiceStore) => ({
          invoices: [...state.invoices, invoice]
        }));
      },

      getInvoiceForSong: (songId: number): Invoice => {
        const { invoices } = get();
        // Return the most recent invoice for this song
        const songInvoices = invoices
          .filter(inv => inv.songId === songId)
          .sort((a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime());

        return songInvoices[0];
      }
    }),
    {
      name: 'royalty-invoices', // name of the item in localStorage
    }
  )
);