import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type Ref,
} from "vue";

type Options = {
  selector?: string; // headings to watch
  threshold?: number; // how much of heading must be visible
  rootMargin?: string; // useful for sticky headers
};

export function useActiveHeading(
  routePath: Ref<string>,
  options: Options = {},
) {
  const activeId = ref<string | null>(null);

  const selector = options.selector ?? "article h2, article h3";
  const threshold = options.threshold ?? 0.5;
  const rootMargin = options.rootMargin ?? "0px 0px -60% 0px";

  let observer: IntersectionObserver | null = null;

  const stop = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };

  const start = () => {
    if (import.meta.server) return; // SSR guard

    stop();
    activeId.value = null;

    const elements = Array.from(
      document.querySelectorAll(selector),
    ) as HTMLElement[];
    if (!elements.length) return;

    observer = new IntersectionObserver(
      (entries) => {
        // pick the first intersecting heading (stable enough with rootMargin)
        const visible = entries.find((e) => e.isIntersecting);
        if (!visible) return;

        const el = visible.target as HTMLElement;
        if (el?.id) activeId.value = el.id;
      },
      { root: null, threshold, rootMargin },
    );

    elements.forEach((el) => observer!.observe(el));
  };

  onMounted(async () => {
    await nextTick(); // wait for initial render
    start();
  });

  // re-run when route changes (new article)
  watch(routePath, async () => {
    if (import.meta.server) return;
    await nextTick(); // wait for ContentRenderer to paint
    start();
  });

  onBeforeUnmount(() => stop());

  return { activeId };
}
