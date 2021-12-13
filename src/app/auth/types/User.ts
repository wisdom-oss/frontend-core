/** Representation of a user. */
type User = Partial<{
  /** ID of the user account */
  user_id: number;

  /** First names of the user */
  firstName: string;

  /** Last name(s) of the user */
  lastName: string;

  /** Username for the account */
  username: string;

  /** UNIX timestamp of the last logged login */
  last_login: number;

  /** Map of the roles of the user to the role name */
  roles: Record<any, string>;

  /** Map of the scopes of the user to the descriptions of the scope */
  scopes: Record<string, string>;
}>

export default User;
