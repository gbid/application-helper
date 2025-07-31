import React from "react";
import { Fragment } from "react";
import {
  PAGE_CONTAINER_MARGIN_BOTTOM,
  PAGE_CONTAINER_MARGIN_TOP,
  A4_PAGE_HEIGHT_PX,
} from "./styles";
import { styleConstants } from "./styles";
import { Headshot } from "./headshot";
import { Basics } from "../../backend/cover-letter/bindings/Basics";
import { BasicsCallbacks } from "./useJsonResume";
import { EditableSpan, EditableEmail } from "./editable";
import { ApplicationParameters } from "../../backend/cover-letter/bindings/ApplicationParameters";
import { useApplicationTitle } from "./application-title";
import { AdjustableFontSizeContainer } from "./adjustable-font-size";
import { HIDE_AT_PAGE_BREAK } from "./styles";

type SingleColumnTitlePageProps = {
  basics: Basics;
  basicsCallbacks: BasicsCallbacks;
  revisionId: string | null;
  pushApplicationParameters:
    | null
    | ((update: (old: ApplicationParameters) => ApplicationParameters) => void);
};

type SingleColumnTitlePageStyles = {
  container: React.CSSProperties;
  nameAndTitleContainer: React.CSSProperties;
  nameContainer: React.CSSProperties;
  name: React.CSSProperties;
  firstName: React.CSSProperties;
  lastName: React.CSSProperties;
  headshotContainer: React.CSSProperties;
  contactsContainer: React.CSSProperties;
  contactItem: React.CSSProperties;
  contactItemKey: React.CSSProperties;
  contactItemValue: React.CSSProperties;
  applicationTitleContainer: React.CSSProperties;
  applicationTitleInnerContainer: React.CSSProperties;
  title: React.CSSProperties;
  graphic: React.CSSProperties;
};

const singleColumnTitlePageStyles: SingleColumnTitlePageStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: PAGE_CONTAINER_MARGIN_TOP,
    paddingBottom: PAGE_CONTAINER_MARGIN_BOTTOM,
    backgroundColor: "white",
    height: `${A4_PAGE_HEIGHT_PX}px`,
    width: "100%",
    pageBreakAfter: "always",
    overflowY: "hidden",
  },
  nameAndTitleContainer: {
    textAlign: "center",
    marginBottom: styleConstants.spacing.large,
    padding: styleConstants.spacing.normal,
    border: `3px solid ${styleConstants.colors.primary}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  nameContainer: {
    textAlign: "center",
  },
  name: {
    fontSize: styleConstants.fontSize.XXXXLargePx,
    fontWeight: styleConstants.fontWeight.normal,
  },
  firstName: {
    display: "inline-block",
  },
  lastName: {
    display: "inline-block",
    marginLeft: "0.2em",
  },
  graphic: {
    width: "25%",
    height: "2px",
    backgroundColor: styleConstants.colors.primary,
    marginBottom: styleConstants.spacing.small,
    marginTop: styleConstants.spacing.small,
  },
  headshotContainer: {
    width: "35%",
    height: "auto",
    marginBottom: styleConstants.spacing.large,
    marginTop: "96px",
  },
  contactsContainer: {
    display: "flex",
    flexDirection: "column",
    width: "75%",
    alignItems: "flex-start",
    marginBottom: styleConstants.spacing.large,
  },
  contactItem: {
    display: "flex",
    width: "100%",
  },
  contactItemKey: {
    textAlign: "left",
    paddingRight: styleConstants.spacing.normal,
    whiteSpace: "nowrap",
    flex: "0 0 auto",
  },
  contactItemValue: {
    textAlign: "left",
    flex: "1 1 auto",
  },
  applicationTitleContainer: {
    textAlign: "center",
    marginBottom: PAGE_CONTAINER_MARGIN_BOTTOM,
  },
  applicationTitleInnerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    letterSpacing: styleConstants.letterSpacing.superWide,
    fontWeight: styleConstants.fontWeight.normal,
    whiteSpace: "nowrap",
    textTransform: "uppercase",
  },
};

function NameHeading({
  basics,
  callbacks,
}: {
  basics: Basics;
  callbacks: BasicsCallbacks;
}): JSX.Element {
  const { familyName, givenName } = basics;
  const style = singleColumnTitlePageStyles;

  return (
    <div style={style.nameContainer}>
      <AdjustableFontSizeContainer
        maxFontSize={styleConstants.fontSize.XXXXLargePx}
      >
        <div style={style.name}>
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
        </div>
      </AdjustableFontSizeContainer>
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
  const style = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: styleConstants.spacing.normal,
      marginTop: `-${styleConstants.spacing.normal}`,
      marginBottom: `-${styleConstants.spacing.normal}`,
    },
  };

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
      <SectionSeparator />
    </>
  );
}

const separatorStyle: React.CSSProperties = {
  marginTop: styleConstants.spacing.normalLarge,
  marginBottom: styleConstants.spacing.normalLarge,
};
function SectionSeparator(): JSX.Element {
  return <hr style={separatorStyle} className={HIDE_AT_PAGE_BREAK} />;
}

function ApplicationTitle({ revisionId }: { revisionId: string }): JSX.Element {
  const fullTitle = useApplicationTitle(revisionId);

  const [heading, ...subheadingParts] = fullTitle.split(" ");
  const subheading = subheadingParts.join(" ");

  const headingStyle = {
    ...singleColumnTitlePageStyles.title,
    fontSize: styleConstants.fontSize.XXLarge,
  };

  const subheadingStyle: React.CSSProperties = {
    fontSize: `${styleConstants.fontSize.XLarge}`,
  };

  return (
    <div style={singleColumnTitlePageStyles.applicationTitleContainer}>
      <div style={singleColumnTitlePageStyles.applicationTitleInnerContainer}>
        <div style={headingStyle}>{heading}</div>
        {subheading && <div style={subheadingStyle}>{subheading}</div>}
      </div>
    </div>
  );
}

export function SingleColumnTitlePage({
  basics,
  basicsCallbacks,
  revisionId,
  pushApplicationParameters,
}: SingleColumnTitlePageProps): JSX.Element | null {
  const style = singleColumnTitlePageStyles;
  if (revisionId == null) {
    return null;
  }
  return (
    <div style={style.container}>
      <div style={style.headshotContainer}>
        <Headshot
          revisionId={revisionId}
          style={{ width: "100%", height: "auto", objectFit: "contain" }}
          pushApplicationParameters={pushApplicationParameters}
        />
      </div>
      <div style={style.nameAndTitleContainer}>
        <NameHeading basics={basics} callbacks={basicsCallbacks} />
        <div style={style.graphic}></div>
        <ApplicationTitle revisionId={revisionId} />
      </div>
      <ContactsElement basics={basics} callbacks={basicsCallbacks} />
    </div>
  );
}
