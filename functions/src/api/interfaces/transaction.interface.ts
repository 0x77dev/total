export interface Transaction {
  id: string;
  title: string;
  description?: string;
  amount: number;
  currency: string;
  timestamp: Date;
  addedBy?: "automated" | "user";
  tags?: string[];
}

export default Transaction;
