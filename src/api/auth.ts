import api from "./axios";

export const loginAdmin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};
