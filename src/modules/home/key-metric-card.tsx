import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/card";

export interface KeyMetricProps {
  title: string;
  Icon: LucideIcon;
  description: string;
  queryOptions: UseQueryOptions<number>;
}

function KeyMetricCard({
  title,
  Icon,
  description,
  queryOptions,
}: KeyMetricProps) {
  const query = useQuery(queryOptions);

  let info = "Unavailable";

  if (query.isLoading) {
    info = "Loading...";
  } else if (query.isError) {
    info = "Error";
  } else if (query.data) {
    info = query.data.toString();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardAction>
          <Icon />
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="font-bold text-3xl mb-2">{info}</p>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

export default KeyMetricCard;
