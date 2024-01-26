import { shallowRef } from 'vue';
import { DATA_ROOT_URL } from '~/constants/levelData';
import type { UnclearedLevel } from '~/types/levels';

export default function useUnclearedLevels() {
  const uncleared = shallowRef<UnclearedLevel[]>([]);
  const load = async () =>
    (uncleared.value = await (
      await fetch(`${DATA_ROOT_URL}/uncleared.json`)
    ).json());

  return {
    uncleared,
    load,
  };
}
