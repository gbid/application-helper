import { HeadshotGenerationRoute } from "./route";
import { HeadshotGenerator } from "./headshot-generator";
import { HeadshotGenerationLanding } from "./headshot-generation-landing";
import { HeadshotGenerationList } from "./headshot-generation-list";

export function HeadshotGeneration({
  headshotGenerationRoute,
}: {
  headshotGenerationRoute: HeadshotGenerationRoute;
}) {
  switch (headshotGenerationRoute.kind) {
    case "home":
      return <HeadshotGenerationLanding />;
    case "new":
      return <HeadshotGenerator headshotGenerationId={null} />;
    case "list":
      return <HeadshotGenerationList />;
    case "existing":
      return (
        <HeadshotGenerator
          headshotGenerationId={headshotGenerationRoute.headshotGenerationId}
        />
      );
    default: {
      const _exhaustiveCheck: never = headshotGenerationRoute;
      throw new Error(`Unhandled route kind: ${_exhaustiveCheck}`);
    }
  }
}
