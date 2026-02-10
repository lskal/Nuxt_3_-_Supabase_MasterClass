<script setup lang="ts">
const route = useRoute();

type TocLink = {
  id: string;
  text: string;
  depth: number;
  children?: TocLink[];
};

const props = defineProps<{
  links: TocLink[];
  level?: number;
  activeId?: string | null;
}>();

const level = computed(() => props.level ?? 0);
</script>

<template>
  <ul>
    <li
      v-for="link in links"
      :key="link.id"
      :class="['my-1', level ? 'ml-4' : '']"
    >
      <NuxtLink
        :to="{ path: route.path, hash: `#${link.id}` }"
        :class="{
          'ml-4': level,
          'text-green-600 dark:text-green-400': activeId === link.id,
        }"
        class="hover:underline"
      >
        {{ link.text }}
      </NuxtLink>

      <TocLinks
        v-if="link.children?.length"
        :links="link.children"
        :level="level + 1"
        :active-id="activeId"
      />
    </li>
  </ul>
</template>
