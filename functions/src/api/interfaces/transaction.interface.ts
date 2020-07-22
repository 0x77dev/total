export interface Transaction {
  id: string;
  title: string;
  description?: string;
  amount: number;
  currency: string;
  timestamp: Date;
  addedBy?: "automated" | "user";
}

export default Transaction;
