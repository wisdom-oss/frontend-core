import User from "../../types/User";

/*** Information about the User */
type GetUsersId200 = Omit<User, "password">;

export default GetUsersId200;
