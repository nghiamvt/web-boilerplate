import locationHelperBuilder from './locationHelper';
import redirectUtil from '../helper/redirect';

export const { connectedRouterRedirect, connectedReduxRedirect } = redirectUtil({
  locationHelperBuilder,
  getRouterRedirect: ({ history }) => history.replace,
});
