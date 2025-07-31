import { UserType } from "../../../backend/cover-letter/bindings/UserType";

export async function getUserType(): Promise<UserType> {
  const route = "/api/user-type";
  const response = await fetch(route);
  if (!response.ok) {
    throw new Error("Failed to fetch user type");
  }
  return await response.json();
}
