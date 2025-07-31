import React, { Fragment, useState } from "react";
import { ApplicationParameters } from "../../backend/cover-letter/bindings/ApplicationParameters";
import { Basics } from "../../backend/cover-letter/bindings/Basics";
import { PersonalInfo } from "../../backend/cover-letter/bindings/PersonalInfo";
import { Education } from "../../backend/cover-letter/bindings/Education";
import { JsonResume } from "../../backend/cover-letter/bindings/JsonResume";
import { Skills } from "../../backend/cover-letter/bindings/Skills";
import { Skill } from "../../backend/cover-letter/bindings/Skill";
import { Work } from "../../backend/cover-letter/bindings/Work";
import { Volunteer } from "../../backend/cover-letter/bindings/Volunteer";
import { Certificate } from "../../backend/cover-letter/bindings/Certificate";
import { EditableResumeDateRange } from "./editable-resume-date";
import { EditableResumeDate } from "./editable-resume-date";
import { EditableSpan, EditableEmail } from "./editable";
import { AdjustableFontSizeContainer } from "./adjustable-font-size";
import {
  PAGE_CONTAINER_MARGIN_TOP,
  PAGE_CONTAINER_MARGIN_BOTTOM,
} from "./styles";
import { HIDE_AT_PAGE_BREAK } from "./styles";
import { NO_PRINT, MULTI_PAGE } from "./styles";
import { BasicsCallbacks } from "./useJsonResume";
import { PersonalInfoCallbacks } from "./useJsonResume";
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
    extraSmall: "4px",
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
  name: React.CSSProperties;
  firstName: React.CSSProperties;
  lastName: React.CSSProperties;
};

type ContactsSectionStyle = {
  container: React.CSSProperties;
  contactItem: React.CSSProperties;
  contactItemKey: React.CSSProperties;
  contactItemValue: React.CSSProperties;
  headshotContainer: React.CSSProperties;
};

type WorkElementStyle = {
  container: React.CSSProperties;
  date: React.CSSProperties;
  content: React.CSSProperties;
  header: React.CSSProperties;
  title: React.CSSProperties;
  highlights: React.CSSProperties;
};
type EducationElementStyle = {
  container: React.CSSProperties;
  date: React.CSSProperties;
  content: React.CSSProperties;
  header: React.CSSProperties;
  title: React.CSSProperties;
  highlights: React.CSSProperties;
};
type CertificateElementStyle = {
  container: React.CSSProperties;
  date: React.CSSProperties;
  content: React.CSSProperties;
  header: React.CSSProperties;
  title: React.CSSProperties;
  highlights: React.CSSProperties;
};

type VolunteerElementStyle = {
  container: React.CSSProperties;
  date: React.CSSProperties;
  content: React.CSSProperties;
  header: React.CSSProperties;
  title: React.CSSProperties;
  highlights: React.CSSProperties;
};

type SkillsSectionStyle = {
  container: React.CSSProperties;
  contentContainer: React.CSSProperties;
  title: React.CSSProperties;
};

type GermanStyles = {
  resume: React.CSSProperties;
  contentInner: React.CSSProperties;
  sectionHeader: React.CSSProperties;
  nameHeading: NameHeadingStyle;
  contactsSection: ContactsSectionStyle;
  workElement: WorkElementStyle;
  educationElement: EducationElementStyle;
  certificateElement: CertificateElementStyle;
  volunteerElement: VolunteerElementStyle;
  skillsSection: SkillsSectionStyle;
};

const dualColumnStyles: GermanStyles = {
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
    fontSize: styleConstants.fontSize.XLarge,
    marginBottom: styleConstants.spacing.normal,
  },
  nameHeading: {
    container: {
      marginBottom: styleConstants.spacing.normal,
    },
    name: {
      fontSize: styleConstants.fontSize.XXXLargePx,
      fontWeight: styleConstants.fontWeight.normal,
      marginBottom: styleConstants.spacing.normal,
    },
    firstName: {
      display: "inline",
    },
    lastName: {
      display: "inline",
    },
  },
  contactsSection: {
    container: {
      marginBottom: styleConstants.spacing.large,
    },
    headshotContainer: {
      width: "25%",
      marginLeft: "auto",
    },
    contactItem: {
      display: "flex",
      width: "100%",
      marginBottom: styleConstants.spacing.small,
    },
    contactItemKey: {
      width: "33.33333%",
      textAlign: "left",
      paddingRight: styleConstants.spacing.normal,
    },
    contactItemValue: {
      width: "66.66667%",
      textAlign: "left",
    },
  },
  workElement: {
    container: {
      display: "flex",
      marginBottom: styleConstants.spacing.normal,
      pageBreakInside: "avoid",
      alignItems: "flex-start",
    },
    date: {
      flex: "0 0 20%",
      paddingRight: styleConstants.spacing.normal,
      textAlign: "left",
      alignSelf: "flex-start",
    },
    content: {
      flex: "1 1 80%",
      lineHeight: styleConstants.lineHeight,
    },
    header: {
      marginBottom: styleConstants.spacing.extraSmall,
    },
    title: {
      fontSize: styleConstants.fontSize.normal,
      fontWeight: styleConstants.fontWeight.bold,
    },
    highlights: {
      margin: 0,
      paddingLeft: "1.5em",
    },
  },
  educationElement: {
    container: {
      display: "flex",
      marginBottom: styleConstants.spacing.normal,
      pageBreakInside: "avoid",
      alignItems: "flex-start",
    },
    date: {
      flex: "0 0 20%",
      paddingRight: styleConstants.spacing.normal,
      textAlign: "left",
      alignSelf: "flex-start",
    },
    content: {
      flex: "1 1 80%",
      lineHeight: styleConstants.lineHeight,
    },
    header: {
      marginBottom: styleConstants.spacing.extraSmall,
    },
    title: {
      fontSize: styleConstants.fontSize.normal,
      fontWeight: styleConstants.fontWeight.bold,
    },
    highlights: {
      margin: 0,
      paddingLeft: "1.5em",
    },
  },
  certificateElement: {
    container: {
      display: "flex",
      marginBottom: styleConstants.spacing.normal,
      pageBreakInside: "avoid",
      alignItems: "flex-start",
    },
    date: {
      flex: "0 0 20%",
      paddingRight: styleConstants.spacing.normal,
      textAlign: "left",
      alignSelf: "flex-start",
    },
    content: {
      flex: "1 1 80%",
      lineHeight: styleConstants.lineHeight,
    },
    header: {
      marginBottom: styleConstants.spacing.extraSmall,
    },
    title: {
      fontSize: styleConstants.fontSize.normal,
      fontWeight: styleConstants.fontWeight.bold,
    },
    highlights: {
      margin: 0,
      paddingLeft: "1.5em",
    },
  },
  volunteerElement: {
    container: {
      display: "flex",
      marginBottom: styleConstants.spacing.normal,
      pageBreakInside: "avoid",
      alignItems: "flex-start",
    },
    date: {
      flex: "0 0 20%",
      paddingRight: styleConstants.spacing.normal,
      textAlign: "left",
      alignSelf: "flex-start",
    },
    content: {
      flex: "1 1 80%",
      lineHeight: styleConstants.lineHeight,
    },
    header: {
      marginBottom: styleConstants.spacing.extraSmall,
    },
    title: {
      fontSize: styleConstants.fontSize.normal,
      fontWeight: styleConstants.fontWeight.bold,
    },
    highlights: {
      margin: 0,
      paddingLeft: "1.5em",
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
      fontSize: styleConstants.fontSize.normal,
      fontWeight: styleConstants.fontWeight.bold,
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

function ContactsSection({
  basics,
  personalInfo,
  basicsCallbacks,
  personalInfoCallbacks,
  revisionId,
  pushApplicationParameters,
}: {
  basics: Basics;
  personalInfo: PersonalInfo;
  basicsCallbacks: BasicsCallbacks;
  personalInfoCallbacks: PersonalInfoCallbacks;
  revisionId: string | null;
  pushApplicationParameters:
    | null
    | ((update: (old: ApplicationParameters) => ApplicationParameters) => void);
}): JSX.Element | null {
  const style = dualColumnStyles.contactsSection;
  const nameStyle = dualColumnStyles.nameHeading;

  const addressElements = [];
  if (basics.location.streetAddress) {
    addressElements.push(basics.location.streetAddress);
  }
  if (basics.location.postalCode || basics.location.city) {
    const cityPart = `${basics.location.postalCode || ""} ${
      basics.location.city || ""
    }`.trim();
    if (cityPart) {
      addressElements.push(cityPart);
    }
  }
  const fullAddress = addressElements.join(", ");

  const birthElements = [];
  if (personalInfo.birthDate) {
    birthElements.push(personalInfo.birthDate);
  }
  if (personalInfo.birthPlace) {
    birthElements.push(personalInfo.birthPlace);
  }
  const birthInfo = birthElements.join(", ");

  return (
    <div style={style.container}>
      <div style={{ display: "flex", gap: styleConstants.spacing.normal }}>
        <div style={{ flex: "0 0 66.66667%" }}>
          <div style={nameStyle.container}>
            <AdjustableFontSizeContainer
              maxFontSize={styleConstants.fontSize.XXXXLargePx}
            >
              <div style={nameStyle.name}>
                <div style={nameStyle.firstName}>
                  <EditableSpan
                    value={basics.givenName + " "}
                    placeholder=""
                    onChange={basicsCallbacks.setGivenName}
                  />
                </div>
                <div style={nameStyle.lastName}>
                  <EditableSpan
                    value={basics.familyName}
                    placeholder=""
                    onChange={basicsCallbacks.setFamilyName}
                  />
                </div>
              </div>
            </AdjustableFontSizeContainer>
          </div>

          {basics.email && (
            <div style={style.contactItem}>
              <span style={style.contactItemKey}>E-Mail:</span>
              <span style={style.contactItemValue}>
                <EditableEmail
                  value={basics.email}
                  placeholder={""}
                  onChange={basicsCallbacks.setEmail}
                />
              </span>
            </div>
          )}
          {basics.phone && (
            <div style={style.contactItem}>
              <span style={style.contactItemKey}>Telefon:</span>
              <span style={style.contactItemValue}>
                <EditableSpan
                  value={basics.phone}
                  placeholder={""}
                  onChange={basicsCallbacks.setPhone}
                />
              </span>
            </div>
          )}
          {fullAddress && (
            <div style={style.contactItem}>
              <span style={style.contactItemKey}>Adresse:</span>
              <span style={style.contactItemValue}>
                {basics.location.streetAddress && (
                  <EditableSpan
                    value={basics.location.streetAddress}
                    placeholder={""}
                    onChange={basicsCallbacks.setStreetAddress}
                  />
                )}
                {basics.location.streetAddress &&
                  (basics.location.postalCode || basics.location.city) &&
                  ", "}
                {basics.location.postalCode && (
                  <EditableSpan
                    value={basics.location.postalCode}
                    placeholder={""}
                    onChange={basicsCallbacks.setPostalCode}
                  />
                )}
                {basics.location.postalCode && basics.location.city && " "}
                {basics.location.city && (
                  <EditableSpan
                    value={basics.location.city}
                    placeholder={""}
                    onChange={basicsCallbacks.setCity}
                  />
                )}
              </span>
            </div>
          )}
          {birthInfo && (
            <div style={style.contactItem}>
              <span style={style.contactItemKey}>Geboren:</span>
              <span style={style.contactItemValue}>
                <EditableResumeDate
                  value={personalInfo.birthDate}
                  onChange={personalInfoCallbacks.setBirthDate}
                />
                {personalInfo.birthDate && personalInfo.birthPlace && ", "}
                <EditableSpan
                  value={personalInfo.birthPlace}
                  placeholder={""}
                  onChange={personalInfoCallbacks.setBirthPlace}
                />
              </span>
            </div>
          )}
          {personalInfo.nationality && (
            <div style={style.contactItem}>
              <span style={style.contactItemKey}>Staatsangehörigkeit:</span>
              <span style={style.contactItemValue}>
                <EditableSpan
                  value={personalInfo.nationality}
                  placeholder={""}
                  onChange={personalInfoCallbacks.setNationality}
                />
              </span>
            </div>
          )}
          {personalInfo.maritalStatus && (
            <div style={style.contactItem}>
              <span style={style.contactItemKey}>Familienstand:</span>
              <span style={style.contactItemValue}>
                <EditableSpan
                  value={personalInfo.maritalStatus}
                  placeholder={""}
                  onChange={personalInfoCallbacks.setMaritalStatus}
                />
              </span>
            </div>
          )}
          {personalInfo.children && (
            <div style={style.contactItem}>
              <span style={style.contactItemKey}>Kinder:</span>
              <span style={style.contactItemValue}>
                <EditableSpan
                  value={personalInfo.children}
                  placeholder={""}
                  onChange={personalInfoCallbacks.setChildren}
                />
              </span>
            </div>
          )}
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
    </div>
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
  const style = dualColumnStyles.workElement;

  return (
    <div
      style={style.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
      <div style={style.content}>
        <div style={style.header}>
          <div style={style.title}>
            <EditableSpan
              value={`${work.name} ${work.location ? ", " + work.location : ""}`}
              placeholder=""
              onChange={(value) => {
                if (value === null) {
                  setWorkPosition({
                    ...work,
                    name: "",
                    location: "",
                  });
                  return;
                }
                const parts = value.split(", ");
                setWorkPosition({
                  ...work,
                  name: parts[0] || "",
                  location: parts[1] || "",
                });
              }}
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
            <EditableSpan
              value={work.position}
              multiline={true}
              placeholder=""
              onChange={(value) =>
                setWorkPosition({
                  ...work,
                  position: value === null ? "" : value,
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
                    placeholder=""
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
      <SectionSeparator />
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
      <SectionSeparator />
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
      <SectionSeparator />
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

  return (
    <div
      style={style.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
      <div style={style.content}>
        <div style={style.header}>
          <div style={style.title}>
            <EditableSpan
              value={`${education.institution}`}
              placeholder=""
              onChange={(value) => {
                setEducation({
                  ...education,
                  institution: value === null ? "" : value,
                });
              }}
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
          <div>
            <EditableSpan
              value={education.degree}
              placeholder=""
              onChange={(value) =>
                setEducation({
                  ...education,
                  degree: value === null ? "" : value,
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
              placeholder=""
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
  const style = dualColumnStyles.volunteerElement;

  return (
    <div
      style={style.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
      <div style={style.content}>
        <div style={style.header}>
          <div style={style.title}>
            <EditableSpan
              value={volunteer.organization}
              placeholder=""
              onChange={(value) =>
                setVolunteer({
                  ...volunteer,
                  organization: value === null ? "" : value,
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
          <div>
            <EditableSpan
              value={volunteer.position}
              multiline={true}
              placeholder=""
              onChange={(value) =>
                setVolunteer({
                  ...volunteer,
                  position: value === null ? "" : value,
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
                    placeholder=""
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

  return (
    <div
      style={style.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
      <div style={style.content}>
        <div style={style.header}>
          <div style={style.title}>
            <EditableSpan
              value={certificate.institution}
              placeholder=""
              onChange={(value) =>
                setCertificate({
                  ...certificate,
                  institution: value === null ? "" : value,
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
          <div>
            <EditableSpan
              value={certificate.name}
              multiline={true}
              placeholder=""
              onChange={(value) =>
                setCertificate({
                  ...certificate,
                  name: value === null ? "" : value,
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
                    placeholder=""
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
  const style = dualColumnStyles.skillsSection;
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
              placeholder=""
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
                  placeholder=""
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
  const style = dualColumnStyles.skillsSection;
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
              placeholder=""
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
                  placeholder=""
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
  const style = dualColumnStyles.skillsSection;
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
          placeholder=""
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
  const style = dualColumnStyles.skillsSection;
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
              placeholder=""
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
  const style = dualColumnStyles.skillsSection;
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
              placeholder=""
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
      <div style={dualColumnStyles.skillsSection.container}>
        <h2 style={dualColumnStyles.sectionHeader}>Kenntnisse</h2>
        <div style={dualColumnStyles.skillsSection.contentContainer}>
          {elements}
        </div>
      </div>
    </>
  );
}

type GermanResumeProps = {
  jsonResume: JsonResume;
  jsonResumeCallbacks: JsonResumeCallbacks;
  revisionId: string | null;
  pushApplicationParameters:
    | null
    | ((update: (old: ApplicationParameters) => ApplicationParameters) => void);
};

export function GermanResume({
  jsonResume,
  jsonResumeCallbacks,
  revisionId,
  pushApplicationParameters,
}: GermanResumeProps): JSX.Element {
  return (
    <div style={dualColumnStyles.resume}>
      <div className={MULTI_PAGE} style={dualColumnStyles.contentInner}>
        <ContactsSection
          basics={jsonResume.basics}
          personalInfo={jsonResume.personalInfo}
          basicsCallbacks={jsonResumeCallbacks.basics}
          personalInfoCallbacks={jsonResumeCallbacks.personalInfo}
          revisionId={revisionId}
          pushApplicationParameters={pushApplicationParameters}
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
