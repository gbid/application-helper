import { ServerSentEvent as ServerSentEventBinding } from "../../../backend/cover-letter/bindings/ServerSentEvent";
import { useState, useEffect, useRef } from "react";

export type OtherError = { kind: "other" };
export type ServerSentEvent<D, E> = ServerSentEventBinding<D, E | OtherError>;

export type Event<D, E> = Exclude<ServerSentEvent<D, E>, { kind: "end" }>;

export async function* getServerSentEvents<D, E>(
  url: string,
): AsyncGenerator<Event<D, E>, void, void> {
  const eventSource = new EventSource(url);

  const queue: ServerSentEvent<D, E>[] = [];
  const resolveQueue: { resolveQueue: null | (() => void) } = {
    resolveQueue: null,
  };

  eventSource.onmessage = (message) => {
    let event: string = message.data;
    const parsed_event = JSON.parse(event) as ServerSentEvent<D, E>;
    queue.push(parsed_event);
    if (resolveQueue.resolveQueue != null) {
      resolveQueue.resolveQueue();
      resolveQueue.resolveQueue = null;
    }
    if (parsed_event.kind === "end" || parsed_event.kind === "err") {
      eventSource.close();
    }
  };
  eventSource.onerror = (event) => {
    const error_event: ServerSentEvent<D, E> = {
      kind: "err",
      error: { kind: "other" },
    };

    queue.push(error_event);
    eventSource.close();
    if (resolveQueue.resolveQueue) {
      resolveQueue.resolveQueue();
      resolveQueue.resolveQueue = null;
    }
  };

  while (true) {
    let event: ServerSentEvent<D, E> | undefined;
    while ((event = queue.shift())) {
      if (event.kind === "end") {
        return;
      }
      const nonEndEvent: Event<D, E> = event;
      yield nonEndEvent;
      if (event.kind === "err") {
        return;
      }
    }

    await new Promise<void>((resolve) => {
      resolveQueue.resolveQueue = resolve;
    });
  }
}

// component exposing the getServerSentEvents AsyncGenerator
// with consumer-side cancellation logic upon the component unmounting.
type FetchInProgress<D, E> = {
  url: string;
  generator: AsyncGenerator<Event<D, E>, void, void>;
  cancel: () => void;
};

export function useSse<D, E>(
  url: string | null,
  fetchTrigger: boolean,
): {
  fetchInProgress: boolean;
  events: AsyncGenerator<Event<D, E>, void, void> | null;
} {
  const fetchInProgressRef = useRef<FetchInProgress<D, E> | null>(null);

  const [isFetchInProgress, setIsFetchInProgress] = useState(false);

  useEffect(() => {
    if (
      url === null ||
      (fetchInProgressRef.current !== null &&
        fetchInProgressRef.current.url === url)
    ) {
      return;
    }

    // Cancel the previous fetch if it exists
    if (fetchInProgressRef.current !== null) {
      fetchInProgressRef.current.cancel();
      fetchInProgressRef.current = null;
    }

    let cancel: () => void;
    const cancelSignal = new Promise<void>((resolve) => {
      cancel = resolve;
    });
    setIsFetchInProgress(true);

    const generator = (async function* () {
      const events = getServerSentEvents<D, E>(url);
      try {
        while (true) {
          const nextEvent = events.next();
          const result = await Promise.race([nextEvent, cancelSignal]);
          if (result === undefined) {
            // The cancelSignal resolved, meaning we should cancel
            return;
          }

          const { value, done } = result as IteratorResult<Event<D, E>>;
          if (done) {
            setIsFetchInProgress(false);
            return;
          }
          yield value;
        }
      } finally {
        // Clean up if necessary
      }
    })();

    fetchInProgressRef.current = {
      url,
      generator,
      cancel: cancel!,
    };

    return () => {
      if (fetchInProgressRef.current !== null) {
        fetchInProgressRef.current.cancel();
        fetchInProgressRef.current = null;
      }
    };
  }, [url, fetchTrigger]);

  return {
    fetchInProgress: isFetchInProgress,
    events: fetchInProgressRef.current?.generator ?? null,
  };
}
