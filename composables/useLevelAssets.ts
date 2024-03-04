import { filename } from 'pathe/utils';

export default function useLevelAssets() {
  const themes = import.meta.glob('~/assets/img/themes/*.png', { eager: true });
  const themeImages = Object.fromEntries(
    Object.entries(themes).map(([key, value]) => [
      filename(key),
      value.default as string,
    ]),
  );

  const styles = import.meta.glob('~/assets/img/styles/*.png', { eager: true });
  const styleImages = Object.fromEntries(
    Object.entries(styles).map(([key, value]) => [
      filename(key),
      value.default as string,
    ]),
  );

  return {
    themeImages,
    styleImages,
  };
}
