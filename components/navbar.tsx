"use client";

import Image from "next/image";
import Link from "next/link";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl p-4">
			<div className="bg-background/70 backdrop-blur-md rounded-4xl md:rounded-full shadow-md px-6 py-3">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link href="/" className="flex items-center">
						<Image src="/logo/212.png" alt="212 Consulting" width={120} height={40} className="h-12 w-auto" />
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-8">
						<NavigationMenu>
							<NavigationMenuList className="gap-2">
								<NavigationMenuItem>
									<NavigationMenuLink asChild>
										<Link href="#how-we-help" className="px-4 py-2 hover:bg-accent rounded-md transition-colors">
											How We Help
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuLink asChild>
										<Link href="#how-it-works" className="px-4 py-2 hover:bg-accent rounded-md transition-colors">
											How It Works
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuLink asChild>
										<Link href="#why-212" className="px-4 py-2 hover:bg-accent rounded-md transition-colors">
											Why 212
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuLink asChild>
										<Link href="#testimonials" className="px-4 py-2 hover:bg-accent rounded-md transition-colors">
											Testimonials
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>
					<Button asChild className="hidden md:block rounded-full">
						<Link href="#get-started">Get Started</Link>
					</Button>

					{/* Mobile Menu Button */}
					<Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
						{isOpen ? <IconX className="h-4 w-4" /> : <IconMenu2 className="h-4 w-4" />}
					</Button>
				</div>

				{/* Mobile Navigation */}
				<div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "opacity-100" : "max-h-0 opacity-0"}`}>
					<div className="mt-4 pt-4">
						<div className="flex flex-col gap-3">
							<Link href="#home" className="py-2 hover:bg-accent rounded-md transition-colors transform hover:scale-105" onClick={() => setIsOpen(false)}>
								Home
							</Link>
							<Link href="#how-we-help" className="py-2 hover:bg-accent rounded-md transition-colors transform hover:scale-105" onClick={() => setIsOpen(false)}>
								How We Help
							</Link>
							<Link href="#how-it-works" className="py-2 hover:bg-accent rounded-md transition-colors transform hover:scale-105" onClick={() => setIsOpen(false)}>
								How It Works
							</Link>
							<Link href="#why-212" className="py-2 hover:bg-accent rounded-md transition-colors transform hover:scale-105" onClick={() => setIsOpen(false)}>
								Why 212
							</Link>
							<Link href="#testimonials" className="py-2 hover:bg-accent rounded-md transition-colors transform hover:scale-105" onClick={() => setIsOpen(false)}>
								Testimonials
							</Link>
							<Button asChild className="rounded-full mx-4 mt-2 mb-4" onClick={() => setIsOpen(false)}>
								<Link href="/get-started">Get Started</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
