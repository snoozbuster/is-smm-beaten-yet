import { DateTime } from 'luxon';
import { DATA_ROOT_URL, SHUTDOWN_DATE } from '~/constants/levelData';
import type { UnclearedLevel } from '~/types/levels';

const __DEBUG_0PERCENT_MODE__ =
  process.env.DEBUG_0PERCENT_MODE === 'true' && process.dev;

export async function useTheAnswer() {
  const { data } = useNuxtData('the-answer'); // in essence this pattern causes this request to be server-side only. on client it will always use cached data
  const { pending, error } = await useAsyncData<
    UnclearedLevel[],
    Error,
    'Yes' | 'Not yet' | 'No'
  >(
    'the-answer',
    async () => {
      const res = await $fetch(`${DATA_ROOT_URL}/uncleared.json`);

      if (!Array.isArray(res)) {
        console.log('Got something unexpected from AWS:', res);
        console.error('Level data is corrupt');
        throw new Error('Level data is corrupt');
      }

      return res;
    },
    {
      deep: false,
      immediate: !data.value,
      server: true,
      lazy: true,
      transform: (levels) => {
        return !levels.length || __DEBUG_0PERCENT_MODE__
          ? 'Yes'
          : DateTime.now() < DateTime.fromISO(SHUTDOWN_DATE)
            ? 'Not yet'
            : 'No';
      },
    },
  );

  if (error.value) {
    throw error.value;
  }

  return {
    theAnswer: data,
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
  const { data } = useNuxtData('uncleared');
  const { pending, error, execute } = useFetch<UnclearedLevel[]>(
    `${DATA_ROOT_URL}/uncleared.json`,
    {
      key: 'uncleared',
      deep: false,
      immediate: false,
      server: false,
      lazy: true,
      default: () => [],
    },
  );

  return {
    uncleared: computed(() => data.value ?? undefined),
    pending,
    error,
    load: execute,
  };
}
