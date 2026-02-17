import {
  startOfYear,
  endOfYear,
  startOfMonth,
  endOfMonth,
  startOfDay,
  endOfDay,
  sub,
} from "date-fns";
import { computed } from "vue";

export const useSelectedTimePeriod = (period: Ref<string>) => {
  const current = computed(() => {
    switch (period.value) {
      case "Yearly":
        return {
          from: startOfYear(new Date()),
          to: new Date(),
        };

      case "Monthly":
        return {
          from: startOfMonth(new Date()),
          to: new Date(),
        };

      case "Daily":
        return {
          from: startOfDay(new Date()),
          to: new Date(),
        };

      default:
        return {
          from: startOfMonth(new Date()),
          to: new Date(),
        };
    }
  });

  const previous = computed(() => {
    switch (period.value) {
      case "Yearly": {
        const d = sub(new Date(), { years: 1 });
        return { from: startOfYear(d), to: endOfYear(d) };
      }

      case "Monthly": {
        const d = sub(new Date(), { months: 1 });
        return { from: startOfMonth(d), to: endOfMonth(d) };
      }

      case "Daily": {
        const d = sub(new Date(), { days: 1 });
        return { from: startOfDay(d), to: endOfDay(d) };
      }

      default: {
        const d = sub(new Date(), { months: 1 });
        return { from: startOfMonth(d), to: endOfMonth(d) };
      }
    }
  });

  return { current, previous };
};
