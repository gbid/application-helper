import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { de } from "date-fns/locale";

export type EditableSpanProps = {
  value: string | null;
  placeholder: string;
  onChange: (value: string | null) => void;
  multiline?: boolean;
  onEnter?: () => void;
  formatter?: (value: string) => JSX.Element;
};

export function EditableSpan({
  value,
  placeholder,
  onChange,
  onEnter,
  multiline = false,
  formatter,
}: EditableSpanProps): JSX.Element {
  const [editedValue, setEditedValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      adjustTextareaHeight(textareaRef.current);
    }
  }, [isEditing]);

  function handleSpanClick() {
    setIsEditing(true);
  }

  function adjustTextareaHeight(element: HTMLTextAreaElement) {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }

  function submitValue(element: HTMLInputElement | HTMLTextAreaElement) {
    setIsEditing(false);
    let newValue: string | null = element.value.trim();
    if (newValue === "") {
      newValue = null;
    }
    if (newValue !== editedValue) {
      setEditedValue(newValue);
      onChange(newValue);
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (e.key === "Enter" && !e.shiftKey) {
      if (onEnter) {
        e.preventDefault();
        onEnter();
        setIsEditing(false);
        return;
      } else {
        e.preventDefault();
        submitValue(e.currentTarget);
        return;
      }
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setIsEditing(false);
    }
  }

  function handleBlur(
    ev: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    submitValue(ev.target);
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (multiline) {
      adjustTextareaHeight(e.target);
    }
  }

  if (isEditing) {
    return multiline ? (
      <textarea
        ref={textareaRef}
        defaultValue={editedValue ?? ""}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        autoFocus
        style={{ width: "100%", resize: "none", overflow: "hidden" }}
      />
    ) : (
      <input
        type="text"
        defaultValue={editedValue ?? ""}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    );
  } else {
    return (
      <span onClick={handleSpanClick}>
        {formatter !== undefined
          ? formatter(editedValue ?? "")
          : (editedValue ?? placeholder)}
      </span>
    );
  }
}

type EditableEmailProps = {
  value: string | null;
  placeholder: string;
  onChange: (value: string | null) => void;
};

export function EditableEmail({
  value,
  placeholder,
  onChange,
}: EditableEmailProps): JSX.Element {
  const formatEmail = (email: string) => {
    const [localPart, domain] = email.split("@");
    return (
      <>
        <span className="email-local-part">{localPart}</span>
        {domain && (
          <>
            <wbr />
            <span className="email-at">@</span>
            <span className="email-domain">{domain}</span>
          </>
        )}
      </>
    );
  };

  return (
    <span className="email-wrapper">
      <EditableSpan
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        formatter={formatEmail}
      />
    </span>
  );
}

export enum ExtendedDateKind {
  Now = "Now",
  StandardDate = "StandardDate",
}

export type ExtendedDate =
  | { kind: ExtendedDateKind.Now }
  | { kind: ExtendedDateKind.StandardDate; date: Date };

export function parseExtendedDate(value: string): ExtendedDate | null {
  if (value === "now") {
    return { kind: ExtendedDateKind.Now };
  }
  const parsedDate = new Date(value);
  if (isNaN(parsedDate.getTime())) {
    return null;
  }
  // if Date is today, return "now"
  // this is a hack absusing the datepickers "todayButton" feature
  const now = new Date();
  if (
    now.getFullYear() === parsedDate.getFullYear() &&
    now.getMonth() === parsedDate.getMonth() &&
    now.getDate() === parsedDate.getDate()
  ) {
    return { kind: ExtendedDateKind.Now };
  }
  return { kind: ExtendedDateKind.StandardDate, date: parsedDate };
}

export function EditableDate({
  value,
  onChange,
}: {
  value: ExtendedDate | null;
  onChange: (value: Date | null) => void;
}): JSX.Element {
  let customInput = null;
  let selectedDate = null;
  if (value !== null) {
    switch (value.kind) {
      case ExtendedDateKind.Now:
        customInput = <span>heute</span>;
        selectedDate = new Date();
        break;
      case ExtendedDateKind.StandardDate:
        customInput = (
          <span>{format(value.date, "MMM yyyy", { locale: de })}</span>
        );
        selectedDate = value.date;
        break;
      default: {
        const exhaustiveCheck: never = value;
        throw new Error(`Unhandled ExtendedDateKind: ${exhaustiveCheck}`);
      }
    }
  }

  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      dateFormat="MMM yyyy"
      showMonthYearPicker
      locale={de}
      customInput={customInput ?? undefined}
      todayButton="heute"
    />
  );
}
