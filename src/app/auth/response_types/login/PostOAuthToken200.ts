/** The user was authorized successfully */
type PostOAuthToken200 = {

  /** The access token issued by the authorization server. */
  access_token: string;

  /**
   * The type of the token issued as described in [RFC6749] Section 7.1.
   * The Value is case-insensitive.
   */
  token_type: "bearer" | "mac";

  /**
   * RECOMMENDED The lifetime in seconds of the access token.
   * For example, the value "3600" denotes that the access token will expire in
   * one hour from the time the response was generated.
   * If omitted, the authorization server SHOULD provide the expiration time via
   * other means or document the default value.
   */
  expires_in?: number | 3600;

  /**
   *  string
   * The refresh token, which can be used to obtain new access tokens using the
   * same authorization grant as described in [RFC 6749] Section 6.
   * NOTE: The refresh tokens have a lifetime of 7 days (604800 seconds).
   * After this time period a new access and refresh token needs to be requested.
   * This is due to security concerns.
   */
  refresh_token?: string;

  /**
   * OPTIONAL, if identical to the scope requested by the client; otherwise,
   * REQUIRED.
   * The scope of the access token as described by Section 3.3.
   */
  scope?: string;
}

export default PostOAuthToken200;
