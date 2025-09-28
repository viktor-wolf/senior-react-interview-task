import { Package } from "lucide-react";

import { PageHeader } from "../../components/page-header";
import KeyMetrics from "./key-metrics";
import QuickActions from "./quick-actions";
import RecentProducts from "./recent-products";

export function HomePage() {
  return (
    <>
      <PageHeader
        title="Deposit management dashboard"
        description="Welcome to your deposit management system. Monitor and manage your products, companies, and users."
        icon={<Package size={28} />}
      />
      <main className="flex flex-col gap-8">
        <KeyMetrics />
        <QuickActions />
        <RecentProducts />
      </main>
    </>
  );
}
