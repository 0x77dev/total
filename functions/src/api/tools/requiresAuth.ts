import { Context } from "../interfaces/api.interface";
import { AuthenticationError } from "apollo-server-cloud-functions";

export const isAuthenticated = ({ currentUser }: Context): true | undefined => {
  if (!currentUser) {
    throw new AuthenticationError(
      "You must be authenticated, please check or provide the token"
    );
  }
  return true;
};

export default isAuthenticated;
