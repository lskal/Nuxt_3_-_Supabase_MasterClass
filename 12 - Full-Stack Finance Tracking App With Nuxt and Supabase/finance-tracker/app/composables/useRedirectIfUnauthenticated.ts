export const useRedirectIfUnauthenticated = (to = "/login") => {
  const user = useSupabaseUser();

  watch(
    user,
    (u) => {
      if (!u) navigateTo(to);
    },
    { immediate: true },
  );
};
