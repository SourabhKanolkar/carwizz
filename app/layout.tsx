import Head from "next/head";
import "./globals.css";

import { Footer, NavBar } from "@components";

export const metadata = {
  title: "Car Hub",
  description: "Discover world's best car showcase application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
      </Head>
      <body className='relative'>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
