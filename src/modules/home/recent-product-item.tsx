import {
  formatDeposit,
  formatPackaging,
  formatRegisteredAt,
  formatVolume,
} from "../../lib/product";
import type { Product } from "../../api/products";

type Props = {
  product: Product;
};

function RecentProductItem({ product }: Props) {
  const { name, packaging, deposit, volume, registeredAt } = product;

  return (
    <li className="flex flex-col sm:flex-row flex-wrap justify-between mb-4">
      <div className="grid gap-1">
        <h2 className="font-bold">{name}</h2>
        <ul className="flex gap-2 text-gray-500">
          <li>{formatVolume(volume)}</li>
          <li className="relative pl-3 before:content-['•'] before:absolute before:left-0">
            ${formatDeposit(deposit)} deposit
          </li>
          <li className="relative pl-3 before:content-['•'] before:absolute before:left-0">
            {formatPackaging(packaging)}
          </li>
        </ul>
      </div>
      <div className="flex flex-col justify-center">
        <time dateTime={registeredAt} className="text-gray-500">
          {formatRegisteredAt(registeredAt)}
        </time>
      </div>
    </li>
  );
}

export default RecentProductItem;
