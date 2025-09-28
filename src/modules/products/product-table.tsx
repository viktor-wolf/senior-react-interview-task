import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/table";
import { getProducts, type Product } from "../../api/products";
import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  formatDeposit,
  formatPackaging,
  formatRegisteredAt,
} from "../../lib/product";
import { Button } from "../../components/button";
import { Toggle } from "../../components/toggle";

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product name",
  },
  {
    accessorKey: "packaging",
    header: "Packaging",
    cell: (props) => <span>{formatPackaging(props.getValue() as string)}</span>,
  },
  {
    accessorKey: "deposit",
    header: "Deposit ($)",
    cell: (props) => <span>{formatDeposit(props.getValue() as number)}</span>,
  },
  {
    accessorKey: "volume",
    header: "Volume (mL)",
  },
  {
    accessorKey: "companyId",
    header: "Company",
  },
  {
    accessorKey: "active",
    header: "Active",
  },
  {
    accessorKey: "registeredAt",
    header: "Registration date",
    cell: (props) => (
      <span>{formatRegisteredAt(props.getValue() as string)}</span>
    ),
  },
];

function ProductTable() {
  const [activeOnly, setActiveOnly] = useState(false);

  const {
    data: productPages,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", activeOnly],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getProducts(pageParam, activeOnly),
    getNextPageParam: ({ pagination }) => {
      if (pagination.currentPage < pagination.totalPages) {
        return pagination.currentPage + 1;
      }
      return undefined;
    },
  });

  const tableData = useMemo(() => {
    if (!productPages?.pages.length) return [];
    return productPages?.pages.flatMap((page) => page.data);
  }, [productPages]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="grid gap-4">
      <Toggle
        variant="outline"
        className="w-auto justify-self-start"
        pressed={activeOnly}
        onPressedChange={setActiveOnly}
      >
        Only show active
      </Toggle>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {error
                    ? "An error has occurred while loading the products"
                    : isFetching
                      ? "Loading data..."
                      : "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center">
        <Button
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </Button>
      </div>
    </div>
  );
}

export default ProductTable;
