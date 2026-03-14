import type { ClearedLevelStatSummary } from '~/types/levels';
import { LEVELS_ROOT_URL } from '~/constants/levelData';

export function useClearSummary() {
  const summary = useState<Partial<ClearedLevelStatSummary> | null>(
    'clear-summary',
    () => null,
  );

  async function load() {
    if (summary.value !== null) {
      return summary.value;
    }
    const data = (await fetch(`${LEVELS_ROOT_URL}/clear_summary.json`).then(
      (r) => r.json(),
    )) as Partial<ClearedLevelStatSummary>;
    summary.value = data;
    return data;
  }

  return { summary: readonly(summary), load };
}
