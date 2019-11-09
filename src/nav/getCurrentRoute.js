import { get } from 'dot-prop';

/**
 * Returns the current route name for a given state
 * @param  {Object} navigationState     The current navigation state in a format
 *                                      followed by `react-navigation`
 * @param  {Number} [maxDepth=Infinity] The maximum number depth to search for routes
 * @param  {Number} [currentDepth=0]    Current recursion depth; used to test against `maxDepth`
 * @return {String}                     The current route name
 */
const getCurrentRoute = (
  navigationState,
  maxDepth = Infinity,
  currentDepth = 0
) => {
  if (!navigationState) return null;

  const route = navigationState.routes[navigationState.index];

  if (currentDepth < maxDepth && route.routes) {
    return getCurrentRoute(route, maxDepth, currentDepth + 1);
  }

  return get(route, 'routeName', null);
};

export default getCurrentRoute;
