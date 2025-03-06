import { UnclearedLevel } from '~/types/levels';

export function useUnclearedLevel(levelId: MaybeRef<string>) {
  return {
    level: ref<UnclearedLevel>(),
    pending: false,
  };
}
