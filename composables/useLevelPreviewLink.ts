/**
 * Returns the path for the level preview (modal) link based on current route.
 * From a player page (/players/:nnid) links to /players/:nnid/:levelId;
 * otherwise links to /levels/:levelId.
 */
export function useLevelPreviewTo(levelId: MaybeRef<string>) {
  const route = useRoute();
  return computed(() => {
    const id = unref(levelId);
    const nnid = route.params.nnid;
    if (nnid && typeof nnid === 'string') {
      return `/players/${nnid}/${id}`;
    }
    return `/levels/${id}`;
  });
}
