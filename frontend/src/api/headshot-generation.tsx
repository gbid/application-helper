import {
  fetchEventSource,
  EventSourceMessage,
} from "@microsoft/fetch-event-source";
import { HeadshotGenerationProgress } from "../../../backend/cover-letter/bindings/HeadshotGenerationProgress";
import { HeadshotGenerationId } from "../../../backend/cover-letter/bindings/HeadshotGenerationId";
import { GeneratedHeadshotId } from "../../../backend/cover-letter/bindings/GeneratedHeadshotId";
import { HeadshotGenerationListItem } from "../../../backend/cover-letter/bindings/HeadshotGenerationListItem";
import { HeadshotGeneratedFavouriteInfo } from "../../../backend/cover-letter/bindings/HeadshotGeneratedFavouriteInfo";

export async function getFavouriteHeadshots(): Promise<HeadshotGeneratedFavouriteInfo> {
  const response = await fetch("/api/headshot-generation/favourites");
  if (!response.ok) {
    throw new Error("Failed to fetch favourite headshots");
  }
  return response.json();
}

export async function setFavourite(
  id: GeneratedHeadshotId,
  isFavourite: boolean,
): Promise<void> {
  const response = await fetch(
    `/api/headshot-generation/headshot-generated/${id.generatedHeadshotId}/favourite`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(isFavourite),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to update favourite status");
  }
}

export async function uploadHeadshotImages(
  images: File[],
): Promise<HeadshotGenerationId> {
  const formData = new FormData();
  images.forEach((image, index) => {
    formData.append(`image${index}`, image);
  });

  const response = await fetch("/api/headshot-generation", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status}`);
  }

  return await response.json();
}

export async function* monitorHeadshotGeneration(
  generationId: HeadshotGenerationId,
): AsyncGenerator<HeadshotGenerationProgress, void, void> {
  const url = `/api/headshot-generation/${generationId.headshotGenerationId}`;
  const ctrl = new AbortController();

  const queue: (HeadshotGenerationProgress | null)[] = [];
  const resolveQueue: { resolve: null | (() => void) } = { resolve: null };

  fetchEventSource(url, {
    method: "GET",
    signal: ctrl.signal,
    openWhenHidden: true,

    async onopen(response) {
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
    },

    onmessage(event: EventSourceMessage) {
      console.debug("Received message:", event);
      if (event.data) {
        try {
          const progress = JSON.parse(event.data) as HeadshotGenerationProgress;
          queue.push(progress);

          // TODO: when should we abort?
          // if (progress.kind === "complete" || progress.kind === "error") {
          //   queue.push(null);
          //   ctrl.abort();
          // }

          if (resolveQueue.resolve) {
            resolveQueue.resolve();
            resolveQueue.resolve = null;
          }
        } catch (error) {
          console.error("Error parsing event:", error);
          throw error;
        }
      }
    },

    onclose() {
      console.debug("Connection closed");
      queue.push(null);
    },

    onerror(err) {
      console.error("Connection error:", err);
      throw err;
    },
  });

  while (true) {
    let event: HeadshotGenerationProgress | null | undefined;
    while (true) {
      event = queue.shift();
      console.debug("Processing event:", event);

      if (event === undefined) {
        break;
      } else if (event === null) {
        return;
      }
      yield event;
    }

    await new Promise<void>((resolve) => {
      resolveQueue.resolve = resolve;
    });
  }
}

export function generated_headshot_url(id: GeneratedHeadshotId): string {
  return `/api/headshot-generation/headshot-generated/${id.generatedHeadshotId}`;
}

export async function fetchHeadshotGenerations(): Promise<
  HeadshotGenerationListItem[]
> {
  let response = await fetch("/api/headshot-generation/list");
  if (!response.ok) {
    throw new Error(`Failed to fetch headshot generations: ${response.status}`);
  }
  return await response.json();
}
