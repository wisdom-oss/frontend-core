import User from "../../types/User";

/** Successfully updated the user */
type PatchUsersMe200 = Omit<User, "password">;

export default PatchUsersMe200;
