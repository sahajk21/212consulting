export interface CardImage {
	src: string;
	alt: string;
}

export interface CardVideo {
	src: string; // path to video asset in public folder
	type?: string; // e.g. "video/mp4"
	poster?: string; // optional poster image
}

export interface CardData {
	number: string;
	title: string;
	description: string;
	image?: CardImage;
	video?: CardVideo; // optional video instead of image
	tag?: string;
}

// Color props now expect Tailwind class names (e.g., "text-foreground", "bg-primary") instead of raw color strings.
export interface CardShowcaseProps {
	cards: CardData[];
	progressBarClass?: string; // vertical progress bar background
	progressFillClass?: string; // active progress fill color
	animationSpeed?: number;
	loop?: boolean;
	textClass?: string;
	tagClass?: string;
	imageRadius?: number; // still numeric for border-radius
	padding?: number; // container padding in px
	contentImageGap?: number; // gap between text and image
}

// Lead form payload submitted from client
export interface LeadPayload {
	name: string;
	email: string;
	company?: string;
	message?: string;
}

// API response shape for lead submission
export interface LeadResponse {
	success: boolean;
	error?: string;
}
