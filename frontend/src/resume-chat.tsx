import React, { useState, useEffect, useMemo, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { ApplicationParameters } from "../../backend/cover-letter/bindings/ApplicationParameters";
import { ChatLog } from "../../backend/cover-letter/bindings/ChatLog";
import { ChatLogEntry } from "../../backend/cover-letter/bindings/ChatLogEntry";
import { ApplicationId } from "../../backend/cover-letter/bindings/ApplicationId";
import { postUserMessage, urlGetChatResponse } from "./api/chat";
import { ChatResponseData } from "../../backend/cover-letter/bindings/ChatResponseData";
import { ChatResponseError } from "../../backend/cover-letter/bindings/ChatResponseError";
import { useSse } from "./api/server-sent-events";

type ResumeChatProps = {
  applicationParameters: ApplicationParameters;
  applicationId: ApplicationId;
  revisionId: string | null;
  setRevisionId: (revisionId: string) => void;
};

function useChatData(
  flatRevisionId: string | null,
  applicationId: ApplicationId,
  setRevisionId: (revisionId: string) => void,
) {
  const [chatLog, setChatLog] = useState<ChatLog>({
    chatLog: [],
  });
  const [responseText, setResponseText] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [fetchTrigger, setFetchTrigger] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");

  const revisionId =
    flatRevisionId === null ? null : { revisionId: flatRevisionId };

  const url = urlGetChatResponse(applicationId, revisionId);
  const { fetchInProgress, events } = useSse<
    ChatResponseData,
    ChatResponseError
  >(url, fetchTrigger);

  useEffect(() => {
    if (events == null) {
      return;
    }
    (async () => {
      const newResponseText = { value: "" };
      for await (const event of events) {
        switch (event.kind) {
          case "ok":
            switch (event.data.kind) {
              case "chatLog":
                setChatLog(event.data);
                setResponseText("");
                setUserInput("");
                break;
              case "responseChunk":
                const responseChunkEvent: {
                  kind: "responseChunk";
                } & ChatResponseData = event.data;
                newResponseText.value += responseChunkEvent.text;
                setResponseText((prevText) => {
                  if (prevText.startsWith(newResponseText.value)) {
                    return prevText;
                  } else {
                    return newResponseText.value;
                  }
                });
                break;
              case "revisionId":
                setRevisionId(event.data.revisionId);
                break;
              default:
                const exhaustive: never = event.data;
                throw new Error(`Unhandled data type: ${exhaustive}`);
            }
            break;
          case "err":
            setShowError(true);
            break;
          default:
            const exhaustive: never = event;
            throw new Error(`Unhandled event type: ${exhaustive}`);
        }
      }
    })();
  }, [events, setRevisionId]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    try {
      await postUserMessage(applicationId, userInput.trim());
      setFetchTrigger(!fetchTrigger);
    } catch (error) {
      console.error("Error posting user message", error);
      setShowError(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };

  const completeChatLog = useMemo(() => {
    const result = { ...chatLog };
    if (responseText) {
      result.chatLog = [
        ...chatLog.chatLog,
        {
          role: "assistant",
          content: responseText,
          imageUrl: null,
        } as ChatLogEntry,
      ];
    }
    return result;
  }, [chatLog, responseText]);

  return {
    chatLog: completeChatLog,
    showError,
    fetchInProgress,
    userInput,
    handleInputChange,
    handleSubmit,
  };
}

const SendIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor" />
  </svg>
);

const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
const LoadingIcon = (
  <React.Fragment>
    <style>{keyframes}</style>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        animation: "spin 1s linear infinite",
      }}
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </React.Fragment>
);

const paddingWithinContainerInPx = 0;
const borderRadiusInPx = 4;

const styles = {
  chatContainer: {
    display: "flex",
    flexDirection: "column" as const,
    height: "100%",
    border: "1px solid #ccc",
    borderRadius: `${borderRadiusInPx}px`,
    overflow: "hidden",
  },
  messagesContainer: {
    flex: 1,
    overflowY: "auto" as const,
    padding: `${paddingWithinContainerInPx}px`,
    display: "flex",
    flexDirection: "column" as const,
    scrollBehavior: "smooth" as const,
  },
  messageBubble: {
    maxWidth: "90%",
    padding: "4px 6px",
    borderRadius: `${borderRadiusInPx}px`,
    marginBottom: "8px",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
    color: "white",
  },
  assistantMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
    color: "black",
  },
  inputContainer: {
    display: "flex",
    padding: `${paddingWithinContainerInPx}px`,
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    // do not change border color on focus:
    outline: "none",
  },
  errorMessage: {
    backgroundColor: "#ffcccc",
    color: "#ff0000",
    padding: "10px",
  },
};

export function ResumeChat({
  applicationParameters,
  applicationId,
  revisionId,
  setRevisionId,
}: ResumeChatProps): JSX.Element {
  const {
    chatLog,
    showError,
    fetchInProgress,
    userInput,
    handleInputChange,
    handleSubmit,
  } = useChatData(revisionId, applicationId, setRevisionId);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chatHeight, setChatHeight] = useState<string>("100%");

  const updateChatHeight = () => {
    if (chatContainerRef.current) {
      const rect = chatContainerRef.current.getBoundingClientRect();
      const topPosition = rect.top;
      const viewportHeight = window.innerHeight;
      const newHeight = viewportHeight - topPosition - 20; // 20px buffer
      setChatHeight(`${newHeight}px`);
    }
  };

  useEffect(() => {
    updateChatHeight();
    window.addEventListener("resize", updateChatHeight);
    window.addEventListener("scroll", updateChatHeight);
    return () => {
      window.removeEventListener("resize", updateChatHeight);
      window.removeEventListener("scroll", updateChatHeight);
    };
  }, []);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  const dynamicStyles = {
    ...styles,
    chatContainer: {
      ...styles.chatContainer,
      maxHeight: chatHeight,
    },
  };

  return (
    <div ref={chatContainerRef} style={dynamicStyles.chatContainer}>
      <div ref={messagesContainerRef} style={dynamicStyles.messagesContainer}>
        {chatLog.chatLog
          .filter(
            (entry) => entry.role === "user" || entry.role === "assistant",
          )
          .map((entry, index) => (
            <div
              key={index}
              style={{
                ...dynamicStyles.messageBubble,
                ...(entry.role === "user"
                  ? dynamicStyles.userMessage
                  : dynamicStyles.assistantMessage),
              }}
            >
              <ReactMarkdown>{entry.content}</ReactMarkdown>
            </div>
          ))}
      </div>
      <form onSubmit={handleSubmit} style={dynamicStyles.inputContainer}>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Nachricht eingeben"
          disabled={fetchInProgress}
          style={dynamicStyles.input}
        />
        <button
          className="btn btn-dark"
          type="submit"
          disabled={fetchInProgress}
          style={{
            borderRadius: "0",
          }}
        >
          <div
            style={{
              position: "relative",
            }}
          >
            {fetchInProgress ? LoadingIcon : SendIcon}
          </div>
        </button>
      </form>
      {showError && (
        <div style={dynamicStyles.errorMessage}>
          Etwas ist schief gelaufen. Bitte laden Sie die Seite neu.
        </div>
      )}
    </div>
  );
}
