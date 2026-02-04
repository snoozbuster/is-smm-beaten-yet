import { LEVELS_ROOT_URL } from '~/constants/levelData';
import type { ClearedLevel } from '~/types/levels';

const CLEARED_URL = `${LEVELS_ROOT_URL}/cleared.json`;

/**
 * Full cleared level list. Does not fetch immediately; call load() (e.g. in
 * onMounted) to fetch. Uses key 'cleared' for cache.
 */
export function useClearedLevels() {
  const { data } = useNuxtData<ClearedLevel[]>('cleared');
  const { pending, error, execute } = useFetch<ClearedLevel[]>(CLEARED_URL, {
    key: 'cleared',
    deep: false,
    immediate: false,
    server: false,
    lazy: true,
    default: () => [],
  });

  return {
    levels: computed(() => data.value ?? []),
    pending,
    error,
    load: execute,
  };
}

/**
 * Single cleared level by levelId. Fetches cleared.json and transforms to
 * the matching level (key per level so each detail view has its own cache entry).
 */
export function useClearedLevel(levelId: MaybeRef<string>) {
  const id = unref(levelId);
  const { data: level, pending } = useAsyncData<
    ClearedLevel[],
    Error,
    ClearedLevel | undefined
  >(
    `cleared-${id}`,
    () => $fetch(CLEARED_URL),
    {
      deep: false,
      immediate: true,
      server: true,
      lazy: true,
      transform: (levels) =>
        levels.find((l) => l.levelId === id),
    },
  );

  return {
    level,
    pending,
  };
}
