import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REMOTE_API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiAdminClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REMOTE_API_HOST,
  headers: {
    "Content-Type": "application/json",
    Authorization: `bearer ${process.env.ADMIN_JWT},`,
  },
});
