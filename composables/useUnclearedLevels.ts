import { DATA_ROOT_URL } from '~/constants/levelData';
import type { UnclearedLevel } from '~/types/levels';

export function useUnclearedLevel(levelId: MaybeRef<string>) {
  const { data: level, pending } = useAsyncData<
    UnclearedLevel[],
    Error,
    UnclearedLevel | undefined
  >(
    `uncleared-${unref(levelId)}`,
    () => $fetch(`${DATA_ROOT_URL}/uncleared.json`),
    {
      deep: false,
      immediate: true,
      server: true,
      lazy: true,
      transform: (levels) =>
        levels.find((level) => level.levelId === unref(levelId)),
    },
  );

  return {
    level,
    pending,
  };
}

export default function useUnclearedLevels() {
  const {
    data: uncleared,
    pending,
    execute,
  } = useFetch<UnclearedLevel[]>(`${DATA_ROOT_URL}/uncleared.json`, {
    key: 'uncleared',
    deep: false,
    immediate: false,
    server: false,
    lazy: true,
    default: () => [],
  });

  return {
    uncleared,
    pending,
    load: execute,
  };
}
