const Search = 'search';
const List = 'get';
const Detail = 'get/:id';
const Create = 'create';
const Update = 'update';
const Delete = 'delete/:id';

export const Routes = {
  SSOUserAdmin: {
    ApiTags: `sso user admin`,
    Controller: `sso-user-admin`,
    List,
    Search,
    Detail,
    Create,
    Update,
    Delete,
  },
  SSOUserCustomer: {
    ApiTags: `sso user customer`,
    Controller: `sso-user-customer`,
    List,
    Search,
    Detail,
    Create,
    Update,
    Delete,
  },
  SSOUserOperative: {
    ApiTags: `sso user operative`,
    Controller: `sso-user-operative`,
    List,
    Search,
    Detail,
    Create,
    Update,
    Delete,
  },
  SSOAuthLogin: {
    ApiTags: `sso auth login`,
    Controller: `sso-login`,
    Login: 'login',
    SignUp: 'signup',
  },
  SSOInfo: {
    ApiTags: `sso info`,
    Controller: `sso-user-info`,
    List,
    Search,
    Detail,
    Create,
    Update,
    Delete,
  },
  SSOUserGroup: {
    ApiTags: `sso user group`,
    Controller: `sso-user-group`,
    List,
    Search,
    Detail,
    Create,
    Update,
    Delete,
  },
  SSORole: {
    ApiTags: `sso role`,
    Controller: `sso-role`,
    List,
    Search,
    Detail,
    Create,
    Update,
    Delete,
  },
};
