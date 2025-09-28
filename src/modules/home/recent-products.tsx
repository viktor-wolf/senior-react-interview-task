import { useQuery } from "@tanstack/react-query";
import DashboardSection from "./dashboard-section";
import { getRecentProducts } from "../../api/products";
import RecentProductItem from "./recent-product-item";

function RecentProducts() {
  const recentProductsQuery = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getRecentProducts,
  });

  let content = null;
  if (recentProductsQuery.isLoading) {
    content = <p>Loading...</p>;
  } else if (recentProductsQuery.isError) {
    content = <p>There has been an error fetching recently added products.</p>;
  } else if (recentProductsQuery.data?.length) {
    content = (
      <ul className="list-none pl-0">
        {recentProductsQuery.data.map((product) => (
          <RecentProductItem key={product.id} product={product} />
        ))}
      </ul>
    );
  }

  return <DashboardSection title="Recent products">{content}</DashboardSection>;
}

export default RecentProducts;
