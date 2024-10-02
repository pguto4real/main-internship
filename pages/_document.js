import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
 
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased bg-white">
       
        <Main />
          <NextScript />
       
      </body>
    </Html>
  );
}
