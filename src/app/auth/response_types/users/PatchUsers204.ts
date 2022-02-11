import User from "../../types/User";

/** Successfully updated the user */
type PatchUsers204 = Omit<User, "password">;

export default PatchUsers204;
