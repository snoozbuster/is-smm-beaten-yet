import milestones from '~/assets/milestones.json';
import type {
  MajorMilestone,
  Milestone,
  MinorMilestone,
} from '~/types/players';

export function useMilestones() {
  const majorMilestones = useSortBy(
    milestones.majorMilestones as MajorMilestone[],
    'dateCleared',
    'asc',
  );
  const minorMilestones = useSortBy(
    milestones.monthMilestones as MinorMilestone[],
    'dateCleared',
    'asc',
  );

  const yearMilestones = useKeyBy(
    useUniqBy([...majorMilestones].reverse(), 'year'),
    'year',
  );

  const monthMilestones = useKeyBy(
    minorMilestones,
    (milestone) => `${milestone.year}-${milestone.month}`,
  );

  const autoscrollMilestone = useFind(milestones.majorMilestones, {
    name: 'Autoscroll',
  });

  /** levelId -> list of milestones for that level; major first, then minor. */
  const levelMilestones = computed<Record<string, Milestone[]>>(() => {
    const majorByLevel = useMapValues(
      useKeyBy(majorMilestones, 'levelId'),
      (m) => [m],
    );
    const minorByLevel = useMapValues(
      useKeyBy(minorMilestones, 'levelId'),
      (m) => [m],
    );

    const map = useMergeWith(
      {},
      majorByLevel,
      minorByLevel,
      (objValue, srcValue) =>
        Array.isArray(objValue) ? objValue.concat(srcValue) : srcValue,
    );

    return map;
  });

  return {
    yearMilestones,
    monthMilestones,
    autoscrollMilestone,
    levelMilestones,
  };
}
