import React, { useState, ChangeEvent, FormEvent } from "react";
import { CenteredMain, BorderedDiv } from "./container";

interface SigninProps {
  onSigninPending?: () => void;
  onSigninUnknown?: (email: string) => void;
}

function SigninForm({ onSigninPending, onSigninUnknown }: SigninProps) {
  const [formData, setFormData] = useState({
    email: "",
    showError: false,
    submitInProgress: false,
  });

  const handleTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
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

      let signinPayload = {
        email: formData.email,
      };

      const response = await fetch("/api/signin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signinPayload),
      });

      if (response.status === 404 /* NOT FOUND */) {
        if (onSigninUnknown) {
          onSigninUnknown(formData.email);
        } else {
          throw new Error(`Unknown user: ${formData.email}`);
        }
        return;
      }

      if (response.status === 202 /* ACCEPTED */) {
        if (onSigninPending) {
          onSigninPending();
        }
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

  let error = null;
  if (formData.showError) {
    error = (
      <div className="mb-3 alert alert-danger" role="alert">
        Ein Fehler ist aufgetreten. Bitte versuchen Sie es später noch einmal.
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
    <form onSubmit={handleSubmit}>
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
          onChange={handleTextChange}
          required
        />
      </div>
      {error}
      <div className="mb-3 text-center">
        <button
          type="submit"
          className="btn btn-dark"
          disabled={formData.submitInProgress}
        >
          Anmelden
        </button>
      </div>
      {spinner}
    </form>
  );
}

export function Signin({ onSigninPending, onSigninUnknown }: SigninProps) {
  return (
    <CenteredMain>
      <BorderedDiv>
        <h1 className="mb-5 text-center">Willkommen zurück!</h1>
        <SigninForm
          onSigninPending={onSigninPending}
          onSigninUnknown={onSigninUnknown}
        />
      </BorderedDiv>
    </CenteredMain>
  );
}

interface SigninConfirmProps {
  showUserExistsInfo: boolean;
}
export function SigninConfirm({ showUserExistsInfo }: SigninConfirmProps) {
  let content = showUserExistsInfo ? (
    <div className="mb-3 alert alert-info" role="alert">
      Sie sind bereits registriert. Sie erhalten in Kürze eine Email, über die
      Sie sich anmelden können.
    </div>
  ) : (
    <p>Sie erhalten in Kürze eine Email, über die sie sich anmelden können.</p>
  );
  return (
    <CenteredMain>
      <BorderedDiv>
        <h1 className="mb-5 text-center">Willkommen zurück!</h1>
        {content}
      </BorderedDiv>
    </CenteredMain>
  );
}
