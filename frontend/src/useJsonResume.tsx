import { useCallback } from "react";
import { Basics } from "../../backend/cover-letter/bindings/Basics";
import { Education } from "../../backend/cover-letter/bindings/Education";
import { JsonResume } from "../../backend/cover-letter/bindings/JsonResume";
import { Skills } from "../../backend/cover-letter/bindings/Skills";
import { Skill } from "../../backend/cover-letter/bindings/Skill";
import { Work } from "../../backend/cover-letter/bindings/Work";
import { Volunteer } from "../../backend/cover-letter/bindings/Volunteer";
import { Certificate } from "../../backend/cover-letter/bindings/Certificate";
import { PersonalInfo } from "../../backend/cover-letter/bindings/PersonalInfo";
import { ResumeDate } from "../../backend/cover-letter/bindings/ResumeDate";

enum RelativePosition {
  Before = "before",
  After = "after",
}

const dummyResumeDate: ResumeDate = {
  kind: "YearMonth",
  year: 2000,
  month: 1,
};

export type JsonResumeCallbacks = {
  setLanguage: (value: string | null) => void;
  basics: BasicsCallbacks;
  work: WorkCallbacks;
  volunteer: VolunteerCallbacks;
  education: EducationCallbacks;
  skills: SkillsCallbacks;
  certificates: CertificatesCallbacks;
  personalInfo: PersonalInfoCallbacks;
};

// Language (top level)
export function useLanguageCallback(
  jsonResume: JsonResume,
  setJsonResume: (newJsonResume: JsonResume) => void,
) {
  return useCallback(
    (value: string | null) => {
      setJsonResume({
        ...jsonResume,
        language: value,
      });
    },
    [jsonResume, setJsonResume],
  );
}

// Basics
export type BasicsCallbacks = {
  set: (basics: Basics) => void;
  setEmail: (value: string | null) => void;
  setPhone: (value: string | null) => void;
  setCity: (value: string | null) => void;
  setStreetAddress: (value: string | null) => void;
  setPostalCode: (value: string | null) => void;
  setFamilyName: (value: string | null) => void;
  setGivenName: (value: string | null) => void;
  setLabel: (value: string | null) => void;
  setSummary: (value: string | null) => void;
};

export function useBasicsCallbacks(
  jsonResume: JsonResume,
  setJsonResume: (newJsonResume: JsonResume) => void,
): BasicsCallbacks {
  const set = useCallback(
    (basics: Basics) => {
      setJsonResume({ ...jsonResume, basics });
    },
    [jsonResume, setJsonResume],
  );

  const setEmail = useCallback(
    (value: string | null) => {
      setJsonResume({
        ...jsonResume,
        basics: {
          ...jsonResume.basics,
          email: value === null ? "" : value,
        },
      });
    },
    [jsonResume, setJsonResume],
  );

  const setPhone = useCallback(
    (value: string | null) => {
      setJsonResume({
        ...jsonResume,
        basics: {
          ...jsonResume.basics,
          phone: value === null ? "" : value,
        },
      });
    },
    [jsonResume, setJsonResume],
  );

  const setCity = useCallback(
    (value: string | null) => {
      setJsonResume({
        ...jsonResume,
        basics: {
          ...jsonResume.basics,
          location: {
            ...jsonResume.basics.location,
            city: value === null ? "" : value,
          },
        },
      });
    },
    [jsonResume, setJsonResume],
  );

  const setStreetAddress = useCallback(
    (value: string | null) => {
      setJsonResume({
        ...jsonResume,
        basics: {
          ...jsonResume.basics,
          location: {
            ...jsonResume.basics.location,
            streetAddress: value === null ? "" : value,
          },
        },
      });
    },
    [jsonResume, setJsonResume],
  );

  const setPostalCode = useCallback(
    (value: string | null) => {
      setJsonResume({
        ...jsonResume,
        basics: {
          ...jsonResume.basics,
          location: {
            ...jsonResume.basics.location,
            postalCode: value === null ? "" : value,
          },
        },
      });
    },
    [jsonResume, setJsonResume],
  );

  const setFamilyName = useCallback(
    (value: string | null) => {
      setJsonResume({
        ...jsonResume,
        basics: {
          ...jsonResume.basics,
          familyName: value === null ? "" : value,
        },
      });
    },
    [jsonResume, setJsonResume],
  );

  const setGivenName = useCallback(
    (value: string | null) => {
      setJsonResume({
        ...jsonResume,
        basics: {
          ...jsonResume.basics,
          givenName: value === null ? "" : value,
        },
      });
    },
    [jsonResume, setJsonResume],
  );

  const setLabel = useCallback(
    (value: string | null) => {
      setJsonResume({
        ...jsonResume,
        basics: {
          ...jsonResume.basics,
          label: value === null ? "" : value,
        },
      });
    },
    [jsonResume, setJsonResume],
  );

  const setSummary = useCallback(
    (value: string | null) => {
      setJsonResume({
        ...jsonResume,
        basics: {
          ...jsonResume.basics,
          summary: value === null ? "" : value,
        },
      });
    },
    [jsonResume, setJsonResume],
  );

  return {
    set,
    setEmail,
    setPhone,
    setCity,
    setStreetAddress,
    setPostalCode,
    setFamilyName,
    setGivenName,
    setLabel,
    setSummary,
  };
}

// Work
export type WorkCallbacks = {
  set: (work: Work[]) => void;
  addEntry: (relativePosition: RelativePosition, index: number) => void;
  setEntry: (entry: Work, index: number) => void;
};

export function useWorkCallbacks(
  jsonResume: JsonResume,
  setJsonResume: (newJsonResume: JsonResume) => void,
): WorkCallbacks {
  const set = useCallback(
    (work: Work[]) => {
      setJsonResume({ ...jsonResume, work });
    },
    [jsonResume, setJsonResume],
  );

  const addEntry = useCallback(
    (relativePosition: RelativePosition, index: number) => {
      const newWork: Work = {
        name: "Musterfirma",
        position: "Musterposition",
        startDate: dummyResumeDate,
        endDate: dummyResumeDate,
        highlights: ["Mustertätigkeit 1"],
        location: "Musterstadt",
        url: "",
      };
      const newWorkList = [...jsonResume.work];
      newWorkList.splice(
        index + (relativePosition === RelativePosition.After ? 1 : 0),
        0,
        newWork,
      );
      setJsonResume({
        ...jsonResume,
        work: newWorkList,
      });
    },
    [jsonResume, setJsonResume],
  );

  const setEntry = useCallback(
    (entry: Work, index: number) => {
      const newWork = [...jsonResume.work];
      newWork[index] = entry;
      setJsonResume({
        ...jsonResume,
        work: newWork,
      });
    },
    [jsonResume, setJsonResume],
  );

  return {
    set,
    addEntry,
    setEntry,
  };
}

// Volunteer
export type VolunteerCallbacks = {
  set: (volunteer: Volunteer[]) => void;
  addEntry: (relativePosition: RelativePosition, index: number) => void;
  setEntry: (entry: Volunteer, index: number) => void;
};

export function useVolunteerCallbacks(
  jsonResume: JsonResume,
  setJsonResume: (newJsonResume: JsonResume) => void,
): VolunteerCallbacks {
  const set = useCallback(
    (volunteer: Volunteer[]) => {
      setJsonResume({ ...jsonResume, volunteer });
    },
    [jsonResume, setJsonResume],
  );

  const addEntry = useCallback(
    (relativePosition: RelativePosition, index: number) => {
      const newVolunteer: Volunteer = {
        organization: "Musterorganisation",
        position: "Musterposition",
        startDate: dummyResumeDate,
        endDate: dummyResumeDate,
        url: "",
        highlights: ["Mustertätigkeit"],
      };
      const newVolunteerList = [...jsonResume.volunteer];
      newVolunteerList.splice(
        index + (relativePosition === RelativePosition.After ? 1 : 0),
        0,
        newVolunteer,
      );
      setJsonResume({
        ...jsonResume,
        volunteer: newVolunteerList,
      });
    },
    [jsonResume, setJsonResume],
  );

  const setEntry = useCallback(
    (entry: Volunteer, index: number) => {
      const newVolunteer = [...jsonResume.volunteer];
      newVolunteer[index] = entry;
      setJsonResume({
        ...jsonResume,
        volunteer: newVolunteer,
      });
    },
    [jsonResume, setJsonResume],
  );

  return {
    set,
    addEntry,
    setEntry,
  };
}

// Education
export type EducationCallbacks = {
  set: (education: Education[]) => void;
  addEntry: (relativePosition: RelativePosition, index: number) => void;
  setEntry: (entry: Education, index: number) => void;
};

export function useEducationCallbacks(
  jsonResume: JsonResume,
  setJsonResume: (newJsonResume: JsonResume) => void,
): EducationCallbacks {
  const set = useCallback(
    (education: Education[]) => {
      setJsonResume({ ...jsonResume, education });
    },
    [jsonResume, setJsonResume],
  );

  const addEntry = useCallback(
    (relativePosition: RelativePosition, index: number) => {
      const newEducation: Education = {
        institution: "Musterinstitution",
        degree: "Musterabschluss",
        startDate: dummyResumeDate,
        endDate: dummyResumeDate,
        score: "2,0",
        url: "",
        courses: ["Musterkurs", "Musterinhalt"],
      };
      const newEducationList = [...jsonResume.education];
      newEducationList.splice(
        index + (relativePosition === RelativePosition.After ? 1 : 0),
        0,
        newEducation,
      );
      setJsonResume({
        ...jsonResume,
        education: newEducationList,
      });
    },
    [jsonResume, setJsonResume],
  );

  const setEntry = useCallback(
    (entry: Education, index: number) => {
      const newEducation = [...jsonResume.education];
      newEducation[index] = entry;
      setJsonResume({
        ...jsonResume,
        education: newEducation,
      });
    },
    [jsonResume, setJsonResume],
  );

  return {
    set,
    addEntry,
    setEntry,
  };
}

// Skills
export type SkillsCallbacks = {
  set: (skills: Skills) => void;
  setSoftware: (software: Skill[]) => void;
  setLanguages: (languages: Skill[]) => void;
  setDriversLicence: (driversLicence: string) => void;
  setCharacterTraits: (characterTraits: string[]) => void;
  setInterests: (interests: string[]) => void;
};

export function useSkillsCallbacks(
  jsonResume: JsonResume,
  setJsonResume: (newJsonResume: JsonResume) => void,
): SkillsCallbacks {
  const set = useCallback(
    (skills: Skills) => {
      setJsonResume({ ...jsonResume, skills });
    },
    [jsonResume, setJsonResume],
  );

  const setSoftware = useCallback(
    (software: Skill[]) => {
      setJsonResume({
        ...jsonResume,
        skills: {
          ...jsonResume.skills,
          software,
        },
      });
    },
    [jsonResume, setJsonResume],
  );

  const setLanguages = useCallback(
    (languages: Skill[]) => {
      setJsonResume({
        ...jsonResume,
        skills: {
          ...jsonResume.skills,
          languages,
        },
      });
    },
    [jsonResume, setJsonResume],
  );

  const setDriversLicence = useCallback(
    (driversLicence: string) => {
      setJsonResume({
        ...jsonResume,
        skills: {
          ...jsonResume.skills,
          driversLicence,
        },
      });
    },
    [jsonResume, setJsonResume],
  );

  const setCharacterTraits = useCallback(
    (characterTraits: string[]) => {
      setJsonResume({
        ...jsonResume,
        skills: {
          ...jsonResume.skills,
          characterTraits,
        },
      });
    },
    [jsonResume, setJsonResume],
  );

  const setInterests = useCallback(
    (interests: string[]) => {
      setJsonResume({
        ...jsonResume,
        skills: {
          ...jsonResume.skills,
          interests,
        },
      });
    },
    [jsonResume, setJsonResume],
  );

  return {
    set,
    setSoftware,
    setLanguages,
    setDriversLicence,
    setCharacterTraits,
    setInterests,
  };
}

// Certificates
export type CertificatesCallbacks = {
  set: (certificates: Certificate[]) => void;
  addEntry: (relativePosition: RelativePosition, index: number) => void;
  setEntry: (entry: Certificate, index: number) => void;
};

export function useCertificatesCallbacks(
  jsonResume: JsonResume,
  setJsonResume: (newJsonResume: JsonResume) => void,
): CertificatesCallbacks {
  const set = useCallback(
    (certificates: Certificate[]) => {
      setJsonResume({ ...jsonResume, certificates });
    },
    [jsonResume, setJsonResume],
  );

  const addEntry = useCallback(
    (relativePosition: RelativePosition, index: number) => {
      const newCertificate: Certificate = {
        name: "Musterzertifikat",
        institution: "Musterinstitution",
        startDate: dummyResumeDate,
        endDate: dummyResumeDate,
        highlights: ["Musterinhalt"],
        url: "",
      };
      const newCertificateList = [...jsonResume.certificates];
      newCertificateList.splice(
        index + (relativePosition === RelativePosition.After ? 1 : 0),
        0,
        newCertificate,
      );
      setJsonResume({
        ...jsonResume,
        certificates: newCertificateList,
      });
    },
    [jsonResume, setJsonResume],
  );

  const setEntry = useCallback(
    (entry: Certificate, index: number) => {
      const newCertificates = [...jsonResume.certificates];
      newCertificates[index] = entry;
      setJsonResume({
        ...jsonResume,
        certificates: newCertificates,
      });
    },
    [jsonResume, setJsonResume],
  );

  return {
    set,
    addEntry,
    setEntry,
  };
}

// Personal Info
export type PersonalInfoCallbacks = {
  set: (personalInfo: PersonalInfo) => void;
  setBirthDate: (birthDate: ResumeDate | null) => void;
  setBirthPlace: (value: string | null) => void;
  setNationality: (value: string | null) => void;
  setMaritalStatus: (value: string | null) => void;
  setChildren: (value: string | null) => void;
};

export function usePersonalInfoCallbacks(
  jsonResume: JsonResume,
  setJsonResume: (newJsonResume: JsonResume) => void,
): PersonalInfoCallbacks {
  const set = useCallback(
    (personalInfo: PersonalInfo) => {
      setJsonResume({ ...jsonResume, personalInfo });
    },
    [jsonResume, setJsonResume],
  );

  const setBirthDate = useCallback(
    (birthDate: ResumeDate | null) => {
      setJsonResume({
        ...jsonResume,
        personalInfo: {
          ...jsonResume.personalInfo,
          birthDate,
        },
      });
    },
    [jsonResume, setJsonResume],
  );

  const setBirthPlace = useCallback(
    (value: string | null) => {
      setJsonResume({
        ...jsonResume,
        personalInfo: {
          ...jsonResume.personalInfo,
          birthPlace: value === null ? "" : value,
        },
      });
    },
    [jsonResume, setJsonResume],
  );

  const setNationality = useCallback(
    (value: string | null) => {
      setJsonResume({
        ...jsonResume,
        personalInfo: {
          ...jsonResume.personalInfo,
          nationality: value === null ? "" : value,
        },
      });
    },
    [jsonResume, setJsonResume],
  );

  const setMaritalStatus = useCallback(
    (value: string | null) => {
      setJsonResume({
        ...jsonResume,
        personalInfo: {
          ...jsonResume.personalInfo,
          maritalStatus: value === null ? "" : value,
        },
      });
    },
    [jsonResume, setJsonResume],
  );

  const setChildren = useCallback(
    (value: string | null) => {
      setJsonResume({
        ...jsonResume,
        personalInfo: {
          ...jsonResume.personalInfo,
          children: value === null ? "" : value,
        },
      });
    },
    [jsonResume, setJsonResume],
  );

  return {
    set,
    setBirthDate,
    setBirthPlace,
    setNationality,
    setMaritalStatus,
    setChildren,
  };
}

export function useJsonResume(
  jsonResume: JsonResume,
  setJsonResume: (newJsonResume: JsonResume) => void,
): JsonResumeCallbacks {
  return {
    setLanguage: useLanguageCallback(jsonResume, setJsonResume),
    basics: useBasicsCallbacks(jsonResume, setJsonResume),
    work: useWorkCallbacks(jsonResume, setJsonResume),
    volunteer: useVolunteerCallbacks(jsonResume, setJsonResume),
    education: useEducationCallbacks(jsonResume, setJsonResume),
    skills: useSkillsCallbacks(jsonResume, setJsonResume),
    certificates: useCertificatesCallbacks(jsonResume, setJsonResume),
    personalInfo: usePersonalInfoCallbacks(jsonResume, setJsonResume),
  };
}
