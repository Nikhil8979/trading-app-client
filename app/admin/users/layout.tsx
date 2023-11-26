import SidebarCompany from "@/components/layouts/sidebar";
import Header from "../../../components/layouts/header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <SidebarCompany />
        <div>{children}</div>
      </body>
    </html>
  );
}
