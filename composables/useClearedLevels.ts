import { LEVELS_ROOT_URL } from '~/constants/levelData';
import type { ClearedLevel } from '~/types/levels';

/**
 * Fetches the full cleared level list (or uses cached from levels page) and
 * returns the single cleared level matching levelId. Shares cache key with
 * the levels list page so cleared.json is only fetched once.
 */
export function useClearedLevel(levelId: MaybeRef<string>) {
  const { data: clearedLevels, pending } = useAsyncData<ClearedLevel[]>(
    'levels-cleared',
    () => $fetch(`${LEVELS_ROOT_URL}/cleared.json`),
    { deep: false },
  );

  const level = computed(() =>
    clearedLevels.value?.find((l) => l.levelId === unref(levelId)),
  );

  return {
    level,
    pending,
  };
}
