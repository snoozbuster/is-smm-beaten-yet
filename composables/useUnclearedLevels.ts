import { DateTime } from 'luxon';
import { DATA_ROOT_URL, SHUTDOWN_DATE } from '~/constants/levelData';
import type { UnclearedLevel } from '~/types/levels';

// this is way sketchy
const __DEBUG_0PERCENT_MODE__ = false;

export function useTheAnswer() {
  const { data: theAnswer, pending } = useAsyncData<
    UnclearedLevel[],
    Error,
    'Yes' | 'Not yet' | 'No'
  >('the-answer', () => $fetch(`${DATA_ROOT_URL}/uncleared.json`), {
    deep: false,
    immediate: true,
    server: true,
    lazy: true,
    transform: (levels) =>
      !levels.length || (__DEBUG_0PERCENT_MODE__ && process.dev)
        ? 'Yes'
        : DateTime.now() < DateTime.fromISO(SHUTDOWN_DATE)
          ? 'Not yet'
          : 'No',
  });

  return {
    theAnswer,
    pending,
  };
}

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
