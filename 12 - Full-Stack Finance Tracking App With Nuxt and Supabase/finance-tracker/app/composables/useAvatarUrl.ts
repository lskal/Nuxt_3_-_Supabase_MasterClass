// import { computed } from "vue";

// export const useAvatarUrl = (path: Ref<string | null | undefined>) => {
//   const supabase = useSupabaseClient();

//   return computed(() => {
//     const p = path.value;
//     if (!p) return null;

//     const { data } = supabase.storage.from("avatars").getPublicUrl(p);
//     return data.publicUrl;
//   });
// };

import { computed, type Ref } from "vue";
import type { Database } from "~/types/database.types";

export const useAvatarUrl = (path: Ref<string | null>) => {
  const supabase = useSupabaseClient<Database>();

  return computed(() => {
    if (!path.value) return null;
    const { data } = supabase.storage.from("avatars").getPublicUrl(path.value);
    return data.publicUrl ?? null;
  });
};
