export const useCurrency = (amount) => {
  const currenty = computed(() => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(isRef(amount) ? amount.value : amount);
  });

  return currenty;
};
