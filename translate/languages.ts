type languageOptions = {
  [locate: string]: {
    [term: string]: string;
  };
};

export const languageDirectory: languageOptions = {
  vi: {
    //home
    male: "Nam",
    female: "Nữ",
  },
  en: {
    //home
    male: "Male",
    female: "Female",
  },
};
