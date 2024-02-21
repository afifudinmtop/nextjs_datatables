import "./globals.css";

export const metadata = {
  title: "NextJs DataTables",
  description: "Generated by Afifudin Maarif",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}