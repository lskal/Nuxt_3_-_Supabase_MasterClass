export const DEFAULT_TREND_COLOR: TTrendColor = "gray";

export type TTrendColor = "green" | "red" | "yellow" | "blue" | "gray" | "pink";
export type TTransactionalView = (typeof transactionalViewOptions)[number];
export type TCategory = (typeof categoriesOptions)[number];
export type TTransactionType = (typeof typesOptions)[number];
export type TTransactionRow = {
  id: number;
  created_at: string;
  amount: number;
  type: TTransactionType;
  description: string | null;
  category: TCategory | null;
  user_id: string;
};

export const transactionalViewOptions = ["Yearly", "Monthly", "Daily"] as const;

export const categoriesOptions = [
  "Food",
  "Housing",
  "Car",
  "Entertainment",
] as const;

export const typesOptions = [
  "Income",
  "Expense",
  "Saving",
  "Investment",
] as const;

export const colorMap: Record<TTrendColor, string> = {
  green: "text-green-600 dark:text-green-400",
  red: "text-red-600 dark:text-red-400",
  yellow: "text-yellow-600 dark:text-yellow-400",
  blue: "text-blue-600 dark:text-blue-400",
  gray: "text-gray-600 dark:text-gray-400",
  pink: "text-pink-600 dark:text-pink-400",
};

export const getTrendColorClass = (color?: TTrendColor): string =>
  colorMap[color ?? DEFAULT_TREND_COLOR];

export const getIconColorClass = (condition: boolean) =>
  condition ? colorMap.green : colorMap.red;

export const getIcon = (condition: boolean, icon1: string, icon2: string) =>
  condition ? icon1 : icon2;

export const normalizeStringValue = (value: unknown): string => {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase();
};

export const isIncomeType = (value: unknown): boolean => {
  const typeValue = normalizeStringValue(value);
  return typeValue === "income";
};
