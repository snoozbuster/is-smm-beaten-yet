import { DATA_ROOT_URL } from '~/constants/levelData';
import type { UnclearedLevel } from '~/types/levels';

export default function useUnclearedLevels({ defer = true } = {}) {
  const {
    data: uncleared,
    pending,
    execute,
  } = useFetch<UnclearedLevel[]>(`${DATA_ROOT_URL}/uncleared.json`, {
    key: 'uncleared',
    deep: false,
    immediate: !defer,
    server: !defer,
    lazy: true,
    default: () => [],
  });

  return {
    uncleared,
    pending,
    load: execute,
  };
}
