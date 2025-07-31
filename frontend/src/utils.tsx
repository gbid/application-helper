import { UserType } from "../../backend/cover-letter/bindings/UserType";
import { Fragment, ReactNode } from "react";

export function interleave<T, S>(array: T[], separator: S): (T | S)[] {
  return array.reduce((result: (T | S)[], element: T, index: number) => {
    if (index !== 0) {
      result.push(separator);
    }
    result.push(element);
    return result;
  }, []);
}

export function interleaveComponents(
  components: [ReactNode, string][],
  separator: ReactNode,
): ReactNode[] {
  function group(
    component: ReactNode,
    componentKey: string,
    index: number,
    separator: ReactNode,
  ): ReactNode {
    return (
      <Fragment key={componentKey}>
        {index !== 0 && separator}
        {component}
      </Fragment>
    );
  }
  return components.map(([component, key], index) =>
    group(component, key, index, separator),
  );
}

export function isSignedIn(userType: UserType | null): boolean {
  switch (userType) {
    case "standard":
    case "subscribed":
      return true;
    case "anonymous":
    case null:
      return false;
    default: {
      const exhaustive: never = userType;
      throw new Error(`Unhandled UserType: ${exhaustive}`);
    }
  }
}

export function removePrefix(str: string, prefix: string): string {
  if (str.startsWith(prefix)) {
    return str.slice(prefix.length);
  }
  return str;
}
