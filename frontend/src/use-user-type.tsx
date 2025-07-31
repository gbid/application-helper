import { useCookies } from "react-cookie";
import { UserType } from "../../backend/cover-letter/bindings/UserType";

function tryParseUserType(value: string): UserType | null {
  switch (value) {
    case "anonymous":
      return "anonymous";
    case "standard":
      return "standard";
    case "subscribed":
      return "subscribed";
    default:
      return null;
  }
}

const USER_COOKIE_NAME = "user";

export const useUserType = (): UserType | null => {
  const [cookies] = useCookies([USER_COOKIE_NAME]);

  const userCookie = cookies.user;
  if (!userCookie) {
    return null;
  }

  return tryParseUserType(userCookie);
};
