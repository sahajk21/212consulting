"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export function ClarityProvider() {
	useEffect(() => {
		Clarity.init("uoeztlsdx2");
	}, []);

	return null;
}
