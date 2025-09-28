import { Building2, CircleDashed, Milk, Users } from "lucide-react";

import type { KeyMetricProps } from "./key-metric-card";
import KeyMetricCard from "./key-metric-card";
import {
  getActiveProductsTotal,
  getPendingProductsTotal,
} from "../../api/products";
import { getCompaniesTotal } from "../../api/companies";
import { getUsersTotal } from "../../api/users";

const cardConfigs: KeyMetricProps[] = [
  {
    title: "Active products",
    Icon: Milk,
    description: "Active products in system",
    queryOptions: {
      queryKey: ["activeProducts"],
      queryFn: getActiveProductsTotal,
    },
  },
  {
    title: "Pending products",
    Icon: CircleDashed,
    description: "Products waiting for approval",
    queryOptions: {
      queryKey: ["pendingProducts"],
      queryFn: getPendingProductsTotal,
    },
  },
  {
    title: "Companies",
    Icon: Building2,
    description: "Registered companies",
    queryOptions: {
      queryKey: ["companies"],
      queryFn: getCompaniesTotal,
    },
  },
  {
    title: "Users",
    Icon: Users,
    description: "Registered users",
    queryOptions: {
      queryKey: ["users"],
      queryFn: getUsersTotal,
    },
  },
];

function KeyMetrics() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardConfigs.map((cfg) => (
        <KeyMetricCard key={cfg.title} {...cfg} />
      ))}
    </section>
  );
}

export default KeyMetrics;
