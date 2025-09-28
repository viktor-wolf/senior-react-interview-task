import { Milk } from "lucide-react";

import { PageHeader } from "../../components/page-header";
import ProductTable from "./product-table";

export function ProductsPage() {
  return (
    <>
      <PageHeader
        title="Registered products"
        description="View and manage your registered products."
        icon={<Milk size={28} />}
      />
      <main>
        <ProductTable />
      </main>
    </>
  );
}
