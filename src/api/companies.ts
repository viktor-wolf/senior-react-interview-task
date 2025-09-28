type Company = {
  id: number;
  name: string;
  registeredAt: string;
};

type CompaniesGetResponse =
  | { success: false; error: string }
  | {
      success: true;
      data: Company[];
      total: number;
    };

async function getCompaniesTotal() {
  const res = await fetch("http://localhost:3001/api/companies");

  if (!res.ok) throw new Error("Failed to get companies.");

  const data = (await res.json()) as CompaniesGetResponse;

  if (!data.success) throw new Error(`Failed to get companies: ${data.error}`);

  return data.total;
}

export { getCompaniesTotal };
