import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import type { Metadata } from "next";
import { Props } from "./models/Props";
import { Suspense } from "react";
import Loader from "./components/Loader";
import { cookies } from "next/headers";
import { ClientCookiesProvider } from "./components/CookieProvider";

export const metadata: Metadata = {
  title: "GestorUMG",
  description: "GestorUMG",
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="GestorUMG" />
        <meta name="keywords" content="GestorUMG" />
        <meta name="author" content="MR" />
      </head>
      <body className="scrollbarb scrollbarb-overlay">
        <Suspense fallback={<Loader />}>
          <ClientCookiesProvider value={cookies().getAll()}>
            {children}
          </ClientCookiesProvider>
        </Suspense>
      </body>
    </html>
  );
}
