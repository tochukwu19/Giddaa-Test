"use client"

import "./globals.css";
import ReactQueryProvider from "./context/ReactQueryProvider";
import { ToastProvider } from "@/app/components/ui/toast/Toast";
import { ToastContainer } from "@/app/components/ui/toast/ToastContainer";
import { usePathname } from "next/navigation";
import { Sidebar } from "./components/sidebar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();

  const shouldShowSidebar = !["/login", "/"].includes(pathname);

  return (
    <ReactQueryProvider>
      <ToastProvider>
        <html lang="en">
          <body className="grid grid-cols-[auto_1fr] min-h-screen">
            <ToastContainer />
            {shouldShowSidebar && <Sidebar className="z-[5] hidden lg:flex fixed col-start-1 col-end-2 h-full w-70 bg-[#335F32] text-white flex-col" />}
            <main className={`ml-0 ${shouldShowSidebar ? "lg:ml-[16.5rem]" : ""} col-start-2 col-end-3`}>
              {children}
            </main>
          </body>
        </html>
      </ToastProvider>
    </ReactQueryProvider>
  );
}
