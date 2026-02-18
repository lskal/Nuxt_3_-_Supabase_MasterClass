import { computed, type Ref } from "vue";
import { sub } from "date-fns";
import type { TTransactionalView } from "~/constants";

export type TimeRange = { from: Date; to: Date };

export const useSelectedTimePeriod = (period: Ref<TTransactionalView>) => {
  const current = computed<TimeRange>(() => {
    const now = new Date();

    switch (period.value) {
      case "Daily":
        return { from: sub(now, { hours: 24 }), to: now };

      case "Monthly":
        return { from: sub(now, { days: 30 }), to: now };

      case "Yearly":
      default:
        return { from: sub(now, { days: 365 }), to: now };
    }
  });

  const previous = computed<TimeRange>(() => {
    const now = new Date();

    switch (period.value) {
      case "Daily": {
        const to = sub(now, { hours: 24 });
        const from = sub(now, { hours: 48 });
        return { from, to };
      }

      case "Monthly": {
        const to = sub(now, { days: 30 });
        const from = sub(now, { days: 60 });
        return { from, to };
      }

      case "Yearly":
      default: {
        const to = sub(now, { days: 365 });
        const from = sub(now, { days: 730 });
        return { from, to };
      }
    }
  });

  return { current, previous };
};

// import {
//   startOfYear,
//   endOfYear,
//   startOfMonth,
//   endOfMonth,
//   startOfDay,
//   endOfDay,
//   sub,
// } from "date-fns";
// import { computed } from "vue";

// export const useSelectedTimePeriod = (period: Ref<string>) => {
//   const current = computed(() => {
//         switch (period.value) {
//       case "Yearly":
//         return {
// from: startOfYear(new Date()),
// to: endOfYear(new Date()),
// };

//       case "Monthly":
//         return {
// from: startOfMonth(new Date()),
// to: endOfMonth(new Date()),
// };

//       case "Daily":
// return {
//           from: startOfDay(new Date()),
//           to: endOfDay(new Date()),
//         };

//       default:
//         return {
// from: startOfMonth(new Date()),
// to: endOfMonth(new Date()),
// };
//     }
//   });

//   const previous = computed(() => {
//         switch (period.value) {
//       case "Yearly": {
//         const d = sub(new Date(), { years: 1 });
//         return { from: startOfYear(d), to: endOfYear(d) };
//       }

//       case "Monthly": {
//         const d = sub(new Date(), { months: 1 });
// return { from: startOfMonth(d), to: endOfMonth(d) };
//       }

//       case "Daily": {
//         const d = sub(new Date(), { days: 1 });
//         return { from: startOfDay(d), to: endOfDay(d) };
//       }

//             default: {
//         const d = sub(new Date(), { months: 1 });
//         return { from: startOfMonth(d), to: endOfMonth(d) };
//       }
//     }
//   });

//   return { current, previous };
// };
