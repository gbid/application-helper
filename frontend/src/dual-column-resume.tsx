import React, { Fragment, useState } from "react";
import { ApplicationParameters } from "../../backend/cover-letter/bindings/ApplicationParameters";
import { Basics } from "../../backend/cover-letter/bindings/Basics";
import { Education } from "../../backend/cover-letter/bindings/Education";
import { JsonResume } from "../../backend/cover-letter/bindings/JsonResume";
import { Skills } from "../../backend/cover-letter/bindings/Skills";
import { Skill } from "../../backend/cover-letter/bindings/Skill";
import { Work } from "../../backend/cover-letter/bindings/Work";
import { Volunteer } from "../../backend/cover-letter/bindings/Volunteer";
import { Certificate } from "../../backend/cover-letter/bindings/Certificate";
import { PersonalInfo } from "../../backend/cover-letter/bindings/PersonalInfo";
import {
  EditableResumeDate,
  EditableResumeDateRange,
} from "./editable-resume-date";
import { EditableSpan, EditableEmail } from "./editable";
import { AdjustableFontSizeContainer } from "./adjustable-font-size";
// TODO: do we want to let each template specify this?
// In this case, we should move it to the style constants in this module.
import {
  PAGE_CONTAINER_MARGIN_TOP,
  PAGE_CONTAINER_MARGIN_BOTTOM,
  A4_PAGE_HEIGHT_PX,
} from "./styles";
import { useApplicationTitle } from "./application-title";
import { Headshot } from "./headshot";

import { NO_PRINT, MULTI_PAGE } from "./styles";
import { BasicsCallbacks } from "./useJsonResume";
import { SkillsCallbacks } from "./useJsonResume";
import { PersonalInfoCallbacks } from "./useJsonResume";
import { WorkCallbacks } from "./useJsonResume";
import { EducationCallbacks } from "./useJsonResume";
import { VolunteerCallbacks } from "./useJsonResume";
import { CertificatesCallbacks } from "./useJsonResume";
import { JsonResumeCallbacks } from "./useJsonResume";
import { styleConstants } from "./styles";

enum RelativePosition {
  Before = "before",
  After = "after",
}

type SoftwareElementStyle = {
  container: React.CSSProperties;
  title: React.CSSProperties;
  contentContainer: React.CSSProperties;
};

type LanguagesElementStyle = {
  container: React.CSSProperties;
  title: React.CSSProperties;
  contentContainer: React.CSSProperties;
};

type SkillElementStyle = {
  container: React.CSSProperties;
};

type ContactsElementStyle = {
  container: React.CSSProperties;
  title: React.CSSProperties;
  contentContainer: React.CSSProperties;
  row: React.CSSProperties;
  icons: React.CSSProperties;
  locationElements: React.CSSProperties;
};

type PersonalInfoElementStyle = {
  container: React.CSSProperties;
  title: React.CSSProperties;
  contentContainer: React.CSSProperties;
};

type WorkElementStyle = {
  container: React.CSSProperties;
  header: React.CSSProperties;
  titleGroup: React.CSSProperties;
  position: React.CSSProperties;
  company: React.CSSProperties;
  location: React.CSSProperties;
  date: React.CSSProperties;
  highlights: React.CSSProperties;
};

type EducationElementStyle = {
  container: React.CSSProperties;
  header: React.CSSProperties;
  titleGroup: React.CSSProperties;
  degree: React.CSSProperties;
  institution: React.CSSProperties;
  date: React.CSSProperties;
  courses: React.CSSProperties;
};

type VolunteerElementStyle = {
  container: React.CSSProperties;
  header: React.CSSProperties;
  titleGroup: React.CSSProperties;
  position: React.CSSProperties;
  organization: React.CSSProperties;
  location: React.CSSProperties;
  date: React.CSSProperties;
  highlights: React.CSSProperties;
};

type CertificateElementStyle = {
  container: React.CSSProperties;
  header: React.CSSProperties;
  titleGroup: React.CSSProperties;
  name: React.CSSProperties;
  institution: React.CSSProperties;
  date: React.CSSProperties;
  highlights: React.CSSProperties;
};

type NameHeadingStyle = {
  container: React.CSSProperties;
  name: React.CSSProperties;
  firstName: React.CSSProperties;
  lastName: React.CSSProperties;
  caption: React.CSSProperties;
};

type DriversLicenceElementStyle = {
  container: React.CSSProperties;
  title: React.CSSProperties;
  contentContainer: React.CSSProperties;
};

type CharacterTraitsElementStyle = {
  container: React.CSSProperties;
  title: React.CSSProperties;
  contentContainer: React.CSSProperties;
};

type InterestsElementStyle = {
  container: React.CSSProperties;
  title: React.CSSProperties;
  contentContainer: React.CSSProperties;
};

type ResumeComponentStyles = {
  driversLicenceElement: DriversLicenceElementStyle;
  characterTraitsElement: CharacterTraitsElementStyle;
  interestsElement: InterestsElementStyle;
  softwareElement: SoftwareElementStyle;
  languagesElement: LanguagesElementStyle;
  skillElement: SkillElementStyle;
  contactsElement: ContactsElementStyle;
  personalInfoElement: PersonalInfoElementStyle;
  workElement: WorkElementStyle;
  educationElement: EducationElementStyle;
  volunteerElement: VolunteerElementStyle;
  certificateElement: CertificateElementStyle;
  nameHeading: NameHeadingStyle;
};

type GlobalStyles = {
  resume: React.CSSProperties;
  sidebar: React.CSSProperties;
  sidebarInner: React.CSSProperties;
  content: React.CSSProperties;
  contentInner: React.CSSProperties;
  sectionHeader: React.CSSProperties;
  portrait: React.CSSProperties;
};

type ResumeStyles = ResumeComponentStyles & GlobalStyles;

const dualColumnLayoutConstants = {
  sidebarWidth: "33.333333%",
  contentWidth: "66.6666%",
};

const dualColumnStyles: ResumeStyles = {
  resume: {
    letterSpacing: styleConstants.letterSpacing.normal,
    margin: 0,
    padding: 0,
    width: "100%",
    fontFamily: '"Montserrat", sans-serif',
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    fontSmooth: "antialiased",
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    fontSize: styleConstants.fontSize.normal,
    overflowWrap: "break-word",
  },
  sidebar: {
    backgroundColor: styleConstants.colors.secondary,
    minWidth: dualColumnLayoutConstants.sidebarWidth,
    fontSize: styleConstants.fontSize.normal,
  },
  sidebarInner: {
    paddingLeft: styleConstants.spacing.large,
    paddingRight: styleConstants.spacing.large,
    marginTop: PAGE_CONTAINER_MARGIN_TOP,
    marginBottom: PAGE_CONTAINER_MARGIN_BOTTOM,
  },
  contentInner: {
    paddingLeft: styleConstants.spacing.extraLarge,
    paddingRight: styleConstants.spacing.extraLarge,
    marginTop: PAGE_CONTAINER_MARGIN_TOP,
    marginBottom: PAGE_CONTAINER_MARGIN_BOTTOM,
  },
  content: {
    minWidth: dualColumnLayoutConstants.contentWidth,
  },
  portrait: {
    width: "100%",
    height: "auto",
  },
  sectionHeader: {
    fontSize: styleConstants.fontSize.large,
    textTransform: "uppercase",
    letterSpacing: styleConstants.letterSpacing.extraWide,
    paddingBottom: styleConstants.spacing.small,
    borderBottom: `1px solid ${styleConstants.colors.primary}`,
    marginTop: styleConstants.spacing.large,
  },
  driversLicenceElement: {
    container: {},
    title: {
      fontSize: styleConstants.fontSize.large,
      marginBottom: styleConstants.spacing.small,
    },
    contentContainer: {},
  },
  characterTraitsElement: {
    container: {},
    title: {
      fontSize: styleConstants.fontSize.large,
      marginBottom: styleConstants.spacing.small,
    },
    contentContainer: {},
  },
  interestsElement: {
    container: {},
    title: {
      fontSize: styleConstants.fontSize.large,
      marginBottom: styleConstants.spacing.small,
    },
    contentContainer: {},
  },
  softwareElement: {
    container: {},
    title: {
      fontSize: styleConstants.fontSize.large,
      marginBottom: styleConstants.spacing.small,
    },
    contentContainer: {},
  },
  languagesElement: {
    container: { lineHeight: styleConstants.lineHeight },
    title: {
      fontSize: styleConstants.fontSize.large,
      marginBottom: styleConstants.spacing.small,
    },
    contentContainer: {},
  },
  skillElement: {
    container: {},
  },
  contactsElement: {
    container: {},
    title: {
      textTransform: "uppercase",
      letterSpacing: styleConstants.letterSpacing.wide,
      borderBottom: `1px solid ${styleConstants.colors.primary}`,
      paddingTop: 0,
      paddingBottom: styleConstants.spacing.small,
      fontSize: styleConstants.fontSize.large,
    },
    contentContainer: {},
    row: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      lineHeight: styleConstants.lineHeight,
      marginBottom: styleConstants.spacing.small,
    },
    icons: { marginRight: styleConstants.spacing.small, display: "inline" },
    locationElements: { display: "inline" },
  },
  workElement: {
    container: {
      pageBreakInside: "avoid",
      lineHeight: styleConstants.lineHeight,
      marginBottom: styleConstants.spacing.normal,
    },
    header: {},
    titleGroup: {},
    position: {
      fontSize: styleConstants.fontSize.large,
      marginBottom: 0,
      fontWeight: styleConstants.fontWeight.bold,
    },
    company: {
      display: "inline",
    },
    location: {
      display: "inline",
    },
    highlights: {
      marginBottom: 0,
      margin: 0,
    },
    date: {},
  },
  volunteerElement: {
    container: {
      pageBreakInside: "avoid",
      lineHeight: styleConstants.lineHeight,
      marginBottom: styleConstants.spacing.normal,
    },
    header: {},
    titleGroup: {},
    position: {
      fontSize: styleConstants.fontSize.large,
      marginBottom: 0,
      fontWeight: styleConstants.fontWeight.bold,
    },
    organization: {
      display: "inline",
    },
    location: {
      display: "inline",
    },
    highlights: {
      marginBottom: 0,
      margin: 0,
    },
    date: {},
  },
  certificateElement: {
    container: {
      pageBreakInside: "avoid",
      lineHeight: styleConstants.lineHeight,
      marginBottom: styleConstants.spacing.normal,
    },
    header: {},
    titleGroup: {},
    name: {
      fontSize: styleConstants.fontSize.large,
      marginBottom: 0,
      fontWeight: styleConstants.fontWeight.bold,
    },
    institution: {
      display: "inline",
    },
    date: {},
    highlights: {
      marginBottom: 0,
      margin: 0,
    },
  },
  personalInfoElement: {
    container: {},
    title: {
      textTransform: "uppercase",
      letterSpacing: styleConstants.letterSpacing.wide,
      paddingTop: 0,
      paddingBottom: styleConstants.spacing.small,
      fontSize: styleConstants.fontSize.large,
      borderBottom: `1px solid ${styleConstants.colors.primary}`,
      marginTop: styleConstants.spacing.large,
    },
    contentContainer: {},
  },
  nameHeading: {
    container: {
      display: "flex",
      flexDirection: "column",
      marginBottom: styleConstants.spacing.large,
    },
    firstName: {},
    lastName: {},
    name: {
      letterSpacing: styleConstants.letterSpacing.superWide,
      fontWeight: styleConstants.fontWeight.normal,
      whiteSpace: "nowrap",
      textTransform: "uppercase",
    },
    caption: {
      overflowWrap: "break-word",
      textTransform: "uppercase",
      letterSpacing: styleConstants.letterSpacing.extraWide,
      fontWeight: styleConstants.fontWeight.bold,
      fontSize: styleConstants.fontSize.XLarge,
      backgroundColor: styleConstants.colors.secondary,
      marginTop: styleConstants.spacing.normal,
      padding: styleConstants.spacing.small,
    },
  },
  educationElement: {
    container: {
      pageBreakInside: "avoid",
      lineHeight: styleConstants.lineHeight,
      marginBottom: styleConstants.spacing.normal,
    },
    header: {},
    titleGroup: {},
    degree: {
      fontSize: styleConstants.fontSize.large,
      marginBottom: 0,
      fontWeight: styleConstants.fontWeight.bold,
    },
    institution: {
      display: "inline",
    },
    date: {},
    courses: {
      marginBottom: 0,
      display: "none",
    },
  },
};

const hoverButtonStyle: React.CSSProperties = {
  position: "absolute",
  right: "0",
  bottom: "0",
  zIndex: 10,
};

function WorkElement({
  work,
  setWorkPosition,
  addWorkPosition,
}: {
  work: Work;
  setWorkPosition: (work: Work) => void;
  addWorkPosition: (relativePosition: RelativePosition) => void;
}): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const style = dualColumnStyles.workElement;

  const onChangeWorkPosition = (value: string | null) => {
    let newWork = {
      ...work,
      position: value === null ? "" : value,
    };
    setWorkPosition(newWork);
  };

  const onChangeWorkName = (value: string | null) => {
    let newWork = {
      ...work,
      name: value === null ? "" : value,
    };
    setWorkPosition(newWork);
  };

  const onChangeWorkLocation = (value: string | null) => {
    let newWork = {
      ...work,
      location: value === null ? "" : value,
    };
    setWorkPosition(newWork);
  };

  const onChangeWorkHighlights = (value: string | null, i: number) => {
    let newHighlights = work.highlights.slice();
    if (value === null) {
      newHighlights.splice(i, 1);
    } else {
      newHighlights[i] = value;
    }
    let newWork = {
      ...work,
      highlights: newHighlights,
    };
    setWorkPosition(newWork);
  };

  const addWorkHighlight = (index: number) => {
    const newWorkHighlight = "Mustertätigkeit";
    let newHighlights = [...work.highlights];
    newHighlights.splice(index, 0, newWorkHighlight);
    let newWork = {
      ...work,
      highlights: newHighlights,
    };
    setWorkPosition(newWork);
  };

  return (
    <div
      style={style.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={style.header}>
        <div style={style.titleGroup}>
          <div style={style.position}>
            <EditableSpan
              value={work.position}
              multiline={true}
              placeholder={""}
              onChange={onChangeWorkPosition}
            />
            {isHovered && (
              <button
                onClick={() => addWorkPosition(RelativePosition.Before)}
                className={`btn btn-outline-dark ${NO_PRINT}`}
                style={hoverButtonStyle}
              >
                +
              </button>
            )}
          </div>
          <div>
            {work.name.trim() !== "" && (
              <div style={style.company}>
                <EditableSpan
                  value={work.name}
                  placeholder={""}
                  onChange={onChangeWorkName}
                />
              </div>
            )}
            {work.location.trim() !== "" && (
              <div style={style.location}>
                {work.name.trim() !== "" && ", "}
                <EditableSpan
                  value={work.location}
                  placeholder={""}
                  onChange={onChangeWorkLocation}
                />
              </div>
            )}
          </div>
        </div>
        <div style={style.date}>
          <EditableResumeDateRange
            startDate={work.startDate}
            endDate={work.endDate}
            onChangeStartDate={(date) => {
              setWorkPosition({
                ...work,
                startDate: date,
              });
            }}
            onChangeEndDate={(date) => {
              setWorkPosition({
                ...work,
                endDate: date,
              });
            }}
          />
        </div>
      </div>
      {work.highlights.length !== 0 && (
        <ul style={style.highlights}>
          {work.highlights
            .filter((highlight) => highlight.trim() !== "")
            .map((highlight, i) => (
              <li key={i}>
                <EditableSpan
                  value={highlight}
                  multiline={true}
                  placeholder={""}
                  onChange={(value) => {
                    onChangeWorkHighlights(value, i);
                  }}
                  onEnter={() => addWorkHighlight(i + 1)}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

function EducationElement({
  education,
  setEducation,
  addEducation,
}: {
  education: Education;
  setEducation: (education: Education) => void;
  addEducation: (relativePosition: RelativePosition) => void;
}): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const style = dualColumnStyles.educationElement;

  const onChangeDegree = (value: string | null) => {
    setEducation({
      ...education,
      degree: value === null ? "" : value,
    });
  };

  const onChangeInstitution = (value: string | null) => {
    setEducation({
      ...education,
      institution: value === null ? "" : value,
    });
  };

  const onChangeScore = (value: string | null) => {
    setEducation({
      ...education,
      score: value === null ? "" : value,
    });
  };

  const onChangeCourse = (value: string | null, i: number) => {
    const newCourses = [...education.courses];
    if (value === null) {
      newCourses.splice(i, 1);
    } else {
      newCourses[i] = value;
    }
    setEducation({
      ...education,
      courses: newCourses,
    });
  };

  const addCourse = () => {
    setEducation({
      ...education,
      courses: [...education.courses, "New course"],
    });
  };

  return (
    <div
      style={style.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={style.header}>
        <div style={style.titleGroup}>
          <div style={style.degree}>
            <EditableSpan
              value={education.degree}
              placeholder={""}
              onChange={onChangeDegree}
            />
            {isHovered && (
              <button
                onClick={() => addEducation(RelativePosition.Before)}
                className={`btn btn-outline-dark ${NO_PRINT}`}
                style={hoverButtonStyle}
              >
                +
              </button>
            )}
          </div>
          {education.institution.trim() !== "" && (
            <div style={style.institution}>
              <EditableSpan
                value={education.institution}
                placeholder={""}
                onChange={onChangeInstitution}
              />
            </div>
          )}
        </div>
        <div style={style.date}>
          <EditableResumeDateRange
            startDate={education.startDate}
            endDate={education.endDate}
            onChangeStartDate={(date) => {
              setEducation({
                ...education,
                startDate: date,
              });
            }}
            onChangeEndDate={(date) => {
              setEducation({
                ...education,
                endDate: date,
              });
            }}
          />
        </div>
      </div>
      {education.score.trim() !== "" && (
        <div>
          Abschlussnote:{" "}
          <EditableSpan
            value={education.score}
            placeholder={""}
            onChange={onChangeScore}
          />
        </div>
      )}
      {education.courses.length !== 0 && (
        <ul style={style.courses}>
          {education.courses.map((course, i) => (
            <li key={i}>
              <EditableSpan
                value={course}
                placeholder={""}
                onChange={(value) => onChangeCourse(value, i)}
                onEnter={() => addCourse()}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SkillElement({
  skill,
  setSkill,
}: {
  skill: Skill;
  setSkill: (skill: Skill) => void;
}): JSX.Element {
  const style = dualColumnStyles.skillElement;

  const onChangeName = (value: string | null) => {
    setSkill({
      ...skill,
      name: value === null ? "" : value,
    });
  };

  const onChangeProficiency = (value: string | null) => {
    setSkill({
      ...skill,
      proficiency: value === null ? "" : value,
    });
  };

  return (
    <div style={style.container}>
      <EditableSpan
        value={skill.name}
        placeholder={""}
        onChange={onChangeName}
      />
      {skill.proficiency.trim() !== "" && ": "}
      {skill.proficiency.trim() !== "" && (
        <EditableSpan
          value={skill.proficiency}
          placeholder={""}
          onChange={onChangeProficiency}
        />
      )}
    </div>
  );
}

function ContactsElement({
  basics,
  callbacks,
}: {
  basics: Basics;
  callbacks: BasicsCallbacks;
}): JSX.Element | null {
  const style = dualColumnStyles.contactsElement;

  const emailElement =
    basics.email === "" ? null : (
      <div style={style.row}>
        <div style={style.icons}>
          <i className="bi bi-envelope"></i>
        </div>
        <EditableEmail
          value={basics.email}
          placeholder={""}
          onChange={callbacks.setEmail}
        />
      </div>
    );

  const phoneElement =
    basics.phone.trim() === "" || basics.phone.trim() === undefined ? null : (
      <div style={style.row}>
        <div style={style.icons}>
          <i className="bi bi-telephone"></i>
        </div>
        <EditableSpan
          value={basics.phone}
          placeholder={""}
          onChange={callbacks.setPhone}
        />
      </div>
    );

  const streetAddressElement =
    basics.location.streetAddress !== undefined &&
    basics.location.streetAddress.trim() !== "" ? (
      <Fragment key="streetAddress">
        <EditableSpan
          value={basics.location.streetAddress}
          placeholder={""}
          onChange={callbacks.setStreetAddress}
        />
        <span>{", "}</span>
      </Fragment>
    ) : null;
  const postalCodeElement =
    basics.location.postalCode !== undefined &&
    basics.location.postalCode.trim() !== "" ? (
      <Fragment key="postalCode">
        <EditableSpan
          value={basics.location.postalCode}
          placeholder={""}
          onChange={callbacks.setPostalCode}
        />
        <span> </span>
      </Fragment>
    ) : null;

  const cityElement =
    basics.location.city.trim() !== "" ? (
      <Fragment key="city">
        <EditableSpan
          value={basics.location.city}
          placeholder={""}
          onChange={callbacks.setCity}
          key="city"
        />
      </Fragment>
    ) : null;

  const locationElements = [
    streetAddressElement,
    postalCodeElement,
    cityElement,
  ];
  const locationElement = locationElements.some(
    (element) => element != null,
  ) ? (
    <div style={style.row}>
      <div style={style.icons}>
        <i className="bi bi-geo-alt"></i>
      </div>
      <div style={style.locationElements}>{locationElements}</div>
    </div>
  ) : null;

  const elements: ([JSX.Element, string] | null)[] = [
    emailElement === null ? null : [emailElement, "email"],
    phoneElement === null ? null : [phoneElement, "phone"],
    locationElement === null ? null : [locationElement, "location"],
  ];

  const filteredElements: [JSX.Element, string][] = elements.flatMap(
    (element) => {
      return element === null ? [] : [element];
    },
  );

  if (filteredElements.length === 0) {
    return null;
  }

  return (
    <div style={style.container}>
      <h2 style={style.title}>Kontakt</h2>
      <div style={style.contentContainer}>
        {filteredElements.map(([element, key]) => (
          <div key={key}>{element}</div>
        ))}
      </div>
    </div>
  );
}

function PersonalInfoElement({
  personalInfo,
  callbacks,
}: {
  personalInfo: PersonalInfo;
  callbacks: PersonalInfoCallbacks;
}): JSX.Element | null {
  const style = dualColumnStyles.personalInfoElement;

  let elements = [
    personalInfo.birthDate === null ? null : (
      <div key="birthDate">
        Geburtsdatum:{" "}
        <EditableResumeDate
          value={personalInfo.birthDate}
          onChange={callbacks.setBirthDate}
        />
      </div>
    ),
    personalInfo.birthPlace === "" ? null : (
      <div key="birthPlace">
        Geburtsort:{" "}
        <EditableSpan
          value={personalInfo.birthPlace}
          placeholder={""}
          onChange={callbacks.setBirthPlace}
        />
      </div>
    ),
    personalInfo.nationality === "" ? null : (
      <div key="nationality">
        Nationalität:{" "}
        <EditableSpan
          value={personalInfo.nationality}
          placeholder={""}
          onChange={callbacks.setNationality}
        />
      </div>
    ),
    personalInfo.maritalStatus === "" ? null : (
      <div key="maritalStatus">
        Familienstand:{" "}
        <EditableSpan
          value={personalInfo.maritalStatus}
          placeholder={""}
          onChange={callbacks.setMaritalStatus}
        />
      </div>
    ),
    personalInfo.children === "" ? null : (
      <div key="children">
        Kinder:{" "}
        <EditableSpan
          value={personalInfo.children}
          placeholder={""}
          onChange={callbacks.setChildren}
        />
      </div>
    ),
  ];

  elements = elements.filter((element) => element != null);

  if (elements.length === 0) {
    return null;
  }

  return (
    <div style={style.container}>
      <h2 style={style.title}>Über mich</h2>
      <div style={style.contentContainer}>{elements}</div>
    </div>
  );
}

function SoftwareElement({
  software,
  setSoftware,
}: {
  software: Skill[];
  setSoftware: (software: Skill[]) => void;
}): JSX.Element {
  const style = dualColumnStyles.softwareElement;
  return (
    <div style={style.container}>
      <h4 style={style.title}>Software</h4>
      <div style={style.contentContainer}>
        {software.map((softwareItem, i) => (
          <SkillElement
            key={i}
            skill={softwareItem}
            setSkill={(updatedSkill) => {
              const newSoftware = [...software];
              newSoftware[i] = updatedSkill;
              setSoftware(newSoftware);
            }}
          />
        ))}
      </div>
    </div>
  );
}

function LanguagesElement({
  languages,
  setLanguages,
}: {
  languages: Skill[];
  setLanguages: (languages: Skill[]) => void;
}): JSX.Element {
  const style = dualColumnStyles.languagesElement;
  return (
    <div style={style.container}>
      <h4 style={style.title}>Sprachen</h4>
      <div style={style.contentContainer}>
        {languages.map((language, i) => (
          <SkillElement
            skill={language}
            key={i}
            setSkill={(updatedSkill) => {
              const newLanguages = [...languages];
              newLanguages[i] = updatedSkill;
              setLanguages(newLanguages);
            }}
          />
        ))}
      </div>
    </div>
  );
}

function DriversLicenceElement({
  driversLicence,
  setDriversLicence,
}: {
  driversLicence?: string;
  setDriversLicence: (driversLicence: string) => void;
}): JSX.Element {
  const style = dualColumnStyles.driversLicenceElement;
  return (
    <div style={style.container}>
      <h4 style={style.title}>Führerschein</h4>
      <div style={style.contentContainer}>
        <EditableSpan
          value={driversLicence ?? ""}
          placeholder={""}
          onChange={(value) => setDriversLicence(value ?? "")}
        />
      </div>
    </div>
  );
}

function CharacterTraitsElement({
  characterTraits,
  setCharacterTraits,
}: {
  characterTraits: string[];
  setCharacterTraits: (characterTraits: string[]) => void;
}): JSX.Element {
  const style = dualColumnStyles.characterTraitsElement;
  return (
    <div style={style.container}>
      <h4 style={style.title}>Fähigkeiten</h4>
      <div style={style.contentContainer}>
        {characterTraits.map((trait, i) => (
          <div key={i}>
            <EditableSpan
              value={trait}
              placeholder={""}
              onChange={(value) => {
                const newTraits = [...characterTraits];
                if (value === null) {
                  newTraits.splice(i, 1);
                } else {
                  newTraits[i] = value;
                }
                setCharacterTraits(newTraits);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function InterestsElement({
  interests,
  setInterests,
}: {
  interests: string[];
  setInterests: (interests: string[]) => void;
}): JSX.Element {
  const style = dualColumnStyles.interestsElement;
  return (
    <div style={style.container}>
      <h4 style={style.title}>Interessen</h4>
      <div style={style.contentContainer}>
        {interests.map((interest, i) => (
          <div key={i}>
            <EditableSpan
              value={interest}
              placeholder={""}
              onChange={(value) => {
                const newInterests = [...interests];
                if (value === null) {
                  newInterests.splice(i, 1);
                } else {
                  newInterests[i] = value;
                }
                setInterests(newInterests);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsSection({
  skills,
  callbacks,
}: {
  skills: Skills;
  callbacks: SkillsCallbacks;
}): JSX.Element | null {
  const elements = [
    skills.software.length === 0 ? null : (
      <SoftwareElement
        key="software"
        software={skills.software}
        setSoftware={callbacks.setSoftware}
      />
    ),
    skills.languages.length === 0 ? null : (
      <LanguagesElement
        key="languages"
        languages={skills.languages}
        setLanguages={callbacks.setLanguages}
      />
    ),
    skills.driversLicence === "" ? null : (
      <DriversLicenceElement
        key="driversLicence"
        driversLicence={skills.driversLicence}
        setDriversLicence={callbacks.setDriversLicence}
      />
    ),
    skills.characterTraits.length === 0 ? null : (
      <CharacterTraitsElement
        key="characterTraits"
        characterTraits={skills.characterTraits}
        setCharacterTraits={callbacks.setCharacterTraits}
      />
    ),
    skills.interests.length === 0 ? null : (
      <InterestsElement
        key="interests"
        interests={skills.interests}
        setInterests={callbacks.setInterests}
      />
    ),
  ].filter((element) => element !== null);

  if (elements.length === 0) {
    return null;
  }

  return (
    <>
      <h2 style={dualColumnStyles.sectionHeader}>Kenntnisse</h2>
      {elements.map((element, index) => (
        <div
          key={index}
          style={{
            marginBottom:
              index === elements.length - 1 ? 0 : styleConstants.spacing.normal,
          }}
        >
          {element}
        </div>
      ))}
    </>
  );
}

function VolunteerElement({
  volunteer,
  setVolunteer,
  addVolunteer,
}: {
  volunteer: Volunteer;
  setVolunteer: (volunteer: Volunteer) => void;
  addVolunteer: (relativePosition: RelativePosition) => void;
}): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const style = dualColumnStyles.volunteerElement;

  const onChangePosition = (value: string | null) => {
    setVolunteer({
      ...volunteer,
      position: value === null ? "" : value,
    });
  };

  const onChangeOrganization = (value: string | null) => {
    setVolunteer({
      ...volunteer,
      organization: value === null ? "" : value,
    });
  };

  const onChangeHighlights = (value: string | null, i: number) => {
    let newHighlights = volunteer.highlights.slice();
    if (value === null) {
      newHighlights.splice(i, 1);
    } else {
      newHighlights[i] = value;
    }
    setVolunteer({
      ...volunteer,
      highlights: newHighlights,
    });
  };

  const addHighlight = (index: number) => {
    const newHighlight = "Mustertätigkeit";
    let newHighlights = [...volunteer.highlights];
    newHighlights.splice(index, 0, newHighlight);
    setVolunteer({
      ...volunteer,
      highlights: newHighlights,
    });
  };

  return (
    <div
      style={style.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={style.header}>
        <div style={style.titleGroup}>
          <div style={style.position}>
            <EditableSpan
              value={volunteer.position}
              multiline={true}
              placeholder={""}
              onChange={onChangePosition}
            />
            {isHovered && (
              <button
                onClick={() => addVolunteer(RelativePosition.Before)}
                className={`btn btn-outline-dark ${NO_PRINT}`}
                style={hoverButtonStyle}
              >
                +
              </button>
            )}
          </div>
          <div>
            {volunteer.organization.trim() !== "" && (
              <div style={style.organization}>
                <EditableSpan
                  value={volunteer.organization}
                  placeholder={""}
                  onChange={onChangeOrganization}
                />
              </div>
            )}
          </div>
        </div>
        <div style={style.date}>
          <EditableResumeDateRange
            startDate={volunteer.startDate}
            endDate={volunteer.endDate}
            onChangeStartDate={(date) => {
              setVolunteer({
                ...volunteer,
                startDate: date,
              });
            }}
            onChangeEndDate={(date) => {
              setVolunteer({
                ...volunteer,
                endDate: date,
              });
            }}
          />
        </div>
      </div>
      {volunteer.highlights.length !== 0 && (
        <ul style={style.highlights}>
          {volunteer.highlights
            .filter((highlight) => highlight.trim() !== "")
            .map((highlight, i) => (
              <li key={i}>
                <EditableSpan
                  value={highlight}
                  multiline={true}
                  placeholder={""}
                  onChange={(value) => {
                    onChangeHighlights(value, i);
                  }}
                  onEnter={() => addHighlight(i + 1)}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

function CertificateElement({
  certificate,
  setCertificate,
  addCertificate,
}: {
  certificate: Certificate;
  setCertificate: (certificate: Certificate) => void;
  addCertificate: (relativePosition: RelativePosition) => void;
}): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const style = dualColumnStyles.certificateElement;

  const onChangeName = (value: string | null) => {
    setCertificate({
      ...certificate,
      name: value === null ? "" : value,
    });
  };

  const onChangeInstitution = (value: string | null) => {
    setCertificate({
      ...certificate,
      institution: value === null ? "" : value,
    });
  };

  const onChangeHighlights = (value: string | null, i: number) => {
    let newHighlights = certificate.highlights.slice();
    if (value === null) {
      newHighlights.splice(i, 1);
    } else {
      newHighlights[i] = value;
    }
    setCertificate({
      ...certificate,
      highlights: newHighlights,
    });
  };

  const addHighlight = (index: number) => {
    const newHighlight = "Musterinhalt";
    let newHighlights = [...certificate.highlights];
    newHighlights.splice(index, 0, newHighlight);
    setCertificate({
      ...certificate,
      highlights: newHighlights,
    });
  };

  return (
    <div
      style={style.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={style.header}>
        <div style={style.titleGroup}>
          <div style={style.name}>
            <EditableSpan
              value={certificate.name}
              multiline={true}
              placeholder={""}
              onChange={onChangeName}
            />
            {isHovered && (
              <button
                onClick={() => addCertificate(RelativePosition.Before)}
                className={`btn btn-outline-dark ${NO_PRINT}`}
                style={hoverButtonStyle}
              >
                +
              </button>
            )}
          </div>
          <div>
            {certificate.institution.trim() !== "" && (
              <div style={style.institution}>
                <EditableSpan
                  value={certificate.institution}
                  placeholder={""}
                  onChange={onChangeInstitution}
                />
              </div>
            )}
          </div>
        </div>
        <div style={style.date}>
          <EditableResumeDateRange
            startDate={certificate.startDate}
            endDate={certificate.endDate}
            onChangeStartDate={(date) => {
              setCertificate({
                ...certificate,
                startDate: date,
              });
            }}
            onChangeEndDate={(date) => {
              setCertificate({
                ...certificate,
                endDate: date,
              });
            }}
          />
        </div>
      </div>
      {certificate.highlights.length !== 0 && (
        <ul style={style.highlights}>
          {certificate.highlights
            .filter((highlight) => highlight.trim() !== "")
            .map((highlight, i) => (
              <li key={i}>
                <EditableSpan
                  value={highlight}
                  multiline={true}
                  placeholder={""}
                  onChange={(value) => {
                    onChangeHighlights(value, i);
                  }}
                  onEnter={() => addHighlight(i + 1)}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

function WorkSection({
  work,
  callbacks,
}: {
  work: Work[];
  callbacks: WorkCallbacks;
}): JSX.Element | null {
  if (
    work.filter(
      (elem) => elem.name.trim() !== "" && elem.position.trim() !== "",
    ).length === 0
  ) {
    return null;
  }

  return (
    <>
      {work.map((workItem, i) => (
        <div key={i}>
          {i === 0 && (
            <h2 style={dualColumnStyles.sectionHeader}>Berufserfahrung</h2>
          )}
          <WorkElement
            work={workItem}
            setWorkPosition={(work) => callbacks.setEntry(work, i)}
            addWorkPosition={(relativePosition) =>
              callbacks.addEntry(relativePosition, i)
            }
          />
        </div>
      ))}
    </>
  );
}

function EducationSection({
  education,
  callbacks,
}: {
  education: Education[];
  callbacks: EducationCallbacks;
}): JSX.Element | null {
  return (
    <>
      {education.map((edu, i) => (
        <div key={i}>
          {i === 0 && (
            <h2 style={dualColumnStyles.sectionHeader}>Ausbildung</h2>
          )}
          <EducationElement
            education={edu}
            setEducation={(education) => callbacks.setEntry(education, i)}
            addEducation={(relativePosition) =>
              callbacks.addEntry(relativePosition, i)
            }
          />
        </div>
      ))}
    </>
  );
}

function VolunteerSection({
  volunteer,
  callbacks,
}: {
  volunteer: Volunteer[];
  callbacks: VolunteerCallbacks;
}): JSX.Element | null {
  if (
    volunteer.filter(
      (vol) => vol.organization.trim() !== "" || vol.position.trim() !== "",
    ).length === 0
  ) {
    return null;
  }

  return (
    <>
      {volunteer.map((vol, i) => (
        <div key={i}>
          {i === 0 && <h2 style={dualColumnStyles.sectionHeader}>Ehrenamt</h2>}
          <VolunteerElement
            volunteer={vol}
            setVolunteer={(volunteer) => callbacks.setEntry(volunteer, i)}
            addVolunteer={(relativePosition) =>
              callbacks.addEntry(relativePosition, i)
            }
          />
        </div>
      ))}
    </>
  );
}

function CertificateSection({
  certificates,
  callbacks,
}: {
  certificates: Certificate[];
  callbacks: CertificatesCallbacks;
}): JSX.Element | null {
  if (
    certificates.filter(
      (cert) => cert.name.trim() !== "" || cert.institution.trim() !== "",
    ).length === 0
  ) {
    return null;
  }

  return (
    <>
      {certificates.map((cert, i) => (
        <div key={i}>
          {i === 0 && (
            <h2 style={dualColumnStyles.sectionHeader}>Weiterbildungen</h2>
          )}
          <CertificateElement
            certificate={cert}
            setCertificate={(certificate) => callbacks.setEntry(certificate, i)}
            addCertificate={(relativePosition) =>
              callbacks.addEntry(relativePosition, i)
            }
          />
        </div>
      ))}
    </>
  );
}

function NameHeading({
  basics,
  callbacks,
}: {
  basics: Basics;
  callbacks: BasicsCallbacks;
}): JSX.Element {
  const { familyName, givenName, label } = basics;
  const style = dualColumnStyles.nameHeading;

  return (
    <div style={style.container}>
      <div style={style.name}>
        <AdjustableFontSizeContainer
          maxFontSize={styleConstants.fontSize.XXXXLargePx}
        >
          <div style={style.firstName}>
            <EditableSpan
              value={givenName}
              placeholder=""
              onChange={callbacks.setGivenName}
            />
          </div>
          <div style={style.lastName}>
            <EditableSpan
              value={familyName}
              placeholder=""
              onChange={callbacks.setFamilyName}
            />
          </div>
        </AdjustableFontSizeContainer>
      </div>
      {label && (
        <div style={style.caption}>
          <EditableSpan
            value={label}
            placeholder={""}
            onChange={callbacks.setLabel}
          />
        </div>
      )}
    </div>
  );
}

// export type JsonResumeCallbacks = {
//   setLanguage: (value: string | null) => void;
//   basics: BasicsCallbacks;
//   work: WorkCallbacks;
//   volunteer: VolunteerCallbacks;
//   education: EducationCallbacks;
//   skills: SkillsCallbacks;
//   certificates: CertificatesCallbacks;
//   personalInfo: PersonalInfoCallbacks;
// };
type DualColumnResumeProps = {
  jsonResume: JsonResume;
  jsonResumeCallbacks: JsonResumeCallbacks;
  revisionId: string | null;
  pushApplicationParameters:
    | null
    | ((update: (old: ApplicationParameters) => ApplicationParameters) => void);
};

export function DualColumnResume({
  jsonResume,
  jsonResumeCallbacks,
  revisionId,
  pushApplicationParameters,
}: DualColumnResumeProps) {
  const styles = dualColumnStyles;

  return (
    <>
      <div style={styles.resume}>
        <DualColumnTitlePage
          jsonResume={jsonResume}
          jsonResumeCallbacks={jsonResumeCallbacks}
          revisionId={revisionId}
          pushApplicationParameters={pushApplicationParameters}
        />
      </div>

      <div style={styles.resume}>
        <div style={styles.sidebar}>
          {revisionId && (
            <Headshot
              revisionId={revisionId}
              style={styles.portrait}
              pushApplicationParameters={pushApplicationParameters}
            />
          )}

          <div className={MULTI_PAGE} style={styles.sidebarInner}>
            <div style={{ height: "15mm" }} />
            <ContactsElement
              basics={jsonResume.basics}
              callbacks={jsonResumeCallbacks.basics}
            />
            <PersonalInfoElement
              personalInfo={jsonResume.personalInfo}
              callbacks={jsonResumeCallbacks.personalInfo}
            />
            <SkillsSection
              skills={jsonResume.skills}
              callbacks={jsonResumeCallbacks.skills}
            />
          </div>
        </div>

        <div style={styles.content}>
          <div className={MULTI_PAGE} style={styles.contentInner}>
            <NameHeading
              basics={jsonResume.basics}
              callbacks={jsonResumeCallbacks.basics}
            />
            <WorkSection
              work={jsonResume.work}
              callbacks={jsonResumeCallbacks.work}
            />
            <EducationSection
              education={jsonResume.education}
              callbacks={jsonResumeCallbacks.education}
            />
            <VolunteerSection
              volunteer={jsonResume.volunteer}
              callbacks={jsonResumeCallbacks.volunteer}
            />
            <CertificateSection
              certificates={jsonResume.certificates}
              callbacks={jsonResumeCallbacks.certificates}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function DualColumnTitlePage({
  jsonResume,
  jsonResumeCallbacks,
  revisionId,
  pushApplicationParameters,
}: {
  jsonResume: JsonResume;
  jsonResumeCallbacks: JsonResumeCallbacks;
  revisionId: string | null;
  pushApplicationParameters:
    | null
    | ((update: (old: ApplicationParameters) => ApplicationParameters) => void);
}): JSX.Element | null {
  const style = dualColumnStyles;
  if (revisionId == null) {
    return null;
  }

  const rowGapPx = styleConstants.spacing.normalLargePx;
  const numberOfRows = 3;
  const denominator = 7;
  const rowHeightFraction =
    (A4_PAGE_HEIGHT_PX - (numberOfRows - 1) * rowGapPx) / denominator;
  console.debug(rowHeightFraction);

  const gridContainerStyle: React.CSSProperties = {
    display: "grid",
    rowGap: `${rowGapPx}px`,
    backgroundColor: "white",
    gridTemplateRows: "minmax(0, 2fr) minmax(0, 3fr) minmax(0, 2fr)",
    gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr) minmax(0, 6fr)",
    height: `${A4_PAGE_HEIGHT_PX}px`,
    width: "100%",
    pageBreakAfter: "always",
    overflowY: "hidden",
  };

  const sidebarStyle: React.CSSProperties = {
    gridColumn: "1 / 3",
    gridRow: "1 / 4",
    backgroundColor: styleConstants.colors.secondary,
  };

  const nameHeadingStyle: React.CSSProperties = {
    gridColumn: "3 / 4",
    gridRow: "1",
    paddingLeft: styleConstants.spacing.extraLarge,
    paddingRight: styleConstants.spacing.extraLarge,
    marginTop: PAGE_CONTAINER_MARGIN_TOP,
  };

  const headshotStyle: React.CSSProperties = {
    gridColumn: "2 / 4",
    gridRow: "2",
    height: "100%",
    maxWidth: "100%",
  };

  const applicationTitleStyle: React.CSSProperties = {
    gridColumn: "3 / 4",
    gridRow: "3",
    paddingLeft: styleConstants.spacing.extraLarge,
    paddingRight: styleConstants.spacing.extraLarge,
    marginBottom: PAGE_CONTAINER_MARGIN_BOTTOM,
  };

  const contactsStyle: React.CSSProperties = {
    gridColumn: "1 / 3",
    gridRow: "3",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingLeft: style.sidebarInner.paddingLeft,
    paddingRight: style.sidebarInner.paddingRight,
    marginBottom: PAGE_CONTAINER_MARGIN_BOTTOM,
  };

  return (
    <div style={gridContainerStyle}>
      <div style={sidebarStyle}></div>
      <div style={nameHeadingStyle}>
        <NameHeading
          basics={jsonResume.basics}
          callbacks={jsonResumeCallbacks.basics}
        />
      </div>
      <div style={headshotStyle}>
        <Headshot
          revisionId={revisionId}
          style={{ maxWidth: "100%", height: "100%", objectFit: "contain" }}
          pushApplicationParameters={pushApplicationParameters}
        />
      </div>
      <div style={applicationTitleStyle}>
        <ApplicationTitle revisionId={revisionId} />
      </div>
      <div style={contactsStyle}>
        <ContactsElement
          basics={jsonResume.basics}
          callbacks={jsonResumeCallbacks.basics}
        />
      </div>
    </div>
  );
}

function ApplicationTitle({ revisionId }: { revisionId: string }): JSX.Element {
  const fullTitle = useApplicationTitle(revisionId);

  const [heading, ...subheadingParts] = fullTitle.split(" ");
  const subheading = subheadingParts.join(" ");

  const headingStyle: React.CSSProperties = {
    fontSize: styleConstants.fontSize.XXXXLargePx,
    letterSpacing: styleConstants.letterSpacing.superWide,
    fontWeight: styleConstants.fontWeight.normal,
    textTransform: "uppercase",
    wordBreak: "break-word",
  };

  const subheadingStyle: React.CSSProperties = {
    fontSize: `${styleConstants.fontSize.XXLarge}`,
  };

  return (
    <div>
      <div style={headingStyle}>{heading}</div>
      {subheading && <div style={subheadingStyle}>{subheading}</div>}
    </div>
  );
}
