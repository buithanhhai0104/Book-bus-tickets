import { UserProvider } from "@/context/authContext";
import { TripsProvider } from "@/context/tripsContext";
import "./globals.css";
import Header from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TripsProvider>
        <UserProvider>
          <body>
            <Header />
            {children}
          </body>
        </UserProvider>
      </TripsProvider>
    </html>
  );
}
