export type TTrendColor = "green" | "red" | "yellow" | "blue";

export const transactionalViewOptions = ["Yearly", "Monthly", "Daily"];

export const colorMap: Record<TTrendColor, string> = {
  green: "text-green-600 dark:text-green-400",
  red: "text-red-600 dark:text-red-400",
  yellow: "text-yellow-600 dark:text-yellow-400",
  blue: "text-blue-600 dark:text-blue-400",
};
