type Product = {
  id: number;
  companyId: number;
  registeredById: number;
  name: string;
  packaging: string;
  deposit: number;
  volume: number;
  registeredAt: string;
  active: boolean;
};

type ProductsGetResponse =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      data: Product[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    };

type ProductsPostBody = {
  name: string;
  packaging: string;
  deposit: number;
  volume: number;
  companyId: number;
  registeredById: number;
};

type ProductsPostResponse =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      data: {
        id: number;
        companyId: number;
        registeredById: number;
        name: string;
        packaging: string;
        deposit: number;
        volume: number;
        registeredAt: string;
        active: boolean;
      };
      message: string;
    };

async function getActiveProductsTotal() {
  const res = await fetch("http://localhost:3001/api/products?active=1");

  if (!res.ok) throw new Error("Failed to get active products.");

  const data = (await res.json()) as ProductsGetResponse;

  if (!data.success)
    throw new Error(`Failed to get active products: ${data.error}`);

  return data.pagination.totalItems;
}

async function getPendingProductsTotal() {
  const res = await fetch("http://localhost:3001/api/products?active=0");

  if (!res.ok) throw new Error("Failed to get pending products.");

  const data = (await res.json()) as ProductsGetResponse;

  if (!data.success)
    throw new Error(`Failed to get pending products: ${data.error}`);

  return data.pagination.totalItems;
}

async function getRecentProducts() {
  const res = await fetch(
    "http://localhost:3001/api/products?sort=registeredAt&order=desc&active=1&limit=5"
  );

  if (!res.ok) {
    throw new Error("Failed to get recent products.");
  }

  const data = (await res.json()) as ProductsGetResponse;

  if (!data.success) {
    throw new Error(`Failed to get recent products: ${data.error}`);
  }

  return data.data;
}

async function getProducts(page: number, activeOnly: boolean) {
  const res = await fetch(
    `http://localhost:3001/api/products?page=${page}&limit=50${activeOnly ? "&active=1" : ""}`
  );

  if (!res.ok) throw new Error("Failed to get products.");

  const data = (await res.json()) as ProductsGetResponse;

  if (!data.success) throw new Error(`Failed to get products: ${data.error}`);

  return data;
}

async function addProduct(product: ProductsPostBody) {
  const res = await fetch("http://localhost:3001/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error("Failed to save a new product.");

  const data = (await res.json()) as ProductsPostResponse;

  if (!data.success)
    throw new Error(`Failed to save new product: ${data.error}`);

  return data;
}

export {
  getActiveProductsTotal,
  getPendingProductsTotal,
  getRecentProducts,
  getProducts,
  addProduct,
};
export type { Product, ProductsGetResponse, ProductsPostBody };
