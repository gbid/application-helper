import { Link } from "wouter";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { CenteredMain, BorderedDiv } from "./container";
import { serializeRoute, RouteKind, Route } from "./route";

interface SignupProps {
  onSignupPending: () => void;
  onSigninPending: () => void;
  onUserExists: () => void;
  unknownEmail?: string;
  referredFrom?: Route;
  registrationPrompt?: string;
}

export function Signup({
  onSignupPending,
  onSigninPending,
  onUserExists,
  unknownEmail,
  referredFrom,
  registrationPrompt,
}: SignupProps) {
  const formDataEmail = unknownEmail === undefined ? "" : unknownEmail;
  const [formData, setFormData] = useState({
    email: formDataEmail,
    privacyPolicyCheck: false,
    showError: false,
    submitInProgress: false,
  });
  // formData.email is still empty here.
  // The reason for this is that the initial state is only used once, when the
  // component is first rendered. If the component is re-rendered, the initial
  // state is ignored. This is why we need to set formData.email again in the
  // useEffect hook below.
  // The rerendering happens when the user is redirected to the signup page
  // after trying to sign in with an unknown email address.
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      email: formDataEmail,
    }));
  }, [formDataEmail]);

  const [tooManyUsers, setTooManyUsers] = useState(false);

  const handleEmailChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.type !== "checkbox") {
      throw new Error(`Unexpected target.type: ${event.target.type}`);
    }
    const { name, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.submitInProgress) {
      throw new Error("Submit already in progress");
    }

    try {
      setFormData((prev) => ({
        ...prev,
        showError: false,
        submitInProgress: true,
      }));

      let signupPayload = {
        email: formData.email,
        privacyPolicyCheck: formData.privacyPolicyCheck,
        redirectTarget:
          referredFrom === undefined ? undefined : serializeRoute(referredFrom),
      };

      const response = await fetch("/api/signup", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupPayload),
      });

      if (response.status === 409 /* CONFLICT */) {
        // Send signin request instead.
        let signinPayload = {
          email: formData.email,
        };

        const response = await fetch("/api/signin", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signinPayload),
        });

        if (response.status === 404 /* NOT FOUND */) {
          // This is still possible in case of a race condition if the user
          // signs up on some other device concurrently.
          throw new Error("/signup reported user exists but /signin did not");
        }
        onUserExists();
        onSigninPending();
        return;
      }

      if (response.status === 410 /* GONE */) {
        setTooManyUsers(true);
        return;
      }

      if (response.status === 202 /* ACCEPTED */) {
        onSignupPending();
        return;
      }

      throw new Error(`Invalid response status code: ${response.status}`);
    } catch (err) {
      setFormData((prev) => ({
        ...prev,
        showError: true,
      }));
      throw err;
    } finally {
      setFormData((prev) => ({
        ...prev,
        submitInProgress: false,
      }));
    }
  };

  let signinAttemptedButUnknownError = null;
  if (unknownEmail) {
    signinAttemptedButUnknownError = (
      <div className="mb-3 alert alert-warning" role="alert">
        Bitte registrieren Sie sich erst.
      </div>
    );
  }

  let error = null;
  if (formData.showError) {
    error = (
      <div className="mb-3 alert alert-danger" role="alert">
        Ein Fehler ist aufgetreten. Bitte versuchen Sie es später noch einmal.
      </div>
    );
  }

  let tooManyUsersError = null;
  if (tooManyUsers) {
    tooManyUsersError = (
      <div className="mb-3 alert alert-danger" role="alert">
        Vielen Dank für Ihr Interesse! Wir nehmen im Moment leider keine neuen
        Anmeldungen entgegen. Schauen Sie doch in einigen Wochen noch einmal
        vorbei!
      </div>
    );
  }

  let spinner = null;
  if (formData.submitInProgress) {
    spinner = (
      <div className="mb-3 text-center">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  return (
    <CenteredMain>
      {signinAttemptedButUnknownError}
      <BorderedDiv>
        <form onSubmit={handleSubmit}>
          <h1 className="mb-5 text-center">
            {registrationPrompt ?? "Registrieren"}
          </h1>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              Emailadresse
            </label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              name="email"
              value={formData.email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-3 form-check">
            <label className="form-check-label" htmlFor="privacyPolicyCheck">
              Ich akzeptiere die{" "}
              <Link href={serializeRoute({ kind: RouteKind.Agb })}>
                Allgemeinen Geschäftsbedingungen
              </Link>
              .
            </label>
            <input
              type="checkbox"
              className="form-check-input"
              id="privacyPolicyCheck"
              name="privacyPolicyCheck"
              required
              onChange={handleCheckboxChange}
            />
          </div>
          {error}
          {tooManyUsersError}
          <div className="mb-3 text-center">
            <button
              type="submit"
              className="btn btn-dark"
              disabled={formData.submitInProgress}
            >
              Registrieren
            </button>
          </div>
          <div
            className="mb-3 text-center"
            style={{
              visibility: formData.submitInProgress ? "visible" : "hidden",
            }}
          >
            {spinner}
          </div>
        </form>
      </BorderedDiv>
    </CenteredMain>
  );
}

export function SignupConfirm() {
  return (
    <CenteredMain>
      <BorderedDiv>
        <h1 className="mb-5 text-center">Vielen Dank!</h1>
        <p>
          Sie erhalten in Kürze eine Email, über die Sie Ihren Account
          aktivieren können.
        </p>
      </BorderedDiv>
    </CenteredMain>
  );
}
