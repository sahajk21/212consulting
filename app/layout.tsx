import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ClarityProvider } from "@/components/clarity-provider";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
	title: "2Twelve Consulting",
	description: "Consulting services to help your business thrive in the digital age.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={montserrat.variable}>
			<body>
				<ClarityProvider />
				{children}
			</body>
		</html>
	);
}
