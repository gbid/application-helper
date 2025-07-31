import { ChangeEvent, useEffect, useState, useRef } from "react";
import { getResumeInfo, postResume, resumeUrl } from "./api/resume";
import Joyride, { Step, CallBackProps, STATUS } from "react-joyride";
import { useUserType } from "./use-user-type";
import { isSignedIn } from "./utils";
import { ApplicationParameters } from "../../backend/cover-letter/bindings/ApplicationParameters";
import { ResumeInfo } from "./model";
import { UserType } from "../../backend/cover-letter/bindings/UserType";
import { CoverLetterLanguage } from "../../backend/cover-letter/bindings/CoverLetterLanguage";
import { JOB_ADVERT_CONTROL_SELECTOR } from "./joyride";
import { RESUME_CONTROL_SELECTOR } from "./joyride";
import { joyrideStyle } from "./joyride";
import { joyrideLocale } from "./joyride";

type JobAdvertControlProps = {
  applicationParameters: ApplicationParameters;
  pushApplicationParameters:
    | null
    | ((update: (old: ApplicationParameters) => ApplicationParameters) => void);
};

const languages: CoverLetterLanguage[] = ["german", "english"];

export function JobAdvertControl({
  applicationParameters,
  pushApplicationParameters,
}: JobAdvertControlProps): JSX.Element {
  const [jobAdvert, setJobAdvert] = useState<string | null>(
    applicationParameters.jobAdvert,
  );

  useEffect(() => {
    setJobAdvert(applicationParameters.jobAdvert ?? "");
  }, [applicationParameters.jobAdvert]);

  async function submitJobDescription(value: string | null) {
    if (pushApplicationParameters == null) {
      throw new Error(
        "Cannot submit job description without pushApplicationParameters",
      );
    }

    pushApplicationParameters((old) => ({
      ...old,
      jobAdvert: value == null ? null : value.trim(),
    }));
  }

  return (
    <div className={`mb-3 ${JOB_ADVERT_CONTROL_SELECTOR}`}>
      <label className="form-label">
        <h5>Stellenanzeige</h5>
      </label>
      <div className="input-group" role="group" aria-label="Resume Actions">
        <button
          className="btn btn-outline-secondary"
          type="button"
          disabled={false}
          onClick={() => {
            setJobAdvert(null);
            submitJobDescription(null);
          }}
        >
          &#10006;
        </button>
        <textarea
          className="form-control"
          id="jobDescriptionToUpload"
          rows={5}
          placeholder="Text der Stellenanzeige"
          value={jobAdvert ?? ""}
          onInput={(ev) => {
            setJobAdvert((ev.target as HTMLTextAreaElement).value);
          }}
          onBlur={(ev) => submitJobDescription(ev.target.value)}
        ></textarea>
      </div>
    </div>
  );
}

type CustomFileInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  accept?: string;
  buttonText?: string;
};

function CustomFileInput({
  onChange,
  disabled,
  accept = "application/pdf",
  buttonText = "+ Hinzufügen",
}: CustomFileInputProps): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <div style={{ width: "100%" }}>
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={handleButtonClick}
        disabled={disabled}
        style={{ width: "100%" }}
      >
        {buttonText}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={onChange}
        disabled={disabled}
        style={{ display: "none" }}
      />
    </div>
  );
}

type ResumeControlProps = {
  applicationParameters: ApplicationParameters;
  pushApplicationParameters:
    | null
    | ((update: (old: ApplicationParameters) => ApplicationParameters) => void);
  postMessageAndOpenChat: ((message: string) => void) | null;
};

export function ResumeControl({
  applicationParameters,
  pushApplicationParameters,
  postMessageAndOpenChat,
}: ResumeControlProps): JSX.Element {
  const canEdit = pushApplicationParameters != null;

  const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null);

  useEffect(() => {
    (async function () {
      const resumeId = applicationParameters.resumeId;
      if (resumeId == null) {
        setResumeInfo(null);
        return;
      }

      setResumeInfo(await getResumeInfo(resumeId));
    })();
  }, [applicationParameters.resumeId]);

  async function handleResumeChange(ev: React.ChangeEvent<HTMLInputElement>) {
    if (pushApplicationParameters == null) {
      throw new Error(
        "This must not be called without pushApplicationParameters",
      );
    }

    if (ev.target.files == null || ev.target.files.length === 0) {
      return;
    }

    const file = ev.target.files[0];
    const resumeId = await postResume(file);
    setResumeInfo({
      fileName: file.name,
      createdAt: new Date(),
    });
    pushApplicationParameters((old) => ({
      ...old,
      resumeId,
    }));
  }

  async function removeResume() {
    if (pushApplicationParameters == null) {
      throw new Error(
        "This must not be called without pushApplicationParameters",
      );
    }
    setResumeInfo(null);
    pushApplicationParameters((old) => ({
      ...old,
      resumeId: null,
    }));
  }

  const chatMessage = "Hilf mir dabei, einen neuen Lebenslauf zu erstellen.";
  async function postCreateResumeMessage() {
    if (postMessageAndOpenChat === null) {
      throw new Error("postMessageAndOpenChat must not be null");
    }
    await postMessageAndOpenChat(chatMessage);
  }

  return (
    <div className={`mb-3 ${RESUME_CONTROL_SELECTOR}`}>
      <label className="form-label">
        <h5>Ihr Lebenslauf</h5>
      </label>
      {resumeInfo == null || applicationParameters.resumeId == null ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <CustomFileInput
            onChange={handleResumeChange}
            disabled={!canEdit}
            accept=".pdf"
            buttonText="+ Hochladen"
          />
          <button
            className="btn btn-outline-dark"
            onClick={postCreateResumeMessage}
            style={{ width: "100%" }}
          >
            + Erstellen
          </button>
        </div>
      ) : (
        <div className="d-flex align-items-center">
          <div
            className="btn-group"
            role="group"
            aria-label="Resume Actions"
            style={{ width: "100%" }}
          >
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={removeResume}
              disabled={!canEdit}
            >
              &#10006;
            </button>
            <a
              style={{ width: "100%" }}
              className="btn btn-outline-dark"
              href={resumeUrl(applicationParameters.resumeId)}
              download
            >
              {resumeInfo.fileName +
                " (" +
                resumeInfo.createdAt.toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }) +
                ")"}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

type WordCountControlProps = {
  applicationParameters: ApplicationParameters;
  pushApplicationParameters:
    | null
    | ((update: (old: ApplicationParameters) => ApplicationParameters) => void);
};

export function WordCountControl({
  applicationParameters,
  pushApplicationParameters,
}: WordCountControlProps): JSX.Element {
  const [wordCountSliderValue, setWordCountSliderValue] = useState<
    number | null
  >(applicationParameters.wordCount?.wordCount ?? null);

  useEffect(() => {
    setWordCountSliderValue(applicationParameters.wordCount?.wordCount ?? null);
  }, [applicationParameters.wordCount]);

  useEffect(() => {
    if (wordCountSliderValue === null) {
      return;
    }

    if (pushApplicationParameters == null) {
      return;
    }

    if (applicationParameters.wordCount?.wordCount === wordCountSliderValue) {
      return;
    }

    const newWordCount = { wordCount: wordCountSliderValue };

    const timeoutId = setTimeout(() => {
      pushApplicationParameters((old) => ({
        ...old,
        wordCount: newWordCount,
      }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [wordCountSliderValue, applicationParameters, pushApplicationParameters]);

  const MIN_WORDCOUNT = 50;
  const DEFAULT_WORDCOUNT = 170;
  const MAX_WORDCOUNT = 500;

  return (
    <div className="mb-3">
      <label htmlFor="customRange3" className="form-label">
        <h5>Länge: {wordCountSliderValue || DEFAULT_WORDCOUNT} Wörter</h5>
      </label>
      <div>
        <input
          type="range"
          className="form-range"
          min={MIN_WORDCOUNT}
          max={MAX_WORDCOUNT}
          step="10"
          value={wordCountSliderValue || DEFAULT_WORDCOUNT}
          onChange={(event) => {
            setWordCountSliderValue(parseInt(event.target.value));
            event.preventDefault();
          }}
          id="wordCount"
        />
      </div>
    </div>
  );
}

type LanguageControlProps = {
  applicationParameters: ApplicationParameters;
  pushApplicationParameters:
    | null
    | ((update: (old: ApplicationParameters) => ApplicationParameters) => void);
};

export function LanguageControl({
  applicationParameters,
  pushApplicationParameters,
}: LanguageControlProps): JSX.Element {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    if (pushApplicationParameters == null) {
      throw new Error("Control should be disabled");
    }

    // TODO: Check that `value` is a valid CoverLetterLanguage.
    const languageOverride = event.target.value as CoverLetterLanguage;
    pushApplicationParameters((old) => ({
      ...old,
      languageOverride,
    }));
  }

  function displayLanguage(language: CoverLetterLanguage): string {
    switch (language) {
      case "german":
        return "Deutsch";
      case "english":
        return "Englisch";
      default:
        const exhaustive: never = language;
        throw new Error(`Unhandled CoverLetterLanguage: ${exhaustive}`);
    }
  }

  return (
    <div className="mb-3">
      <label htmlFor="coverLetterLanguage" className="form-label">
        <h5>Sprache</h5>
      </label>
      <select
        className="form-select"
        id="coverLetterLanguage"
        value={applicationParameters.languageOverride ?? "german"}
        onChange={handleChange}
      >
        {languages.map((language) => (
          <option key={language} value={language}>
            {displayLanguage(language)}
          </option>
        ))}
      </select>
    </div>
  );
}

type RegenerateControlProps = {
  applicationParameters: ApplicationParameters;
  pushApplicationParameters:
    | null
    | ((update: (old: ApplicationParameters) => ApplicationParameters) => void);
};

export function RegenerateControl({
  applicationParameters,
  pushApplicationParameters,
}: RegenerateControlProps): JSX.Element {
  function randomSeed(): string {
    const byteNum = 8;
    const array = new Uint8Array(byteNum);
    window.crypto.getRandomValues(array);
    const hex = Array.from(array, (byte) =>
      ("0" + byte.toString(16)).slice(-2),
    ).join("");
    return hex;
  }

  async function handleClick() {
    if (pushApplicationParameters == null) {
      throw new Error("Control should be disabled");
    }

    const coverLetterRandomSeed = randomSeed();
    pushApplicationParameters((old) => ({
      ...old,
      coverLetterRandomSeed,
    }));
  }

  return (
    <div
      className="mb-3"
      style={{ display: "flex", flexDirection: "column", width: "100%" }}
    >
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={handleClick}
      >
        ⟳ Anschreiben neu generieren
      </button>
    </div>
  );
}

type ImproveResumeControlProps = {
  applicationParameters: ApplicationParameters;
  postMessageAndOpenChat: ((message: string) => void) | null;
};

export function ImproveResumeControl({
  applicationParameters,
  postMessageAndOpenChat,
}: ImproveResumeControlProps): JSX.Element {
  const jobPresent =
    applicationParameters.jobAdvert !== null &&
    applicationParameters.jobAdvert !== "";

  const chatMessage = jobPresent
    ? "Hilf mir, meinen Lebenslauf zu verbessern und auf die Stellenanzeige zuzuschneiden."
    : "Hilf mir, meinen Lebenslauf zu verbessern.";

  async function handleClick() {
    if (postMessageAndOpenChat === null) {
      throw new Error("postMessageAndOpenChat must not be null");
    }
    postMessageAndOpenChat(chatMessage);
  }

  const disabled =
    applicationParameters.resumeId === null || postMessageAndOpenChat === null;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={handleClick}
        disabled={disabled}
        title={
          disabled
            ? "Bitte laden Sie zuerst einen Lebenslauf hoch oder erstellen Sie einen neuen."
            : ""
        }
        style={{ pointerEvents: "auto" }}
      >
        ⇧ Lebenslauf verbessern
      </button>
    </div>
  );
}

export type ControlPaneProps = {
  applicationParameters: ApplicationParameters;
  pushApplicationParameters:
    | null
    | ((update: (old: ApplicationParameters) => ApplicationParameters) => void);
  postMessageAndOpenChat: ((message: string) => Promise<void>) | null;
};

export function ControlPane({
  applicationParameters,
  pushApplicationParameters,
  postMessageAndOpenChat,
}: ControlPaneProps): JSX.Element {
  const [runTour, setRunTour] = useState(false);

  const userType: UserType | null = useUserType();
  const signedIn = isSignedIn(userType);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour");
    if (hasSeenTour !== "true" && !signedIn) {
      setRunTour(true);
      localStorage.setItem("hasSeenTour", "true");
    }
  }, [signedIn]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRunTour(false);
    }
  };

  const joyrideSteps: Step[] = [
    {
      target: `.${JOB_ADVERT_CONTROL_SELECTOR}`,
      content: "Kopieren Sie die Stellenanzeige hierher.",
      disableBeacon: true,
      placement: "right",
    },
    {
      target: `.${RESUME_CONTROL_SELECTOR}`,
      content:
        "Laden Sie hier Ihren Lebenslauf hoch. So können wir im Anschreiben auf Ihre Stärken eingehen.",
      disableBeacon: true,
      placement: "right",
    },
  ];

  return (
    <div>
      <Joyride
        steps={joyrideSteps}
        continuous={true}
        run={runTour}
        spotlightClicks={true}
        disableScrolling={true}
        hideBackButton={true}
        callback={handleJoyrideCallback}
        styles={joyrideStyle}
        locale={joyrideLocale}
      />
      <JobAdvertControl
        applicationParameters={applicationParameters}
        pushApplicationParameters={pushApplicationParameters}
      />
      <ResumeControl
        applicationParameters={applicationParameters}
        pushApplicationParameters={pushApplicationParameters}
        postMessageAndOpenChat={postMessageAndOpenChat}
      />
      <WordCountControl
        applicationParameters={applicationParameters}
        pushApplicationParameters={pushApplicationParameters}
      />
      <LanguageControl
        applicationParameters={applicationParameters}
        pushApplicationParameters={pushApplicationParameters}
      />
      <RegenerateControl
        applicationParameters={applicationParameters}
        pushApplicationParameters={pushApplicationParameters}
      />
      <ImproveResumeControl
        applicationParameters={applicationParameters}
        postMessageAndOpenChat={postMessageAndOpenChat}
      />
    </div>
  );
}
