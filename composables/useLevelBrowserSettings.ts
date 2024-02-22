import { useStorage } from '@vueuse/core';
import type { UnclearedLevel } from '~/types/levels';

export const LEVEL_BROWSER_COLUMNS = {
  title: 'Level name',
  uploadDate: 'Upload date',
  stars: 'Stars',
  players: 'Players',
  attempts: 'Attempts',
  creator: 'Creator',
  countryCode: 'Country',
  style: 'Style',
  theme: 'Theme',
  timer: 'Timer',
  checkpoints: 'Checkpoints',
  autoscroll: 'Autoscroll',
  hasSubworld: 'Subworld',
};

export default function useLevelBrowserSettings() {
  const legacyLevelBrowserSettings = useStorage('levelBrowser', {});

  const levelBrowserSettings = useCookie('levelBrowser', {
    default: () =>
      useAssign(
        {
          includeHackedClears: true,
          enableTranslation: true,
          disableRouletteAnimation: false,
          visibleColumns: useMapValues(
            LEVEL_BROWSER_COLUMNS,
            (_, columnId) => columnId !== 'autoscroll',
          ),
        },
        unref(legacyLevelBrowserSettings),
      ),
  });

  function shouldShowTranslation(level: UnclearedLevel) {
    return Boolean(
      unref(levelBrowserSettings).enableTranslation &&
        (level.countryCode === 'JP' || level.hacked) &&
        level.titleTranslation &&
        level.title.localeCompare(level.titleTranslation, 'en', {
          sensitivity: 'accent',
        }),
    );
  }

  return { levelBrowserSettings, shouldShowTranslation };
}
