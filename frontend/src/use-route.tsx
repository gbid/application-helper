import { useCallback, useMemo } from "react";
import { useLocation, useSearch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { Route, parseRoute, serializeRoute } from "./route";
import { removePrefix } from "./utils";

export function useRoute(): [Route | null, (newRoute: Route) => void] {
  const [location, setLocation] = useLocation();
  const searchParams = useSearch();
  const [hashLocation] = useHashLocation();
  const hash = useMemo(() => removePrefix(hashLocation, "/"), [hashLocation]);

  const route: Route | null = useMemo(() => {
    try {
      return parseRoute(location, hash, searchParams);
    } catch (err) {
      console.error("Failed to parse route:", err);
      return null;
    }
  }, [location, hash, searchParams]);

  const setRoute = useCallback(
    (newRoute: Route) => {
      const serializedRoute = serializeRoute(newRoute);
      // TODO: check if this also correctly sets the hash
      setLocation(serializedRoute);
    },
    [setLocation],
  );

  return [route, setRoute];
}
