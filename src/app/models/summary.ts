export interface Summary {
  totalExpenses: number;
  totalAmount: number;
  categories: Record<string, number>;
  statuses: Record<string, number>;
}
