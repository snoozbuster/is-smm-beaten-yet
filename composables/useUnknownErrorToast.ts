export default function useUnknownErrorToast() {
  const toast = useToast();

  return () => {
    toast.add({
      severity: 'error',
      summary: 'Your princess is in another castle',
      detail:
        'Bowser has kidnapped the rest of the site. Try checking your internet connection and then refreshing the page.',
    });
  };
}
