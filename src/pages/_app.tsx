import Navbar from "@/components/Navbar";
import MaxWidthLayout from "@/layouts/MaxWidthLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";


const links = [
  {
    label: "Test1",
    route: "/get-user"
  },
];

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <MaxWidthLayout>
      <Component {...pageProps} />
    </MaxWidthLayout>
  )
}
