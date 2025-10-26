"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useEffect } from "react";

type Word = { text: string; className?: string };

interface TypewriterSharedProps {
	words: Word[];
	className?: string;
	cursorClassName?: string;
}

export const TypewriterEffect = ({ words, className, cursorClassName }: TypewriterSharedProps) => {
	const wordsArray = words.map((word) => ({ ...word, text: word.text.split("") }));
	const [scope, animate] = useAnimate();
	const isInView = useInView(scope);

	useEffect(() => {
		if (isInView) {
			animate("span", { display: "inline-block", opacity: 1, width: "fit-content" }, { duration: 0.3, delay: stagger(0.1), ease: "easeInOut" });
		}
	}, [isInView, animate]);

	return (
		<div className={cn("text-base sm:text-xl md:text-3xl lg:text-5xl font-semibold text-center", className)}>
			<motion.div ref={scope} className="inline">
				{wordsArray.map((word, idx) => (
					<div key={`word-${idx}`} className="inline-block">
						{word.text.map((char, index) => (
							<motion.span initial={{}} key={`char-${index}`} className={cn("opacity-0 hidden", word.className)}>
								{char}
							</motion.span>
						))}
						&nbsp;
					</div>
				))}
			</motion.div>
			<motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }} className={cn("inline-block rounded-sm w-1 h-8 md:h-10 lg:h-12 bg-blue-500", cursorClassName)} />
		</div>
	);
};

export const TypewriterEffectSmooth = ({ words, className, cursorClassName }: TypewriterSharedProps) => {
	const wordsArray = words.map((word) => ({ ...word, text: word.text.split("") }));
	return (
		<div className={cn("flex items-center justify-center space-x-1", className)}>
			<motion.div className="overflow-hidden" initial={{ width: "0%" }} whileInView={{ width: "fit-content" }} transition={{ duration: 2, ease: "linear", delay: 1 }} viewport={{ once: true }}>
				<div className="font-semibold leading-tight text-center" style={{ whiteSpace: "nowrap" }}>
					{wordsArray.map((word, idx) => (
						<div key={`word-${idx}`} className="inline-block">
							{word.text.map((char, index) => (
								<span key={`char-${index}`} className={cn(word.className)}>
									{char}
								</span>
							))}
							&nbsp;
						</div>
					))}
				</div>
			</motion.div>
			<motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }} className={cn("block shrink-0 rounded-sm w-1 h-8 md:h-10 lg:h-12 bg-primary-foreground", cursorClassName)} />
		</div>
	);
};
