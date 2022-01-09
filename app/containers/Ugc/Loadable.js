/**
 *
 * Asynchronously loads the component for Ugc
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
