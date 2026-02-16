export type Database = {
  public: {
    Tables: {
      transactions: {
        Row: {
          id: number;
          created_at: string;
          amount: number;
          type: "Income" | "Expense" | "Saving" | "Investment";
          description: string | null;
          category: "Food" | "Housing" | "Car" | "Entertainment" | null;
        };
        Insert: {
          id?: number;
          created_at: string;
          amount: number;
          type: "Income" | "Expense" | "Saving" | "Investment";
          description?: string | null;
          category?: "Food" | "Housing" | "Car" | "Entertainment" | null;
        };
        Update: {
          id?: number;
          created_at?: string;
          amount?: number;
          type?: "Income" | "Expense" | "Saving" | "Investment";
          description?: string | null;
          category?: "Food" | "Housing" | "Car" | "Entertainment" | null;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};
