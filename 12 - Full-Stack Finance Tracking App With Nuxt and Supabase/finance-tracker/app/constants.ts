export type TTrendColor = "green" | "red" | "yellow" | "blue" | "gray" | "pink";

export const transactionalViewOptions = ["Yearly", "Monthly", "Daily"] as const;

export const colorMap: Record<TTrendColor, string> = {
  green: "text-green-600 dark:text-green-400",
  red: "text-red-600 dark:text-red-400",
  yellow: "text-yellow-600 dark:text-yellow-400",
  blue: "text-blue-600 dark:text-blue-400",
  gray: "text-gray-600 dark:text-gray-400",
  pink: "text-pink-600 dark:text-pink-400",
};

export const DEFAULT_TREND_COLOR: TTrendColor = "gray";

export const getTrendColorClass = (color: unknown): string => {
  if (typeof color === "string" && color in colorMap) {
    return colorMap[color as TTrendColor];
  }
  return colorMap[DEFAULT_TREND_COLOR];
};
