export default defineNuxtRouteMiddleware((to, from) => {
  if (from.path === '/' && to.path !== '/') {
    // I think the layoutTransition changes in middleware are persistant across
    // navigations, so we need to reset it to the default value when we navigate
    // away from the home page to avoid the outbound animation playing in the
    // wrong direction. or something. I don't know.
    from.meta.layoutTransition = { name: 'slide-up', mode: 'default' };
  }
});
