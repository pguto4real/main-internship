import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

function TanstackProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
   <QueryClientProvider client={queryClient}>
  
   {children}
   </QueryClientProvider>
  )
}

export default TanstackProvider;
// <QueryClientProvider client = { queryClient } > </QueryClientProvider>