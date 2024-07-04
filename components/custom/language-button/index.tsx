import i18next from "i18next";
import { useTranslation } from "react-i18next";
import "@/translate";

export const LanguageButton = () => {
  const { i18n } = useTranslation();

  return (
    <button
      className="px-4 py-1 shadow-xl w-12 dark:bg-slate-400 bg-slate-600
        flex justify-center items-center rounded-sm bg-opacity-40"
      onClick={() => {
        if (i18n.language === "en") {
          i18n.changeLanguage("vi");
        } else {
          i18n.changeLanguage("en");
        }
      }}
    >
      <span className="text-xs font-semibold text-center uppercase">
        {i18next.language}
      </span>
    </button>
  );
};
