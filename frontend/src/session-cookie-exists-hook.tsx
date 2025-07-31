import { useState, useEffect } from "react";

export function getCookie(cookieName: string): string | null {
  const row = document.cookie
    .split("; ")
    .find((row) => row.startsWith(cookieName));
  if (row == null) {
    return null;
  }

  const value = row.split("=")[1];
  if (value == null) {
    throw new Error("Cookie value is missing");
  }

  return value;
}

export function cookieExists(cookieName: string): boolean {
  return document.cookie.split("; ").some((row) => row.startsWith(cookieName));
}

export function useCookieExists(cookieName: string): boolean {
  const [hasCookie, setHasCookie] = useState<boolean>(false);

  useEffect(() => {
    const checkCookie = () => {
      // Simple function to check if a specific cookie exists
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith(cookieName))
        ?.split("=")[1];
      setHasCookie(!!cookieValue);
    };

    checkCookie();
    // Optionally, set up an interval to periodically check the cookie.
    // This might be useful if sessions can expire while the user is active.
    // However, currently our sessions do not expire.
    // const intervalId = setInterval(checkCookie, 10000); // check every 10 seconds

    // return () => clearInterval(intervalId);
  }, [cookieName]);

  return hasCookie;
}
