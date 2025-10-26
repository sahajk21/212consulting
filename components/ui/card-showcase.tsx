"use client";

import { useState, useEffect, useRef, startTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { type CardShowcaseProps, type CardData } from "@/types/interfaces";

export default function CardShowcase({ cards, progressBarClass = "bg-black/10", progressFillClass = "bg-primary", animationSpeed = 4, loop = true, textClass = "text-foreground", tagClass = "text-primary", imageRadius = 8, padding = 40, contentImageGap = 16 }: CardShowcaseProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [progress, setProgress] = useState(0);
	const [isMobile, setIsMobile] = useState(false);
	const [isInView, setIsInView] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const progressIntervalRef = useRef<number | null>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const checkMobile = () => {
			startTransition(() => {
				setIsMobile(window.innerWidth < 768);
			});
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	useEffect(() => {
		if (typeof window === "undefined" || !containerRef.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsInView(true);
					}
				});
			},
			{ threshold: 0.3 }
		);

		observer.observe(containerRef.current);

		return () => {
			if (containerRef.current) {
				observer.unobserve(containerRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (isMobile || !isInView) return;

		const interval = 16;
		const increment = (100 / (animationSpeed * 1000)) * interval;

		if (progressIntervalRef.current) {
			clearInterval(progressIntervalRef.current);
		}

		progressIntervalRef.current = window.setInterval(() => {
			setProgress((prev) => {
				const newProgress = prev + increment;
				if (newProgress >= 100) {
					const nextIndex = activeIndex + 1;
					if (nextIndex >= cards.length) {
						if (loop) {
							startTransition(() => {
								setActiveIndex(0);
							});
							return 0;
						} else {
							if (progressIntervalRef.current) {
								clearInterval(progressIntervalRef.current);
							}
							return 100;
						}
					} else {
						startTransition(() => {
							setActiveIndex(nextIndex);
						});
						return 0;
					}
				}
				return newProgress;
			});
		}, interval);

		return () => {
			if (progressIntervalRef.current) {
				clearInterval(progressIntervalRef.current);
			}
		};
	}, [activeIndex, animationSpeed, cards.length, loop, isMobile, isInView]);

	const handleCardClick = (index: number) => {
		if (isMobile) return;
		startTransition(() => {
			setActiveIndex(index);
			setProgress(0);
		});
	};

	// Map pixel gap values to Tailwind spacing scale
	const gapClass = (() => {
		const scaleMap: Record<number, string> = {
			4: "gap-1",
			8: "gap-2",
			12: "gap-3",
			16: "gap-4",
			20: "gap-5",
			24: "gap-6",
			28: "gap-7",
			32: "gap-8",
			36: "gap-9",
			40: "gap-10",
		};
		return scaleMap[contentImageGap] || "gap-4";
	})();

	// Map image radius to Tailwind rounded classes
	const radiusClass = (() => {
		const radiusMap: Record<number, string> = {
			0: "rounded-none",
			4: "rounded",
			8: "rounded-md",
			12: "rounded-lg",
			16: "rounded-xl",
			24: "rounded-2xl",
			32: "rounded-3xl",
		};
		return radiusMap[imageRadius] || "rounded-md"; // default maps 8 -> rounded-md
	})();

	if (isMobile) {
		return (
			<div ref={containerRef} style={{ padding: `${padding}px` }} className="hide-scrollbar flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
				<style>{`
					.hide-scrollbar::-webkit-scrollbar { display: none; }
					.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
				`}</style>
				<div className={cn("flex min-h-full flex-1 flex-col", gapClass)}>
					{cards.map((card: CardData, index) => {
						const cardImage = card.image || { src: "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg", alt: "Default image" };
						const cardVideo = card.video; // optional video
						return (
							<div key={index} className={cn("flex h-full flex-col", gapClass)}>
								<div className={cn("relative flex h-52 w-full overflow-hidden", radiusClass)}>
									{cardVideo ? (
										<video src={cardVideo.src} poster={cardVideo.poster} className={cn("h-full w-full object-cover", radiusClass)} autoPlay muted loop playsInline />
									) : (
										<img src={cardImage.src} alt={cardImage.alt} className={cn("h-full w-full object-cover", radiusClass)} />
									)}
									<div className="absolute inset-0 flex items-end bg-linear-to-t from-black/70 to-transparent p-4">
										<div className={cn("text-lg font-semibold text-primary-foreground")}>{card.title}</div>
									</div>
								</div>
								<div className={cn("text-sm font-medium opacity-80 pb-12", textClass)}>{card.description}</div>
								{card.tag && <div className={cn("hidden md:block text-sm font-medium", tagClass)}>{card.tag}</div>}
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	return (
		<div ref={containerRef} style={{ padding: `${padding}px` }} className="hide-scrollbar flex min-h-0 h-full w-full flex-1 items-center justify-center overflow-hidden">
			<style>{`
				.hide-scrollbar::-webkit-scrollbar { display: none; }
				.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
			`}</style>
			<div className={cn("flex h-full w-full max-w-[1200px] items-stretch", gapClass)}>
				{cards.map((card: CardData, index) => {
					const isActive = index === activeIndex;
					const cardImage = card.image || { src: "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg", alt: "Default image" };
					const cardVideo = card.video;
					return (
						<motion.div key={index} onClick={() => handleCardClick(index)} animate={{ flex: isActive ? 2 : 1 }} transition={{ duration: 0.5, ease: "easeInOut" }} className={cn("relative flex cursor-pointer flex-col overflow-hidden p-6", gapClass)}>
							<div className={cn("absolute bottom-0 left-0 h-full w-0.5", progressBarClass)}>{isActive && <motion.div className={cn("absolute bottom-0 left-0 w-full", progressFillClass)} animate={{ height: `${progress}%` }} transition={{ duration: 0 }} />}</div>
							<div className={cn("relative w-full aspect-square overflow-hidden", radiusClass)}>
								{cardVideo ? <video src={cardVideo.src} poster={cardVideo.poster} className={cn("h-full w-full object-cover", radiusClass)} autoPlay muted loop playsInline /> : <img src={cardImage.src} alt={cardImage.alt} className={cn("h-full w-full object-cover", radiusClass)} />}
								{isActive && (
									<div className={cn("absolute inset-0 flex items-end bg-linear-to-t from-black/70 to-transparent p-4")}>
										<div className={cn("text-lg font-semibold text-primary-foreground")}>{card.title}</div>
									</div>
								)}
							</div>
							{!isActive && card.tag && <div className={cn("text-sm font-medium", tagClass)}>{card.tag}</div>}
							<AnimatePresence>
								{isActive && (
									<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className={cn("flex h-full min-h-0 flex-1 flex-col justify-between", gapClass)}>
										<div className={cn("text-sm font-medium opacity-80", textClass)}>{card.description}</div>
										{card.tag && <div className={cn("text-sm font-medium", tagClass)}>{card.tag}</div>}
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
