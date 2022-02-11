/** The scope of the current user is insufficient */
type PostRevoke403 = {
  error: string;

  /** Additional information on the error. */
  error_description?: string;

  /** URI pointing to the documentation if it is available. */
  error_uri?: string;
}

export default PostRevoke403;
