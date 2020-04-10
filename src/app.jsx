import { routes } from '@/config/config';

export function onRouteChange({ location }) {
  const item = routes.find(route => route.path === location.pathname);
  if (item) {
    document.title = `tim-${item.title}`;
  }
}
