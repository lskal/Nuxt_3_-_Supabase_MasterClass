import {
  startOfYear,
  endOfYear,
  sub,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { computed } from "vue";

export const useSelectedTimePeriod = (period: Ref<string>) => {
  const dates = computed(() => {
    switch (period.value) {
      case "Yearly":
        return {
          current: {
            from: startOfYear(new Date()),
            to: new Date(),
          },
          previous: {
            from: startOfYear(sub(new Date(), { years: 1 })),
            to: endOfYear(sub(new Date(), { years: 1 })),
          },
        };

      case "Monthly":
        return {
          current: {
            from: startOfMonth(new Date()),
            to: new Date(),
          },
          previous: {
            from: startOfMonth(sub(new Date(), { months: 1 })),
            to: endOfMonth(sub(new Date(), { months: 1 })),
          },
        };

      case "Daily":
        return {
          current: {
            from: startOfDay(new Date()),
            to: new Date(),
          },
          previous: {
            from: startOfDay(sub(new Date(), { days: 1 })),
            to: endOfDay(sub(new Date(), { days: 1 })),
          },
        };

      default:
        return {
          current: {
            from: startOfMonth(new Date()),
            to: new Date(),
          },
          previous: {
            from: startOfMonth(sub(new Date(), { months: 1 })),
            to: endOfMonth(sub(new Date(), { months: 1 })),
          },
        };
    }
  });

  return dates;
};
