import type React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/card";

interface Props {
  title: string;
}

function DashboardSection({ children, title }: React.PropsWithChildren<Props>) {
  return (
    <section>
      <Card className="pt-6">
        <CardHeader className="border-b [.border-b]:pb-2">
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">{children}</CardContent>
      </Card>
    </section>
  );
}

export default DashboardSection;
