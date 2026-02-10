export function useContentPage(collection: "pages" | "blog") {
  const route = useRoute();

  const { data: page } = useAsyncData(route.path, () =>
    // IMPORTANT: collection name must match content.config.ts --> "content: defineCollection({"
    queryCollection(collection).path(route.path).first(),
  );

  watchEffect(() => {
    if (!page.value) return;
    useSeoMeta({
      title: page.value.title,
      description: page.value.description,
      ogTitle: page.value.title,
      ogDescription: page.value.description,
    });
  });

  return { page };
}

type TArticlesOptions = {
  limit?: number;
};

type TListedPost = {
  path: string;
  title?: string;
  publishedAt?: string;
  year?: number;
  displayYear?: boolean;
};

export const useListArticles = (options: TArticlesOptions = {}) => {
  const { limit } = options;

  const { data: rawPosts } = useAsyncData("blog-list", () =>
    queryCollection("blog")
      .select("path", "title", "publishedAt")
      .where("path", "<>", "/blog")
      .order("publishedAt", "DESC")
      .all(),
  );

  const posts = computed<TListedPost[]>(() => {
    const items = ((rawPosts.value ?? []) as TListedPost[]).slice(
      0,
      limit ?? undefined,
    );

    let lastYear: number | null = null;

    return items.map((post) => {
      const year = post.publishedAt
        ? new Date(post.publishedAt.replace(" ", "T")).getFullYear()
        : undefined;

      const displayYear = year != null && year !== lastYear;
      if (year != null) lastYear = year;

      return { ...post, year, displayYear };
    });
  });

  return { posts };
};
