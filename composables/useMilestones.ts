import milestones from '~/assets/milestones.json';
import type { MajorMilestone, MinorMilestone } from '~/types/players';

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

  return {
    yearMilestones,
    monthMilestones,
  };
}
