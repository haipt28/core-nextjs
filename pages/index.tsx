import { LanguageButton } from "@/components/custom";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main>
      <span>{t("hello")}</span>
      <LanguageButton />
    </main>
  );
}
