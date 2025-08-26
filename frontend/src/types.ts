export interface Song {
  id: number;
  name: string;
  author: string;
  progress: number;
}

export interface Invoice {
  id: string;
  songId: number;
  songName: string;
  author: string;
  progress: number;
  issuedAt: string;
}

export interface InvoiceStore {
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  getInvoiceForSong: (songId: number) => Invoice | undefined;
}