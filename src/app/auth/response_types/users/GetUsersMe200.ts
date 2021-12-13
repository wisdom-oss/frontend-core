import User from "../../types/User";

/** Information */
type GetUsersMe200 = Omit<User, "password">;

export default GetUsersMe200;
