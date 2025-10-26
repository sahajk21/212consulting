"use client";

import { GlareCard } from "@/components/ui/glare-card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { type MotionProps, motion, useScroll, useTransform } from "motion/react";
import { IconFlame, IconRocket, IconSettings, IconCompass, IconGauge, IconPencil } from "@tabler/icons-react";
import { type CSSProperties } from "react";
import { Timeline } from "@/components/ui/timeline";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import CardShowcase from "@/components/ui/card-showcase";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function Home() {
	const howWeHelpCardStyle = { "--glare-min-height": "24rem", "--glare-aspect": "auto" } as CSSProperties;
	const { scrollY } = useScroll();

	const videoPadding = useTransform(scrollY, [0, 300], ["0px", "20px"]);
	const videoBorderRadius = useTransform(scrollY, [0, 300], ["0px", "32px"]);

	const sectionMotionProps: MotionProps = {
		initial: { opacity: 0, y: 48 },
		whileInView: { opacity: 1, y: 0 },
		transition: { duration: 1.2, ease: "easeOut" },
		viewport: { once: true, amount: 0.2 },
	};

	const getStaggerProps = (index: number, delayStep = 0.12): MotionProps => ({
		initial: { opacity: 0, y: 32 },
		whileInView: { opacity: 1, y: 0 },
		transition: { duration: 1, delay: index * delayStep, ease: "easeOut" },
		viewport: { once: true, amount: 0.3 },
	});

	const heroMotionProps: MotionProps = {
		initial: { opacity: 0, y: 40 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 1.4, ease: "easeOut", delay: 0.3 },
	};

	const helpPhases = [
		{
			title: "Ignite",
			subtitle: "Build the Core",
			description: "Structured systems, clean books, and the right tools from day one.",
			image: "/howwehelp/hyperreal_macro_scene_of_water_at_exactly.jpeg",
			iconColor: "text-primary-foreground",
			icon: IconFlame,
		},
		{
			title: "Stabilize",
			subtitle: "Optimize the operations",
			description: "Refine processes, automate routine work, and keep every number in sync.",
			image: "/howwehelp/minimalist_laboratory_workspace_showing_a_precise_gauge.jpeg",
			iconColor: "text-primary-foreground",
			icon: IconSettings,
		},
		{
			title: "Accelerate",
			subtitle: "Scale the momentum",
			description: "Strengthen what's working and extend it across markets and models.",
			image: "/howwehelp/futuristic_control_room_where_superheated_water_bursts.jpeg",
			iconColor: "text-primary-foreground",
			icon: IconRocket,
		},
	];

	const howItWorksTimeline = [
		{
			title: "Discover",
			content: (
				<div className="flex flex-col gap-6 rounded-3xl bg-card p-8 text-left text-card-foreground shadow-xl border border-border">
					<div className="flex h-14 w-14 items-center justify-center rounded-full">
						<IconCompass className="h-8 w-8 text-primary" />
					</div>
					<div className="flex items-start gap-4">
						<div className="space-y-2">
							<p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Clarity comes first</p>
							<p className="text-base text-foreground">We study your business, its rhythm, and the points of friction to surface the truths hiding in plain sight.</p>
						</div>
					</div>
					<p className="text-base font-semibold text-primary">Clarity comes first; every improvement begins with understanding.</p>
				</div>
			),
		},
		{
			title: "Design",
			content: (
				<div className="flex flex-col gap-6 rounded-3xl bg-card p-8 text-left text-card-foreground shadow-xl border border-border">
					<div className="flex h-14 w-14 items-center justify-center rounded-full">
						<IconPencil className="h-8 w-8 text-primary" />
					</div>
					<div className="flex items-start gap-4">
						<div className="space-y-2">
							<p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Structures that scale</p>
							<p className="text-base text-foreground">We craft the systems, dashboards, and operating flows that match your ambition and keep teams in sync.</p>
						</div>
					</div>
					<p className="text-base font-semibold text-primary">Every structure is simple enough to run, strong enough to grow.</p>
				</div>
			),
		},
		{
			title: "Deliver",
			content: (
				<div className="flex flex-col gap-6 rounded-3xl bg-card p-8 text-left text-card-foreground shadow-xl border border-border">
					<div className="flex h-14 w-14 items-center justify-center rounded-full">
						<IconGauge className="h-8 w-8 text-primary" />
					</div>
					<div className="flex items-start gap-4">
						<div className="space-y-2">
							<p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Momentum that lasts</p>
							<p className="text-base text-foreground">We orchestrate launch, tune the system, and stay close until progress is predictable and measurable.</p>
						</div>
					</div>
					<p className="text-base font-semibold text-primary">You get control, consistency, and measurable progress.</p>
				</div>
			),
		},
	];

	const differentiators = [
		{
			title: "Built to last.",
			description: "Systems that outlive people, processes that don't collapse under pressure, numbers that stay clean on their own.",
		},
		{
			title: "Embedded, not external.",
			description: "Work happens inside your business — integrated, continuous, accountable.",
		},
		{
			title: "Finance. Process. Technology.",
			description: "Three disciplines, one rhythm — clarity in numbers, flow in operations, scalability in design.",
		},
		{
			title: "Experience that's done the work.",
			description: "Advisors who've built and run the systems they now implement. No theories, only tested execution.",
		},
		{
			title: "Structure creates freedom.",
			description: "When operations run themselves, founders regain time, focus, and control — the real 212° moment.",
		},
	];

	const testimonialSlides = [
		{
			quote: "Our vendors now thank us for being the fastest to clear payments. We've never been this organized.",
			name: "Managing Partner",
			designation: "Media Agency — 200+ Invoices a Month",
			src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
		},
		{
			quote: "I always assumed tax was a cost of success. 212 proved it's a function of structure.",
			name: "Consultant Doctor",
			designation: "Healthcare Professional — Tax Efficiency Redefined",
			src: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=900&q=80",
		},
		{
			quote: "They know the fine print better than anyone I've worked with.",
			name: "Independent IT Consultant",
			designation: "IT Professional — Smarter Global Investments",
			src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
		},
		{
			quote: "We stopped guessing prices and started growing margins.",
			name: "Owner, Toy Retail Chain",
			designation: "Retail & Manufacturing — Pricing for Profit",
			src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
		},
		{
			quote: "Their guidance lifted returns from 8% to 12% and unlocked ₹6L in rewards within six months.",
			name: "Finance Professional",
			designation: "Personal Investment Planning",
			src: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
		},
	];

	return (
		<>
			<Navbar />
			<section id="home" className="relative min-h-screen w-full overflow-hidden">
				<motion.div
					className="absolute inset-0"
					style={{
						padding: videoPadding,
						borderRadius: videoBorderRadius,
						backgroundColor: "hsl(var(--background))",
					}}
				>
					<motion.div
						className="relative h-full w-full overflow-hidden"
						style={{
							borderRadius: videoBorderRadius,
						}}
					>
						<motion.video autoPlay muted loop playsInline className="h-full w-full object-cover">
							<source src="/hero.mp4" type="video/mp4" />
							Your browser does not support the video tag.
						</motion.video>

						<div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/60" />
					</motion.div>
				</motion.div>

				<div className="relative z-10 flex min-h-screen items-center py-24 w-full">
					<motion.div {...heroMotionProps} className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 text-center text-primary-foreground">
						<div className="flex w-full flex-col items-center space-y-6">
							<h1 className="text-5xl font-bold leading-tight md:text-7xl">Your business should run itself</h1>
							<div className="flex w-full justify-center">
								<TypewriterEffectSmooth className="text-xl font-semibold leading-tight md:text-2xl md:text-4xl" words={[{ text: "We" }, { text: "make" }, { text: "sure" }, { text: "it" }, { text: "does." }]} />
							</div>
						</div>
						<Button asChild size="lg" className="rounded-full px-8 py-6 text-lg md:px-10">
							<Link href="#get-started">Get Started</Link>
						</Button>
					</motion.div>
				</div>
			</section>

			<main>
				<motion.section {...sectionMotionProps} id="how-we-help" className="py-32 md:py-40">
					<div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 text-center">
						<div className="space-y-6">
							<h2 className="text-4xl font-bold text-foreground md:text-5xl">How We Help</h2>
							<p className="mx-auto max-w-3xl text-xl text-muted-foreground">Three phases to build, optimize, and scale your business operations</p>
						</div>
						<div className="grid gap-8 md:grid-cols-3">
							{helpPhases.map((phase, index) => (
								<motion.div key={phase.title} {...getStaggerProps(index)} className="flex">
									<GlareCard containerClassName="w-full" containerStyle={howWeHelpCardStyle} className="relative flex h-full w-full flex-col items-start justify-between gap-10 overflow-hidden bg-black/60 p-10 text-left">
										<div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: `url(${phase.image})` }} />
										<div className="flex items-center justify-center rounded-2xl text-primary">
											<phase.icon className={cn("h-8 w-8", phase.iconColor)} />
										</div>
										<div className="space-y-3 text-primary-foreground">
											<p className="text-sm font-semibold uppercase tracking-widest text-muted">{phase.subtitle}</p>
											<h3 className="text-4xl font-semibold">{phase.title}</h3>
										</div>
										<p className="text-sm text-muted">{phase.description}</p>
									</GlareCard>
								</motion.div>
							))}
						</div>
					</div>
				</motion.section>

				<motion.section {...sectionMotionProps} id="how-it-works" className="py-32 md:py-40">
					<div className="mx-auto flex max-w-6xl flex-col gap-20 px-6">
						<div className="space-y-6 text-center">
							<h2 className="text-4xl font-bold text-foreground md:text-5xl">How It Works</h2>
							<p className="mx-auto max-w-3xl text-xl text-muted-foreground">Three steps to transform your business from reactive to proactive</p>
						</div>
						<motion.div {...getStaggerProps(0)} className="w-full">
							<Timeline data={howItWorksTimeline} />
						</motion.div>
					</div>
				</motion.section>

				<motion.section {...sectionMotionProps} id="why-212" className="py-32 md:py-40">
					<div className="mx-auto flex max-w-7xl flex-col gap-20 px-6">
						<div className="space-y-6 text-center">
							<h2 className="text-4xl font-bold text-foreground md:text-5xl">Why 212 Consulting</h2>
							<p className="mx-auto max-w-3xl text-xl text-muted-foreground">Experience that delivers. Systems that last. Results that scale.</p>
						</div>
						<div className="h-full w-full">
							<CardShowcase
								cards={differentiators.map((item, index) => {
									// Map differentiators to corresponding video assets in /public/why212
									const videoMap: Record<string, string> = {
										"Built to last.": "/why212/ultra_detailed_macro_of_water_at_a_controlled.mp4",
										"Embedded, not external.": "/why212/cross_sectional_architectural_visualization_of_water_seamlessly_flowing.mp4",
										"Finance. Process. Technology.": "/why212/unified_composition_showing_three_continuous_states_still.mp4",
										"Experience that's done the work.": "/why212/close_up_of_a_tempered_glass_surface_with.mp4",
										"Structure creates freedom.": "/why212/geometric_patterned_water_surface_emitting_perfectly_aligned.mp4",
									};
									return {
										number: `0${index + 1}`,
										title: item.title,
										description: item.description,
										tag: item.title.split(".")[0],
										video: { src: videoMap[item.title], type: "video/mp4" },
									};
								})}
								progressBarClass="bg-black/10"
								progressFillClass="bg-primary"
								animationSpeed={4}
								loop
								textClass="text-foreground"
								tagClass="text-secondary-foreground"
								imageRadius={16}
								padding={0}
								contentImageGap={16}
							/>
						</div>
					</div>
				</motion.section>

				<motion.section {...sectionMotionProps} id="testimonials" className="py-32 md:py-40">
					<div className="mx-auto flex max-w-6xl flex-col gap-16 px-6">
						<div className="space-y-6 text-center">
							<h2 className="text-4xl font-bold text-foreground md:text-5xl">Client Testimonials</h2>
							<div className="space-y-4">
								<p className="mx-auto max-w-3xl text-xl text-muted-foreground">Real results. Real businesses. Real change.</p>
								<p className="text-lg text-muted-foreground">Structured systems don&apos;t just look good — they perform.</p>
							</div>
						</div>
						<motion.div {...getStaggerProps(0)}>
							<AnimatedTestimonials testimonials={testimonialSlides} autoplay />
						</motion.div>
						<motion.div {...getStaggerProps(1)} className="text-center">
							<p className="text-2xl font-semibold text-foreground">Numbers tell stories. These tell ours.</p>
						</motion.div>
						<motion.div {...getStaggerProps(2)} className="text-center">
							<Button asChild size="lg" className="rounded-full px-8 py-6 text-lg md:px-10">
								<Link href="#get-started">Start Now</Link>
							</Button>
						</motion.div>
					</div>
				</motion.section>

				<motion.section {...sectionMotionProps} id="get-started" className="py-32 md:py-40">
					<div className="mx-auto flex max-w-4xl flex-col gap-12 px-6">
						<div className="space-y-6 text-center">
							<h2 className="text-4xl font-bold text-foreground md:text-5xl">Get Started</h2>
							<p className="mx-auto max-w-2xl text-lg text-muted-foreground">Share a few details and we&apos;ll reach out with a structured path to your self-running operations.</p>
						</div>
						<div className="mx-auto w-full rounded-3xl">
							<iframe aria-label="Contact @ 2Twelve Consulting" src="https://forms.zohopublic.in/aniket212con1/form/ContactUs/formperma/zCUB4pOYtkP_IQklvsQ0iO0HM-ctGnhcDwFey-T8LJ8" className="h-[1000px] w-full rounded-xl border-none" frameBorder="0" />
						</div>
					</div>
				</motion.section>
			</main>
			<Footer />
		</>
	);
}
