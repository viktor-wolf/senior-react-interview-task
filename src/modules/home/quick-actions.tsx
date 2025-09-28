import { Plus } from "lucide-react";
import { Button } from "../../components/button";
import { Link } from "react-router";
import AddProductDialog from "./add-product-dialog";
import DashboardSection from "./dashboard-section";

function QuickActions() {
  return (
    <DashboardSection title="Quick actions">
      <ul className="list-none pl-0 flex flex-wrap gap-4">
        <li>
          <Button variant="outline" className="cursor-default" asChild>
            <Link to="/products">
              <Plus />
              View all products
            </Link>
          </Button>
        </li>
        <li>
          <AddProductDialog />
        </li>
      </ul>
    </DashboardSection>
  );
}

export default QuickActions;
