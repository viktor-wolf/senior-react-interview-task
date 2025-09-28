type User = {
  id: number;
  companyId: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
};

type UsersGetResponse =
  | { success: false; error: string }
  | {
      success: true;
      data: User[];
      total: number;
    };

async function getUsersTotal() {
  const res = await fetch("http://localhost:3001/api/users");

  if (!res.ok) throw new Error("Failed to get users.");

  const data = (await res.json()) as UsersGetResponse;

  if (!data.success) throw new Error(`Failed to get users: ${data.error}`);

  return data.total;
}

export { getUsersTotal };
