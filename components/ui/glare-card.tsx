"use client";

import { cn } from "@/lib/utils";
import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";

type GlareCardProps = {
	children: ReactNode;
	className?: string;
	containerClassName?: string;
	containerStyle?: CSSProperties;
};

type GlareCardState = {
	glare: {
		x: number;
		y: number;
	};
	background: {
		x: number;
		y: number;
	};
	rotate: {
		x: number;
		y: number;
	};
};

const backgroundStyle: Record<string, string> = {
	"--step": "5%",
	"--foil-svg":
		"url(\"data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.99994 3.419C2.99994 3.419 21.6142 7.43646 22.7921 12.153C23.97 16.8695 3.41838 23.0306 3.41838 23.0306' stroke='white' stroke-width='5' stroke-miterlimit='3.86874' stroke-linecap='round' style='mix-blend-mode:darken'/%3E%3C/svg%3E\")",
	"--pattern": "var(--foil-svg) center/100% no-repeat",
	"--rainbow":
		"repeating-linear-gradient(0deg, rgb(255 119 115) calc(var(--step) * 1), rgba(255 237 95 / 1) calc(var(--step) * 2), rgba(168 255 95 / 1) calc(var(--step) * 3), rgba(131 255 247 / 1) calc(var(--step) * 4), rgba(120 148 255 / 1) calc(var(--step) * 5), rgb(216 117 255) calc(var(--step) * 6), rgb(255 119 115) calc(var(--step) * 7)) 0% var(--bg-y)/200% 700% no-repeat",
	"--diagonal": "repeating-linear-gradient(128deg, #0e152e 0%, hsl(180 10% 60%) 3.8%, hsl(180 10% 60%) 4.5%, hsl(180 10% 60%) 5.2%, #0e152e 10%, #0e152e 12%) var(--bg-x) var(--bg-y)/300% no-repeat",
	"--shade": "radial-gradient(farthest-corner circle at var(--m-x) var(--m-y), rgba(255 255 255 / 0.1) 12%, rgba(255 255 255 / 0.15) 20%, rgba(255 255 255 / 0.25) 120%) var(--bg-x) var(--bg-y)/300% no-repeat",
	backgroundBlendMode: "hue, hue, hue, overlay",
};

export function GlareCard({ children, className, containerClassName, containerStyle }: GlareCardProps) {
	const isPointerInside = useRef(false);
	const refElement = useRef<HTMLDivElement>(null);
	const state = useRef<GlareCardState>({
		glare: { x: 50, y: 50 },
		background: { x: 50, y: 50 },
		rotate: { x: 0, y: 0 },
	});

	const updateStyles = () => {
		if (!refElement.current) {
			return;
		}

		const { background, rotate, glare } = state.current;
		refElement.current.style.setProperty("--m-x", `${glare.x}%`);
		refElement.current.style.setProperty("--m-y", `${glare.y}%`);
		refElement.current.style.setProperty("--r-x", `${rotate.x}deg`);
		refElement.current.style.setProperty("--r-y", `${rotate.y}deg`);
		refElement.current.style.setProperty("--bg-x", `${background.x}%`);
		refElement.current.style.setProperty("--bg-y", `${background.y}%`);
	};

	const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
		const rotateFactor = 0.4;
		const rect = event.currentTarget.getBoundingClientRect();
		const position = {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top,
		};
		const percentage = {
			x: (100 / rect.width) * position.x,
			y: (100 / rect.height) * position.y,
		};
		const delta = {
			x: percentage.x - 50,
			y: percentage.y - 50,
		};

		const { background, rotate, glare } = state.current;
		background.x = 50 + percentage.x / 4 - 12.5;
		background.y = 50 + percentage.y / 3 - 16.67;
		rotate.x = -(delta.x / 3.5) * rotateFactor;
		rotate.y = (delta.y / 2) * rotateFactor;
		glare.x = percentage.x;
		glare.y = percentage.y;

		updateStyles();
	};

	const handlePointerEnter = () => {
		isPointerInside.current = true;
		if (!refElement.current) {
			return;
		}

		window.setTimeout(() => {
			if (isPointerInside.current) {
				refElement.current?.style.setProperty("--duration", "0s");
				refElement.current?.style.setProperty("--opacity", "0.6");
				refElement.current?.style.setProperty("--easing", "linear");
			}
		}, 300);
	};

	const handlePointerLeave = () => {
		isPointerInside.current = false;
		if (!refElement.current) {
			return;
		}

		refElement.current.style.removeProperty("--duration");
		refElement.current.style.removeProperty("--opacity");
		refElement.current.style.removeProperty("--easing");
		refElement.current.style.setProperty("--r-x", "0deg");
		refElement.current.style.setProperty("--r-y", "0deg");
	};

	return (
		<div className={cn("glare-card-container", containerClassName)} ref={refElement} style={containerStyle} onPointerMove={handlePointerMove} onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave}>
			<div className="glare-card-inner">
				<div className="glare-card-surface">
					<div className={cn("flex h-full w-full bg-card", className)}>{children}</div>
				</div>
				<div className="glare-card-glow" />
				<div className="glare-card-foil" style={backgroundStyle as CSSProperties} />
			</div>
		</div>
	);
}

export default GlareCard;
