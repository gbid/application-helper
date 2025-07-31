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
import { EditableResumeDateRange } from "./editable-resume-date";
import { EditableSpan, EditableEmail } from "./editable";
import { AdjustableFontSizeContainer } from "./adjustable-font-size";
import {
  PAGE_CONTAINER_MARGIN_TOP,
  PAGE_CONTAINER_MARGIN_BOTTOM,
} from "./styles";
import { HIDE_AT_PAGE_BREAK } from "./styles";
import { NO_PRINT, MULTI_PAGE } from "./styles";
import { BasicsCallbacks } from "./useJsonResume";
import { SkillsCallbacks } from "./useJsonResume";
import { WorkCallbacks } from "./useJsonResume";
import { EducationCallbacks } from "./useJsonResume";
import { VolunteerCallbacks } from "./useJsonResume";
import { CertificatesCallbacks } from "./useJsonResume";
import { JsonResumeCallbacks } from "./useJsonResume";
import { Headshot } from "./headshot";

enum RelativePosition {
  Before = "before",
  After = "after",
}

export const styleConstants = {
  fontSize: {
    small: "10px",
    normal: "12px",
    large: "14px",
    XLarge: "18px",
    XXLarge: "24px",
    XXXLargePx: 36,
    XXXXLargePx: 48,
  },
  spacing: {
    small: "8px",
    normal: "16px",
    normalLarge: "24px",
    large: "32px",
    extraLarge: "48px",
  },
  fontWeight: {
    normal: 400,
    bold: 500,
  },
  letterSpacing: {
    normal: "0.66666px",
    wide: "3px",
    extraWide: "4px",
    superWide: "8px",
  },
  lineHeight: 1.666666,
  colors: {
    primary: "#000",
  },
};

type NameHeadingStyle = {
  container: React.CSSProperties;
  mainContent: React.CSSProperties;
  headshotContainer: React.CSSProperties;
  name: React.CSSProperties;
  firstName: React.CSSProperties;
  lastName: React.CSSProperties;
  caption: React.CSSProperties;
  summary: React.CSSProperties;
};

type ContactsElementStyle = {
  container: React.CSSProperties;
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

type VolunteerElementStyle = {
  container: React.CSSProperties;
  header: React.CSSProperties;
  titleGroup: React.CSSProperties;
  position: React.CSSProperties;
  organization: React.CSSProperties;
  date: React.CSSProperties;
  highlights: React.CSSProperties;
};

type SkillsSectionStyle = {
  container: React.CSSProperties;
  contentContainer: React.CSSProperties;
  title: React.CSSProperties;
};

type SingleColumnStyles = {
  resume: React.CSSProperties;
  contentInner: React.CSSProperties;
  sectionHeader: React.CSSProperties;
  nameHeading: NameHeadingStyle;
  contactsElement: ContactsElementStyle;
  workElement: WorkElementStyle;
  educationElement: EducationElementStyle;
  certificateElement: CertificateElementStyle;
  volunteerElement: VolunteerElementStyle;
  skillsSection: SkillsSectionStyle;
};

const singleColumnStyles: SingleColumnStyles = {
  resume: {
    letterSpacing: styleConstants.letterSpacing.normal,
    margin: 0,
    padding: 0,
    width: "100%",
    fontFamily: '"Montserrat", sans-serif',
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    fontSmooth: "antialiased",
    fontSize: styleConstants.fontSize.normal,
    overflowWrap: "break-word",
  },
  contentInner: {
    paddingLeft: styleConstants.spacing.extraLarge,
    paddingRight: styleConstants.spacing.extraLarge,
    marginTop: PAGE_CONTAINER_MARGIN_TOP,
    marginBottom: PAGE_CONTAINER_MARGIN_BOTTOM,
  },
  sectionHeader: {
    fontSize: styleConstants.fontSize.large,
    textTransform: "uppercase",
    letterSpacing: styleConstants.letterSpacing.extraWide,
    marginBottom: styleConstants.spacing.normal,
  },
  nameHeading: {
    container: {
      display: "flex",
      flexDirection: "row",
      gap: styleConstants.spacing.normal,
      width: "100%",
    },
    mainContent: {
      minWidth: `calc(75% - ${styleConstants.spacing.normal})`,
    },
    headshotContainer: {
      minWidth: "25%",
    },
    name: {
      letterSpacing: styleConstants.letterSpacing.superWide,
      fontWeight: styleConstants.fontWeight.normal,
      textTransform: "uppercase",
      width: "100%",
      whiteSpace: "nowrap",
    },
    firstName: {
      display: "block",
    },
    lastName: {
      display: "block",
    },
    caption: {
      fontSize: styleConstants.fontSize.large,
      textTransform: "uppercase",
      letterSpacing: styleConstants.letterSpacing.extraWide,
      fontWeight: styleConstants.fontWeight.bold,
    },
    summary: {
      marginTop: styleConstants.spacing.normal,
      lineHeight: styleConstants.lineHeight,
    },
  },
  contactsElement: {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: styleConstants.spacing.normal,
      marginTop: `-${styleConstants.spacing.normal}`,
      marginBottom: `-${styleConstants.spacing.normal}`,
    },
  },
  workElement: {
    container: {
      pageBreakInside: "avoid",
      lineHeight: styleConstants.lineHeight,
      marginBottom: styleConstants.spacing.normal,
    },
    header: {
      position: "relative",
      paddingRight: "150px",
      marginBottom: styleConstants.spacing.small,
    },
    titleGroup: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "baseline",
    },
    position: {
      fontSize: styleConstants.fontSize.large,
      fontWeight: styleConstants.fontWeight.bold,
      marginRight: "0.5em",
    },
    company: {
      display: "inline",
    },
    location: {
      display: "inline",
    },
    date: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "140px",
      textAlign: "right",
    },
    highlights: {
      margin: 0,
    },
  },
  educationElement: {
    container: {
      pageBreakInside: "avoid",
      lineHeight: styleConstants.lineHeight,
      marginBottom: styleConstants.spacing.normal,
    },
    header: {
      position: "relative",
      paddingRight: "150px",
      marginBottom: styleConstants.spacing.small,
    },
    titleGroup: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "baseline",
    },
    degree: {
      fontSize: styleConstants.fontSize.large,
      fontWeight: styleConstants.fontWeight.bold,
      marginRight: "0.5em",
    },
    institution: {
      display: "inline",
    },
    date: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "140px",
      textAlign: "right",
    },
  },
  certificateElement: {
    container: {
      pageBreakInside: "avoid",
      lineHeight: styleConstants.lineHeight,
      marginBottom: styleConstants.spacing.normal,
    },
    header: {
      position: "relative",
      paddingRight: "150px",
      marginBottom: styleConstants.spacing.small,
    },
    titleGroup: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "baseline",
    },
    name: {
      fontSize: styleConstants.fontSize.large,
      fontWeight: styleConstants.fontWeight.bold,
      marginRight: "0.5em",
    },
    institution: {
      display: "inline",
    },
    date: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "140px",
      textAlign: "right",
    },
    highlights: {
      margin: 0,
    },
  },
  volunteerElement: {
    container: {
      pageBreakInside: "avoid",
      lineHeight: styleConstants.lineHeight,
      marginBottom: styleConstants.spacing.normal,
    },
    header: {
      position: "relative",
      paddingRight: "150px",
      marginBottom: styleConstants.spacing.small,
    },
    titleGroup: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "baseline",
    },
    position: {
      fontSize: styleConstants.fontSize.large,
      fontWeight: styleConstants.fontWeight.bold,
      marginRight: "0.5em",
    },
    organization: {
      display: "inline",
    },
    date: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "140px",
      textAlign: "right",
    },
    highlights: {
      margin: 0,
    },
  },
  skillsSection: {
    container: {
      marginBottom: styleConstants.spacing.large,
    },
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      gap: styleConstants.spacing.normal,
    },
    title: {
      fontSize: styleConstants.fontSize.large,
      marginBottom: styleConstants.spacing.small,
    },
  },
};

const hoverButtonStyle: React.CSSProperties = {
  position: "absolute",
  right: "0",
  bottom: "0",
  zIndex: 10,
};

const separatorStyle: React.CSSProperties = {
  marginTop: styleConstants.spacing.normalLarge,
  marginBottom: styleConstants.spacing.normalLarge,
};

function SectionSeparator(): JSX.Element {
  return <hr style={separatorStyle} className={HIDE_AT_PAGE_BREAK} />;
}

type NameHeadingProps = {
  basics: Basics;
  callbacks: BasicsCallbacks;
  revisionId: string | null;
  pushApplicationParameters:
    | null
    | ((update: (old: ApplicationParameters) => ApplicationParameters) => void);
};

function SummaryElement({
  summary,
  setSummary,
}: {
  summary: string;
  setSummary: (summary: string | null) => void;
}): JSX.Element {
  const style = singleColumnStyles.nameHeading;
  return (
    <div style={style.summary}>
      <EditableSpan
        value={summary}
        placeholder=""
        multiline={true}
        onChange={setSummary}
      />
    </div>
  );
}

function NameHeading({
  basics,
  callbacks,
  revisionId,
  pushApplicationParameters,
}: NameHeadingProps): JSX.Element {
  const { familyName, givenName, summary } = basics;
  const style = singleColumnStyles.nameHeading;

  return (
    <div style={style.container}>
      <div style={style.mainContent}>
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
        <SummaryElement summary={summary} setSummary={callbacks.setSummary} />
      </div>
      {revisionId && (
        <div style={style.headshotContainer}>
          <Headshot
            revisionId={revisionId}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: "4px",
            }}
            pushApplicationParameters={pushApplicationParameters}
          />
        </div>
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
  const style = singleColumnStyles.contactsElement;

  const elements: JSX.Element[] = [];

  if (basics.email) {
    elements.push(
      <EditableEmail
        key="email"
        value={basics.email}
        placeholder={""}
        onChange={callbacks.setEmail}
      />,
    );
  }

  if (basics.phone) {
    elements.push(
      <EditableSpan
        key="phone"
        value={basics.phone}
        placeholder={""}
        onChange={callbacks.setPhone}
      />,
    );
  }

  if (basics.location.city) {
    const locationParts = [];

    if (basics.location.streetAddress) {
      locationParts.push(
        <EditableSpan
          key="street"
          value={basics.location.streetAddress}
          placeholder={""}
          onChange={callbacks.setStreetAddress}
        />,
      );
      locationParts.push(", ");
    }

    if (basics.location.postalCode) {
      locationParts.push(
        <EditableSpan
          key="postal"
          value={basics.location.postalCode}
          placeholder={""}
          onChange={callbacks.setPostalCode}
        />,
      );
      locationParts.push(" ");
    }

    locationParts.push(
      <EditableSpan
        key="city"
        value={basics.location.city}
        placeholder={""}
        onChange={callbacks.setCity}
      />,
    );

    elements.push(<span key="location">{locationParts}</span>);
  }

  if (elements.length === 0) {
    return null;
  }

  return (
    <>
      <SectionSeparator />
      <div style={style.container}>
        {elements.map((element, index) => (
          <Fragment key={index}>
            {element}
            {index < elements.length - 1 && " | "}
          </Fragment>
        ))}
      </div>
    </>
  );
}

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
  const style = singleColumnStyles.workElement;

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
              onChange={(value) =>
                setWorkPosition({
                  ...work,
                  position: value === null ? "" : value,
                })
              }
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
            {work.name && (
              <div style={style.company}>
                <EditableSpan
                  value={work.name}
                  placeholder={""}
                  onChange={(value) =>
                    setWorkPosition({
                      ...work,
                      name: value === null ? "" : value,
                    })
                  }
                />
              </div>
            )}
            {work.location && (
              <div style={style.location}>
                {work.name && ", "}
                <EditableSpan
                  value={work.location}
                  placeholder={""}
                  onChange={(value) =>
                    setWorkPosition({
                      ...work,
                      location: value === null ? "" : value,
                    })
                  }
                />
              </div>
            )}
          </div>
        </div>
        <div style={style.date}>
          <EditableResumeDateRange
            startDate={work.startDate}
            endDate={work.endDate}
            onChangeStartDate={(date) =>
              setWorkPosition({
                ...work,
                startDate: date,
              })
            }
            onChangeEndDate={(date) =>
              setWorkPosition({
                ...work,
                endDate: date,
              })
            }
          />
        </div>
      </div>
      {work.highlights.length > 0 && (
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
                    const newHighlights = [...work.highlights];
                    if (value === null) {
                      newHighlights.splice(i, 1);
                    } else {
                      newHighlights[i] = value;
                    }
                    setWorkPosition({
                      ...work,
                      highlights: newHighlights,
                    });
                  }}
                  onEnter={() => {
                    const newHighlights = [...work.highlights];
                    newHighlights.splice(i + 1, 0, "Mustertätigkeit");
                    setWorkPosition({
                      ...work,
                      highlights: newHighlights,
                    });
                  }}
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
      <SectionSeparator />
      {work.map((workItem, i) => (
        <div key={i}>
          {i === 0 && (
            <h2 style={singleColumnStyles.sectionHeader}>Berufserfahrung</h2>
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
      <SectionSeparator />
      {education.map((edu, i) => (
        <div key={i}>
          {i === 0 && (
            <h2 style={singleColumnStyles.sectionHeader}>Ausbildung</h2>
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
      <SectionSeparator />
      {volunteer.map((vol, i) => (
        <div key={i}>
          {i === 0 && (
            <h2 style={singleColumnStyles.sectionHeader}>Ehrenamt</h2>
          )}
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
      <SectionSeparator />
      {certificates.map((cert, i) => (
        <div key={i}>
          {i === 0 && (
            <h2 style={singleColumnStyles.sectionHeader}>Weiterbildungen</h2>
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
  const style = singleColumnStyles.educationElement;

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
              onChange={(value) =>
                setEducation({
                  ...education,
                  degree: value === null ? "" : value,
                })
              }
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
          {education.institution && (
            <div style={style.institution}>
              <EditableSpan
                value={education.institution}
                placeholder={""}
                onChange={(value) =>
                  setEducation({
                    ...education,
                    institution: value === null ? "" : value,
                  })
                }
              />
            </div>
          )}
        </div>
        <div style={style.date}>
          <EditableResumeDateRange
            startDate={education.startDate}
            endDate={education.endDate}
            onChangeStartDate={(date) =>
              setEducation({
                ...education,
                startDate: date,
              })
            }
            onChangeEndDate={(date) =>
              setEducation({
                ...education,
                endDate: date,
              })
            }
          />
        </div>
      </div>
      {education.score && (
        <div>
          Abschlussnote:{" "}
          <EditableSpan
            value={education.score}
            placeholder={""}
            onChange={(value) =>
              setEducation({
                ...education,
                score: value === null ? "" : value,
              })
            }
          />
        </div>
      )}
    </div>
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
  const style = singleColumnStyles.volunteerElement;

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
              onChange={(value) =>
                setVolunteer({
                  ...volunteer,
                  position: value === null ? "" : value,
                })
              }
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
          {volunteer.organization && (
            <div style={style.organization}>
              <EditableSpan
                value={volunteer.organization}
                placeholder={""}
                onChange={(value) =>
                  setVolunteer({
                    ...volunteer,
                    organization: value === null ? "" : value,
                  })
                }
              />
            </div>
          )}
        </div>
        <div style={style.date}>
          <EditableResumeDateRange
            startDate={volunteer.startDate}
            endDate={volunteer.endDate}
            onChangeStartDate={(date) =>
              setVolunteer({
                ...volunteer,
                startDate: date,
              })
            }
            onChangeEndDate={(date) =>
              setVolunteer({
                ...volunteer,
                endDate: date,
              })
            }
          />
        </div>
      </div>
      {volunteer.highlights.length > 0 && (
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
                    const newHighlights = [...volunteer.highlights];
                    if (value === null) {
                      newHighlights.splice(i, 1);
                    } else {
                      newHighlights[i] = value;
                    }
                    setVolunteer({
                      ...volunteer,
                      highlights: newHighlights,
                    });
                  }}
                  onEnter={() => {
                    const newHighlights = [...volunteer.highlights];
                    newHighlights.splice(i + 1, 0, "Mustertätigkeit");
                    setVolunteer({
                      ...volunteer,
                      highlights: newHighlights,
                    });
                  }}
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
  const style = singleColumnStyles.certificateElement;

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
              onChange={(value) =>
                setCertificate({
                  ...certificate,
                  name: value === null ? "" : value,
                })
              }
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
          {certificate.institution && (
            <div style={style.institution}>
              <EditableSpan
                value={certificate.institution}
                placeholder={""}
                onChange={(value) =>
                  setCertificate({
                    ...certificate,
                    institution: value === null ? "" : value,
                  })
                }
              />
            </div>
          )}
        </div>
        <div style={style.date}>
          <EditableResumeDateRange
            startDate={certificate.startDate}
            endDate={certificate.endDate}
            onChangeStartDate={(date) =>
              setCertificate({
                ...certificate,
                startDate: date,
              })
            }
            onChangeEndDate={(date) =>
              setCertificate({
                ...certificate,
                endDate: date,
              })
            }
          />
        </div>
      </div>
      {certificate.highlights.length > 0 && (
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
                    const newHighlights = [...certificate.highlights];
                    if (value === null) {
                      newHighlights.splice(i, 1);
                    } else {
                      newHighlights[i] = value;
                    }
                    setCertificate({
                      ...certificate,
                      highlights: newHighlights,
                    });
                  }}
                  onEnter={() => {
                    const newHighlights = [...certificate.highlights];
                    newHighlights.splice(i + 1, 0, "Musterinhalt");
                    setCertificate({
                      ...certificate,
                      highlights: newHighlights,
                    });
                  }}
                />
              </li>
            ))}
        </ul>
      )}
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
  const style = singleColumnStyles.skillsSection;
  return (
    <div>
      <h4 style={style.title}>Software</h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: styleConstants.spacing.small,
        }}
      >
        {software.map((item, i) => (
          <div key={i}>
            <EditableSpan
              value={item.name}
              placeholder={""}
              onChange={(value) => {
                const newItems = [...software];
                if (value === null) {
                  newItems.splice(i, 1);
                } else {
                  newItems[i] = { ...newItems[i], name: value };
                }
                setSoftware(newItems);
              }}
            />
            {item.proficiency && (
              <>
                {": "}
                <EditableSpan
                  value={item.proficiency}
                  placeholder={""}
                  onChange={(value) => {
                    const newItems = [...software];
                    newItems[i] = {
                      ...newItems[i],
                      proficiency: value === null ? "" : value,
                    };
                    setSoftware(newItems);
                  }}
                />
              </>
            )}
          </div>
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
  const style = singleColumnStyles.skillsSection;
  return (
    <div>
      <h4 style={style.title}>Sprachen</h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: styleConstants.spacing.small,
        }}
      >
        {languages.map((item, i) => (
          <div key={i}>
            <EditableSpan
              value={item.name}
              placeholder={""}
              onChange={(value) => {
                const newItems = [...languages];
                if (value === null) {
                  newItems.splice(i, 1);
                } else {
                  newItems[i] = { ...newItems[i], name: value };
                }
                setLanguages(newItems);
              }}
            />
            {item.proficiency && (
              <>
                {": "}
                <EditableSpan
                  value={item.proficiency}
                  placeholder={""}
                  onChange={(value) => {
                    const newItems = [...languages];
                    newItems[i] = {
                      ...newItems[i],
                      proficiency: value === null ? "" : value,
                    };
                    setLanguages(newItems);
                  }}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DriversLicenceElement({
  driversLicence,
  setDriversLicence,
}: {
  driversLicence: string;
  setDriversLicence: (driversLicence: string) => void;
}): JSX.Element {
  const style = singleColumnStyles.skillsSection;
  return (
    <div>
      <h4 style={style.title}>Führerschein</h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: styleConstants.spacing.small,
        }}
      >
        <EditableSpan
          value={driversLicence}
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
  const style = singleColumnStyles.skillsSection;
  return (
    <div>
      <h4 style={style.title}>Fähigkeiten</h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: styleConstants.spacing.small,
        }}
      >
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
  const style = singleColumnStyles.skillsSection;
  return (
    <div>
      <h4 style={style.title}>Interessen</h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: styleConstants.spacing.small,
        }}
      >
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
      <SectionSeparator />
      <div style={singleColumnStyles.skillsSection.container}>
        <h2 style={singleColumnStyles.sectionHeader}>Kenntnisse</h2>
        <div style={singleColumnStyles.skillsSection.contentContainer}>
          {elements}
        </div>
      </div>
    </>
  );
}

type SingleColumnResumeHeadshotProps = {
  jsonResume: JsonResume;
  jsonResumeCallbacks: JsonResumeCallbacks;
  revisionId: string | null;
  pushApplicationParameters:
    | null
    | ((update: (old: ApplicationParameters) => ApplicationParameters) => void);
};

export function SingleColumnResumeHeadshot({
  jsonResume,
  jsonResumeCallbacks,
  revisionId,
  pushApplicationParameters,
}: SingleColumnResumeHeadshotProps): JSX.Element {
  return (
    <div style={singleColumnStyles.resume}>
      <div className={MULTI_PAGE} style={singleColumnStyles.contentInner}>
        <NameHeading
          basics={jsonResume.basics}
          callbacks={jsonResumeCallbacks.basics}
          revisionId={revisionId}
          pushApplicationParameters={pushApplicationParameters}
        />
        <ContactsElement
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
        <CertificateSection
          certificates={jsonResume.certificates}
          callbacks={jsonResumeCallbacks.certificates}
        />
        <SkillsSection
          skills={jsonResume.skills}
          callbacks={jsonResumeCallbacks.skills}
        />
        <VolunteerSection
          volunteer={jsonResume.volunteer}
          callbacks={jsonResumeCallbacks.volunteer}
        />
      </div>
    </div>
  );
}
