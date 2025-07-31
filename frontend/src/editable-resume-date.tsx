import type { ResumeDate } from "../../backend/cover-letter/bindings/ResumeDate";
import React, { useState } from "react";

type YearOption =
  | Extract<ResumeDate, { kind: "Year" | "Now" }>
  | { kind: "Unselected" };
type MonthOption = { kind: "Month"; value: number } | { kind: "Unselected" };
type DayOption = { kind: "Day"; value: number } | { kind: "Unselected" };

function formatDate(date: ResumeDate | null): string {
  if (date === null) return "";
  switch (date.kind) {
    case "Year":
      return `${date.year}`;
    case "YearMonth":
      return `${String(date.month).padStart(2, "0")}/${date.year}`;
    case "YearMonthDay":
      return `${String(date.day).padStart(2, "0")}.${String(date.month).padStart(2, "0")}.${date.year}`;
    case "Now":
      return "heute";
    default:
      const exhaustiveCheck: never = date;
      throw new Error(`Unhandled: ${exhaustiveCheck}`);
  }
}

function yearToString(year: YearOption): string {
  switch (year.kind) {
    case "Year":
      return year.year.toString();
    case "Now":
      return "now";
    case "Unselected":
      return "";
    default:
      const exhaustive = year;
      throw new Error(`Unhandled: ${exhaustive}`);
  }
}

function stringToYear(str: string): YearOption {
  if (str === "") return { kind: "Unselected" };
  if (str === "now") return { kind: "Now" };
  let year = parseInt(str, 10);
  if (isNaN(year)) {
    throw new Error(`Invalid year: ${str}`);
  }
  return { kind: "Year", year };
}

function monthToString(month: MonthOption): string | undefined {
  switch (month.kind) {
    case "Month":
      return month.value.toString();
    case "Unselected":
      return undefined;
    default:
      const exhaustive = month;
      throw new Error(`Unhandled: ${exhaustive}`);
  }
}

function stringToMonth(str: string): MonthOption {
  if (str === "") return { kind: "Unselected" };
  const month = parseInt(str, 10);
  if (isNaN(month)) {
    throw new Error(`Invalid month: ${str}`);
  }
  return { kind: "Month", value: month };
}

function dayToString(day: DayOption): string {
  switch (day.kind) {
    case "Day":
      return day.value.toString();
    case "Unselected":
      return "";
    default:
      const exhaustive = day;
      throw new Error(`Unhandled: ${exhaustive}`);
  }
}

function stringToDay(str: string): DayOption {
  if (str === "") return { kind: "Unselected" };
  const day = parseInt(str, 10);
  if (isNaN(day)) {
    throw new Error(`Invalid day: ${str}`);
  }
  return { kind: "Day", value: day };
}

type BaseEditableResumeDateProps = {
  value: ResumeDate | null;
  onChange: (value: ResumeDate | null) => void;
};

function BaseEditableResumeDate({
  value,
  onChange,
}: BaseEditableResumeDateProps): JSX.Element {
  const [yearOption, setYearOption] = useState<YearOption>(() => {
    if (value === null) return { kind: "Unselected" };
    switch (value.kind) {
      case "Year":
      case "YearMonth":
      case "YearMonthDay":
        return { kind: "Year", year: value.year };
      case "Now":
        return { kind: "Now" };
    }
  });

  const [monthOption, setMonthOption] = useState<MonthOption>(() => {
    if (value === null) return { kind: "Unselected" };
    switch (value.kind) {
      case "Year":
      case "Now":
        return { kind: "Unselected" };
      case "YearMonth":
      case "YearMonthDay":
        return { kind: "Month", value: value.month };
    }
  });

  const [dayOption, setDayOption] = useState<DayOption>(() => {
    if (value === null) return { kind: "Unselected" };
    switch (value.kind) {
      case "Year":
      case "YearMonth":
      case "Now":
        return { kind: "Unselected" };
      case "YearMonthDay":
        return { kind: "Day", value: value.day };
    }
  });

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = stringToYear(e.target.value);
    setYearOption(selectedYear);
    setMonthOption({ kind: "Unselected" });
    setDayOption({ kind: "Unselected" });

    switch (selectedYear.kind) {
      case "Unselected":
        onChange(null);
        break;
      case "Now":
        onChange({ kind: "Now" });
        break;
      case "Year":
        onChange({ kind: "Year", year: selectedYear.year });
        break;
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = stringToMonth(e.target.value);
    setMonthOption(selectedMonth);
    setDayOption({ kind: "Unselected" });

    switch (yearOption.kind) {
      case "Year":
        switch (selectedMonth.kind) {
          case "Unselected":
            onChange({ kind: "Year", year: yearOption.year });
            break;
          case "Month":
            onChange({
              kind: "YearMonth",
              year: yearOption.year,
              month: selectedMonth.value,
            });
            break;
        }
        break;
      case "Now":
      case "Unselected":
        throw new Error(
          "Month picker should be disabled if year picker is unselected or set to 'now'",
        );
      default:
        const exhaustiveCheck: never = yearOption;
        throw new Error(`Unhandled: ${exhaustiveCheck}`);
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDay = stringToDay(e.target.value);
    setDayOption(selectedDay);

    switch (yearOption.kind) {
      case "Year":
        switch (monthOption.kind) {
          case "Month":
            switch (selectedDay.kind) {
              case "Unselected":
                onChange({
                  kind: "YearMonth",
                  year: yearOption.year,
                  month: monthOption.value,
                });
                break;
              case "Day":
                onChange({
                  kind: "YearMonthDay",
                  year: yearOption.year,
                  month: monthOption.value,
                  day: selectedDay.value,
                });
                break;
            }
            break;
          case "Unselected":
            throw new Error(
              "Day picker should be disabled if month picker is unselected",
            );
          default:
            const exhaustiveCheck: never = monthOption;
            throw new Error(`Unhandled: ${exhaustiveCheck}`);
        }
        break;
      case "Now":
      case "Unselected":
        throw new Error(
          "Day picker should be disabled if year picker is unselected or set to 'now'",
        );
      default:
        const exhaustiveCheck: never = yearOption;
        throw new Error(`Unhandled: ${exhaustiveCheck}`);
    }
  };

  const renderYearPicker = () => (
    <select value={yearToString(yearOption)} onChange={handleYearChange}>
      <option value=""></option>
      <option value="now">heute</option>
      {Array.from({ length: 60 }, (_, i) => 1970 + i).map((y) => (
        <option key={y} value={y.toString()}>
          {y}
        </option>
      ))}
    </select>
  );

  const renderMonthPicker = () => {
    if (yearOption.kind !== "Year") return null;
    return (
      <select value={monthToString(monthOption)} onChange={handleMonthChange}>
        <option value=""></option>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
          <option key={m} value={m.toString()}>
            {String(m).padStart(2, "0")}
          </option>
        ))}
      </select>
    );
  };

  const renderDayPicker = () => {
    if (yearOption.kind !== "Year" || monthOption.kind !== "Month") return null;
    const daysInMonth = new Date(
      yearOption.year,
      monthOption.value,
      0,
    ).getDate();
    return (
      <select value={dayToString(dayOption)} onChange={handleDayChange}>
        <option value=""></option>
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
          <option key={d} value={d.toString()}>
            {String(d).padStart(2, "0")}
          </option>
        ))}
      </select>
    );
  };

  return (
    <span>
      {renderDayPicker()}
      {renderMonthPicker()}
      {renderYearPicker()}
    </span>
  );
}

export type EditableResumeDateProps = {
  value: ResumeDate | null;
  onChange: (value: ResumeDate | null) => void;
};

export function EditableResumeDate({
  value,
  onChange,
}: EditableResumeDateProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const spanRef = React.useRef<HTMLSpanElement>(null);

  const handleClick = React.useCallback(() => {
    setIsEditing(true);
    // Focus the span after a short delay to "ensure" it happens after the state update
    setTimeout(() => {
      if (spanRef.current) {
        spanRef.current.focus();
      }
    }, 0);
  }, []);

  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLSpanElement>) => {
      // Only blur if the new focus target is outside of this component
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setIsEditing(false);
      }
    },
    [],
  );

  if (isEditing === false) {
    return (
      <span ref={spanRef} onClick={handleClick} tabIndex={0}>
        {formatDate(value)}
      </span>
    );
  } else {
    return (
      <span ref={spanRef} onBlur={handleBlur} tabIndex={-1}>
        <BaseEditableResumeDate value={value} onChange={onChange} />
      </span>
    );
  }
}

export type EditableResumeDateRangeProps = {
  startDate: ResumeDate | null;
  endDate: ResumeDate | null;
  onChangeStartDate: (value: ResumeDate | null) => void;
  onChangeEndDate: (value: ResumeDate | null) => void;
};

export function EditableResumeDateRange({
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
}: EditableResumeDateRangeProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const spanRef = React.useRef<HTMLSpanElement>(null);

  const displayValue = () => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    if (formattedStartDate && formattedEndDate) {
      return `${formattedStartDate} - ${formattedEndDate}`;
    } else if (formattedStartDate) {
      return formattedStartDate;
    } else if (formattedEndDate) {
      return formattedEndDate;
    } else {
      return <span className="no-print">[Datumsbereich]</span>;
    }
  };

  const handleClick = React.useCallback(() => {
    setIsEditing(true);
    // Focus the span after a short delay to "ensure" it happens after the state update
    setTimeout(() => {
      if (spanRef.current) {
        spanRef.current.focus();
      }
    }, 0);
  }, []);

  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLSpanElement>) => {
      // Only blur if the new focus target is outside of this component
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setIsEditing(false);
      }
    },
    [],
  );

  if (!isEditing) {
    return (
      <span ref={spanRef} onClick={handleClick} tabIndex={0}>
        {displayValue()}
      </span>
    );
  }

  return (
    <span ref={spanRef} onBlur={handleBlur} tabIndex={-1}>
      <BaseEditableResumeDate value={startDate} onChange={onChangeStartDate} />
      {" - "}
      <BaseEditableResumeDate value={endDate} onChange={onChangeEndDate} />
    </span>
  );
}
