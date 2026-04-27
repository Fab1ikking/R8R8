import ReportPage from "@/components/ReportPage";
import { Lang } from "@/lib/i18n";

interface ReportRouteProps {
  searchParams: {
    busId?: string;
    sessionId?: string;
    lang?: Lang;
  };
}

export default function Page({ searchParams }: ReportRouteProps) {
  return (
    <ReportPage
      busId={searchParams.busId}
      sessionId={searchParams.sessionId}
      initialLang={searchParams.lang ?? "HE"}
    />
  );
}
