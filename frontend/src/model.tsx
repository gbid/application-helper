import { JsonResume } from "../../backend/cover-letter/bindings/JsonResume";
export type Uuid = string;
export type DateTimeString = string; // ISO 8601 format string

export enum UserType {
  Anonymous = "Anonymous",
  Standard = "Standard",
  Subscribed = "Subscribed",
}

export function isSignedIn(userType: UserType | null): boolean {
  switch (userType) {
    case UserType.Standard:
    case UserType.Subscribed:
      return true;
    case UserType.Anonymous:
    case null:
      return false;
    default: {
      const exhaustive: never = userType;
      throw new Error(`Unhandled UserType: ${exhaustive}`);
    }
  }
}

export type ApplicationId = {
  applicationId: Uuid;
};
export type Application = {
  applicationId: ApplicationId;
  revisionId?: RevisionId;
  job?: Job;
  resumeInfo?: ResumeInfo;
  templateCoverLetter?: TemplateCoverLetter;
  createdAt: DateTimeString;
  updatedAt?: DateTimeString;
  wordCount?: WordCount;
  languageOverride?: CoverLetterLanguage;
  coverLetterRandomSeed?: string;
};

export type RevisionId = {
  revisionId: Uuid;
};

export type ApplicationIdAndTitle = {
  applicationId: ApplicationId;
  title: string | null;
};

export type ApplicationParameters = {
  jobAdvert: string | null;
  resumeId: ResumeId | null;
  wordCount: WordCount | null;
  templateCoverLetterId: TemplateCoverLetterId | null;
  languageOverride: CoverLetterLanguage | null;
  coverLetterRandomSeed: string | null;
  coverLetterText: string | null;
  applicantAddress: ApplicantAddress;
  companyAddress: CompanyAddress;
  jsonResume: JsonResume | null;
  parentRevisionId: RevisionId | null;
};

export type Revision = {
  revisionId: RevisionId | null;
  applicationParameters: ApplicationParameters;
};

export type TemplateCoverLetterId = {
  templateCoverLetterId: Uuid;
};

export type TemplateCoverLetterContent = {
  content: String;
};

export type TemplateCoverLetter = {
  templateCoverLetterId: TemplateCoverLetterId;
  templateCoverLetterTitle: string;
  textContent: string;
  createdAt: DateTimeString;
  updatedAt?: DateTimeString;
};

export enum CoverLetterLanguage {
  English = "English",
  German = "German",
}

export type JobId = {
  jobId: Uuid;
};

export type UserId = {
  userId: Uuid;
};

export type ResumeId = {
  resumeId: Uuid;
};

export type WordCount = {
  wordCount: number;
};

export type ResumeInfo = {
  fileName: string;
  createdAt: Date;
};

export type Job = {
  jobId: JobId;
  jobDescription: string;
  jobDescriptionLanguage: JobDescriptionLanguage;
  jobTitle: string;
};

export enum JobDescriptionLanguage {
  English = "English",
  German = "German",
}

export function jobDescriptionLanguageToCoverLetterLanguage(
  language: JobDescriptionLanguage,
): CoverLetterLanguage {
  switch (language) {
    case JobDescriptionLanguage.English:
      return CoverLetterLanguage.English;
    case JobDescriptionLanguage.German:
      return CoverLetterLanguage.German;
  }
}

// generic toQueryString function taking an object and returning a query string
// with all internal objects flattened
export function toQueryString(obj: any): string {
  return "?" + toQueryStringAux(obj);
}

function toQueryStringAux(obj: any): string {
  const parts: string[] = [];
  for (const key in obj) {
    // hasOwnProperty skips inherited properties
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value instanceof Array) {
        value.forEach((v) => {
          parts.push(`${key}=${v}`);
        });
      } else if (value instanceof Object) {
        // Does this really work for nested objects?
        // TODO: Write some unit tests for this function
        parts.push(toQueryStringAux(value));
      } else {
        parts.push(`${key}=${value}`);
      }
    }
  }
  return parts.join("&");
}

export type ApplicantAddress = {
  name: string | null;
  streetAddress: string | null;
  postalCode: string | null;
  city: string | null;
};

export type CompanyAddress = {
  companyName: string | null;
  streetAddress: string | null;
  postalCode: string | null;
  city: string | null;
};
