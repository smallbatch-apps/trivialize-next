"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Readonly<Props>) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
