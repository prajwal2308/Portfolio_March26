import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prajwal Srinivas | Full-Stack Cloud Developer",
  description: "Full-Stack Cloud Developer & MSCS Graduate at Rutgers. Co-Founder & CTO of Beunec. Building high-availability AI platforms and secure cloud infrastructure.",
  keywords: ["Full-Stack Developer", "Cloud Architect", "AI Engineer", "Next.js", "AWS", "GCP", "Rutgers"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="noise-overlay antialiased">
        {children}
      </body>
    </html>
  );
}
