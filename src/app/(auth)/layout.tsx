import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { name: "Register", href: "/register" },
    { name: "Login", href: "/login" },
    { name: "Forgot Password", href: "/forgotPassword" }
];

export default function AuthLayout({
  children,
}: { children: React.ReactNode }) {
    const pathname = usePathname() ; 
  return (
    <div>
      {navLinks.map((navLink) => (
        <Link href={navLink.href} key={navLink.name}>
          {navLink.name}
        </Link>
      ))}
      {children}
    </div>
  );
}
