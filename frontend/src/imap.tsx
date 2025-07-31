import { useState, useEffect, ChangeEvent, FormEvent } from "react";

type ImapConfigState =
  | { type: "setUp" }
  | { type: "available" }
  | { type: "unsupportedByUs"; emailProviderName?: string }
  | { type: "unsupportedByThem"; emailProviderName: string }
  | { type: "insecure"; emailProviderName: string };

type ImapFormProps = {
  onSetUp: () => void;
};

async function fetchImapConfigState(): Promise<ImapConfigState> {
  const response = await fetch("/api/imap-config");
  if (response.status !== 200 /* OK */) {
    throw new Error(`Error fetching auto config: ${response.status}`);
  }
  return await response.json();
}

export function ImapForm({ onSetUp }: ImapFormProps) {
  const [submitInProgress, setSubmitInProgress] = useState(false);
  // This is true if IMAP config has been set up here, as opposed to when IMAP
  // config has already been set up before this element has been created.
  const [wasSetUpHere, setWasSetUpHere] = useState(false);
  const [hasFailedUnknown, setHasFailedUnknown] = useState(false);
  const [hasFailedCredentials, setHasFailedCredentials] = useState(false);
  const [imapPassword, setImapPassword] = useState("");

  const [imapConfigState, setImapConfigState] = useState(
    null as ImapConfigState | null,
  );

  async function refreshImapConfigState(): Promise<ImapConfigState> {
    const wasSetUp =
      imapConfigState !== null && imapConfigState.type === "setUp";

    const response = await fetch("/api/imap-config");
    if (response.status !== 200 /* OK */) {
      throw new Error(`Error fetching auto config: ${response.status}`);
    }
    const newImapConfigState = await response.json();
    setImapConfigState(newImapConfigState);

    if (!wasSetUp && newImapConfigState.type === "setUp") {
      onSetUp();
    }

    return newImapConfigState;
  }

  useEffect(() => {
    (async () => {
      const imapConfigState = await fetchImapConfigState();
      setImapConfigState(imapConfigState);
      if (imapConfigState.type === "setUp") {
        onSetUp();
      }
    })();
  }, []);

  function handlePasswordChange(ev: ChangeEvent<HTMLInputElement>) {
    ev.preventDefault();
    setImapPassword(ev.target.value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitInProgress(true);
    try {
      setHasFailedUnknown(false);
      setHasFailedCredentials(false);
      const imapConfig = { imapPassword };
      const response = await fetch("/api/imap-config", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(imapConfig),
      });

      if (response.status === 403 /* FORBIDDEN */) {
        setHasFailedCredentials(true);
        return;
      }

      if (response.status !== 200 /* OK */) {
        throw new Error(`Unexpected response: ${response.status}`);
      }

      let { key } = await response.json();

      localStorage.setItem("imap-credentials-key", key);

      const newState = await fetchImapConfigState();
      if (newState.type !== "setUp") {
        throw new Error(
          `Unexpected imap config state after submitting credentials: ${newState.type}`,
        );
      }
      setWasSetUpHere(true);
      onSetUp();
    } catch (err) {
      setHasFailedUnknown(true);
      console.error(`Error while uploaindg imap config: ${err}`);
    } finally {
      setSubmitInProgress(false);
    }
  }

  const emailProviderName: string | null = (() => {
    if (imapConfigState == null) {
      return null;
    }

    switch (imapConfigState.type) {
      case "setUp":
      case "available":
        return null;
      case "unsupportedByUs":
        return imapConfigState.emailProviderName === undefined
          ? null
          : imapConfigState.emailProviderName;
      case "unsupportedByThem":
      case "insecure":
        return imapConfigState.emailProviderName;
      default: {
        // TODO: Why does typescript not figure out that this is unreachable?
        //const exhaustive: never = imapConfigState;
        throw new Error(`Unhandled: ${imapConfigState}`);
      }
    }
  })();

  switch (imapConfigState == null ? null : imapConfigState.type) {
    case null: {
      return <div className="spinner-border" role="status"></div>;
    }
    case "setUp": {
      const message: string =
        "Direkter Email-Abruf aus Ihrem Postfach ist eingerichtet.";
      if (wasSetUpHere) {
        return (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        );
      }

      return <p>{message}</p>;
    }
    case "available": {
      return (
        <>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">
                Email-Passwort
              </label>
              <input
                type="password"
                className="form-control"
                id="emailInput"
                name="email"
                value={imapPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div
              className="alert alert-danger text-center mb-3"
              hidden={!hasFailedCredentials}
              role="alert"
            >
              Falsches Passwort
            </div>
            <div
              className="alert alert-danger text-center mb-3"
              hidden={!hasFailedUnknown}
              role="alert"
            >
              Ein Fehler ist aufgetreten. Bitte versuchen Sie es später noch
              einmal.
            </div>
            {submitInProgress && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  className="mb-3 spinner-border text-center"
                  role="status"
                ></div>
              </div>
            )}
            <div className="mb-3 text-center">
              <button
                type="submit"
                className="btn btn-dark"
                disabled={submitInProgress}
              >
                Einbinden
              </button>
            </div>
          </form>
        </>
      );
    }
    // TODO: For now we treat all kinds of not-supported as our fault. We
    // should try more things server-side (e.g. trying to contact a supposedly
    // insecure server via tls) before we blame the user's email provider.
    case "unsupportedByUs":
    case "unsupportedByThem":
    case "insecure": {
      return (
        <>
          <div className="alert alert-warning" role="alert">
            <p>
              Leider unterstützen wir das Einbinden Ihres Email-Postfachs
              {emailProviderName != null ? (
                <span>
                  {" "}
                  bei <cite>{emailProviderName}</cite>{" "}
                </span>
              ) : (
                <span> </span>
              )}
              noch nicht. Wir arbeiten daran, also schauen Sie später noch
              einmal rein!
            </p>
            <p>
              In der Zwischenzeit können Sie die alternativen
              Importmöglichkeiten unten nutzen.
            </p>
          </div>
        </>
      );
    }
    default: {
      // TODO: Why does typescript not figure out that this is unreachable?
      //const exhaustive: never = imapConfigState;
      throw new Error(`Unhandled: ${imapConfigState}`);
    }
  }
}
