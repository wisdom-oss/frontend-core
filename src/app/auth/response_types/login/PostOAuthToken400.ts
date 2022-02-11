/** Bad request made */
type PostOAuthToken400 = {
  /**
   * Error codes compliant to the RFC standard:
   * <ul>
   *   <li><b>invalid_request</b>
   *     The request is missing a required parameter, includes an unsupported
   *     parameter value (other than grant type), repeats parameter, includes
   *     multiple credentials, utilizes more than one mechanism for
   *     authenticating the client, or is otherwise malformed.
   *   </li>
   *   <li><b>invalid_grant</b>
   *     The provided authorization grant (e.g., authorization code, resource
   *     owner credentials) or refresh token is invalid, expired, revoked, does
   *     not match the redirection URI used in the authorization request, or was
   *     issued to another client.
   *   </li>
   *   <li><b>unauthorized_client</b>
   *     The authenticated client is not authorized to use this authorization
   *     grant type.
   *   </li>
   *   <li><b>unsupported_grant_type</b>
   *     The authorization grant type is not supported by the authorization
   *     server.
   *   </li>
   *   <li><b>invalid_scope</b>
   *     The requested scope is invalid, unknown, malformed, or exceeds the
   *     scope granted by the resource owner.
   *   </li>
   * </ul>
   */
  error:
    "invalid_request" |
    "invalid_client" |
    "invalid_grant" |
    "unauthorized_client" |
    "unsupported_grant_type" |
    "invalid_scope";

  /** Additional information on the error. */
  error_description?: string;

  /** URI pointing to the documentation if it is available. */
  error_uri?: string;
}

export default PostOAuthToken400;
