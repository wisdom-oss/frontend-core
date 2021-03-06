/** Unauthorized */
type PostOAuthToken401 = {
  /**
   * <ul>
   *   <li><b>invalid_client</b>
   *     Client authentication failed (e.g., unknown client, no client
   *     authentication included, or unsupported authentication method).
   *     The authorization server MAY return an HTTP 401 (Unauthorized) status
   *     code to indicate which HTTP authentication schemes are supported.
   *     If the client attempted to authenticate via the "Authorization" request
   *     header field, the authorization server MUST respond with an HTTP 401
   *     (Unauthorized) status code and include the "WWW-Authenticate" response
   *     header field matching the authentication scheme used by the client.
   *   </li>
   * </ul>
   */
  error?: "invalid_client";
}

export default PostOAuthToken401;
