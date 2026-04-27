import ThankYouPage from "@/components/ThankYouPage";
import { Lang } from "@/lib/i18n";

interface ThankYouRouteProps {
  searchParams: {
    lang?: Lang;
  };
}

export default function Page({ searchParams }: ThankYouRouteProps) {
  return <ThankYouPage initialLang={searchParams.lang ?? "HE"} />;
}
