import { useEffect, useState } from "react";
import { getApplicantAddress } from "./api/applicant-address";
import { getCompanyAddress } from "./api/company-address";
import { ApplicationParameters } from "../../backend/cover-letter/bindings/ApplicationParameters";
import { ApplicantAddress } from "../../backend/cover-letter/bindings/ApplicantAddress";
import { CompanyAddress } from "../../backend/cover-letter/bindings/CompanyAddress";
import { EditableSpan } from "./editable";
import { styleConstants } from "./styles";

export type LetterHeadProps = {
  revisionId: string | null;
  setShowError: (show: boolean) => void;
  pushApplicationParameters:
    | null
    | ((update: (old: ApplicationParameters) => ApplicationParameters) => void);
  mobileLayout: boolean;
};

function ApplicantAddressHead({
  revisionId,
  setShowError,
  pushApplicationParameters,
  mobileLayout,
}: LetterHeadProps) {
  const [applicantAddress, setApplicantAddress] =
    useState<ApplicantAddress | null>(null);

  useEffect(() => {
    if (revisionId == null) {
      setApplicantAddress(null);
      return;
    }

    (async function () {
      try {
        setApplicantAddress(
          await getApplicantAddress({ revisionId: revisionId }),
        );
      } catch (err) {
        console.error("Error fetching applicant address", err);
        setShowError(true);
      }
    })();
  }, [revisionId, setShowError]);

  const desktopContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    paddingTop: "10mm",
    paddingRight: "25mm",
  };
  const mobileContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    padding: 8,
  };

  function handleNameChange(newValue: string | null) {
    if (!pushApplicationParameters) {
      throw new Error("pushApplicationParameters is not set");
    }

    pushApplicationParameters((old) => ({
      ...old,
      applicantAddress: {
        ...old.applicantAddress,
        name: newValue,
      },
    }));
  }

  function handleStreetAddressChange(newValue: string | null) {
    if (!pushApplicationParameters) {
      throw new Error("pushApplicationParameters is not set");
    }

    pushApplicationParameters((old) => ({
      ...old,
      applicantAddress: {
        ...old.applicantAddress,
        streetAddress: newValue,
      },
    }));
  }

  function handlePostalCodeChange(newValue: string | null) {
    if (!pushApplicationParameters) {
      throw new Error("pushApplicationParameters is not set");
    }

    pushApplicationParameters((old) => ({
      ...old,
      applicantAddress: {
        ...old.applicantAddress,
        postalCode: newValue,
      },
    }));
  }

  function handleCityChange(newValue: string | null) {
    if (!pushApplicationParameters) {
      throw new Error("pushApplicationParameters is not set");
    }

    pushApplicationParameters((old) => ({
      ...old,
      applicantAddress: {
        ...old.applicantAddress,
        city: newValue,
      },
    }));
  }

  return (
    <div style={mobileLayout ? mobileContainerStyle : desktopContainerStyle}>
      {applicantAddress && (
        <>
          <div>
            <EditableSpan
              value={applicantAddress.name}
              placeholder={"[Name]"}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <EditableSpan
              value={applicantAddress.streetAddress}
              placeholder={"[Straße und Hausnummer]"}
              onChange={handleStreetAddressChange}
            />
          </div>
          <div>
            <EditableSpan
              value={applicantAddress.postalCode}
              placeholder={"[PLZ]"}
              onChange={handlePostalCodeChange}
            />{" "}
            <EditableSpan
              value={applicantAddress.city}
              placeholder={"[Ort]"}
              onChange={handleCityChange}
            />
          </div>
        </>
      )}
    </div>
  );
}

function RecipientAddress({
  revisionId,
  setShowError,
  pushApplicationParameters,
  mobileLayout,
}: LetterHeadProps) {
  const [companyAddress, setCompanyAddress] = useState<CompanyAddress | null>(
    null,
  );

  useEffect(() => {
    if (revisionId == null) {
      setCompanyAddress(null);
      return;
    }

    (async function () {
      try {
        setCompanyAddress(await getCompanyAddress({ revisionId: revisionId }));
      } catch (err) {
        console.error("Error fetching company address", err);
        setShowError(true);
      }
    })();
  }, [revisionId, setShowError]);

  // The window in C4 envelopes is 90mm x 55mm wide and high. It's located 57mm from the top and
  // 20mm from the left.
  // See: https://www.packpack.de/briefumschlag-versandtaschen-weiss-mit-fenster-c4-229x324mm-mit-haftklebestreifen
  const desktopContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    paddingTop: "40mm",
    paddingLeft: "25mm",
    paddingBottom: "10mm",
  };
  const mobileContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    padding: 8,
  };

  function handleCompanyNameChange(newValue: string | null) {
    if (!pushApplicationParameters) {
      throw new Error("pushApplicationParameters is not set");
    }

    pushApplicationParameters((old) => ({
      ...old,
      companyAddress: {
        ...old.companyAddress,
        companyName: newValue,
      },
    }));
  }

  function handleStreetAddressChange(newValue: string | null) {
    if (!pushApplicationParameters) {
      throw new Error("pushApplicationParameters is not set");
    }

    pushApplicationParameters((old) => ({
      ...old,
      companyAddress: {
        ...old.companyAddress,
        streetAddress: newValue,
      },
    }));
  }

  function handlePostalCodeChange(newValue: string | null) {
    if (!pushApplicationParameters) {
      throw new Error("pushApplicationParameters is not set");
    }

    pushApplicationParameters((old) => ({
      ...old,
      companyAddress: {
        ...old.companyAddress,
        postalCode: newValue,
      },
    }));
  }

  function handleCityChange(newValue: string | null) {
    if (!pushApplicationParameters) {
      throw new Error("pushApplicationParameters is not set");
    }

    pushApplicationParameters((old) => ({
      ...old,
      companyAddress: {
        ...old.companyAddress,
        city: newValue,
      },
    }));
  }

  return (
    <div style={mobileLayout ? mobileContainerStyle : desktopContainerStyle}>
      {companyAddress != null && (
        <>
          <div style={{ fontWeight: 700 }}>
            <EditableSpan
              value={companyAddress.companyName}
              placeholder={"[Firmenname]"}
              onChange={handleCompanyNameChange}
            />
          </div>
          <div>
            <EditableSpan
              value={companyAddress.streetAddress}
              placeholder={"[Straße und Hausnummer]"}
              onChange={handleStreetAddressChange}
            />
          </div>
          <div>
            <EditableSpan
              value={companyAddress.postalCode}
              placeholder={"[PLZ]"}
              onChange={handlePostalCodeChange}
            />{" "}
            <EditableSpan
              value={companyAddress.city}
              placeholder={"[Ort]"}
              onChange={handleCityChange}
            />
          </div>
        </>
      )}
    </div>
  );
}

export function LetterHead({
  revisionId,
  setShowError,
  pushApplicationParameters,
  mobileLayout,
}: LetterHeadProps) {
  const backgroundColor = styleConstants.colors.secondary;

  const desktopContainerStyle: React.CSSProperties = {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor,
    minHeight: 150,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "25mm",
  };

  const mobileContainerStyle: React.CSSProperties = {
    backgroundColor,
    display: "flex",
    flexDirection: "column-reverse",
    gap: "16px",
    paddingTop: 32,
    paddingBottom: 32,
  };

  return (
    <div style={mobileLayout ? mobileContainerStyle : desktopContainerStyle}>
      <RecipientAddress
        revisionId={revisionId}
        setShowError={setShowError}
        pushApplicationParameters={pushApplicationParameters}
        mobileLayout={mobileLayout}
      />
      <ApplicantAddressHead
        revisionId={revisionId}
        setShowError={setShowError}
        pushApplicationParameters={pushApplicationParameters}
        mobileLayout={mobileLayout}
      />
    </div>
  );
}
