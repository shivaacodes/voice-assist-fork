import { Urbanist, Poppins } from "next/font/google";
import "./globals.css";

const poppinsFont = Poppins({
  weight: ["400", "900", "700", "500"],
  subsets: ["latin"],
  display: "optional",
  variable: "--font-poppins",
});

const urbanistFont = Urbanist({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist",
});

export const metadata = {
  title: "test",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${urbanistFont.variable} ${poppinsFont.variable} antialiased relative`}
      >
        <div className="fixed inset-0 w-full h-full -z-10 bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>

        {children}
      </body>
    </html>
  );
}
