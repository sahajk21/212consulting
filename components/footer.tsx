export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full border-t border-border bg-background py-8">
			<div className="mx-auto max-w-7xl px-6">
				<div className="flex flex-col items-center justify-center gap-4 text-center">
					<p className="text-sm text-muted-foreground">© {currentYear} 2Twelve Consulting. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
