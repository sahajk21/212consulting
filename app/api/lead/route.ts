import { google } from "googleapis";
import type { LeadPayload, LeadResponse } from "@/types/interfaces";

// Append a row to the configured Google Sheet.
export async function POST(req: Request): Promise<Response> {
	try {
		const body = (await req.json()) as Partial<LeadPayload>;
		if (!body.name || !body.email) {
			return new Response(JSON.stringify({ success: false, error: "Name and Email are required" satisfies string }), { status: 400 });
		}

		const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
		let key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
		const sheetId = process.env.GOOGLE_SHEET_ID;
		if (!email || !key || !sheetId) {
			return new Response(JSON.stringify({ success: false, error: "Missing Google Sheets credentials" }), { status: 500 });
		}

		// Private key may contain escaped newlines when stored in env.
		key = key.replace(/\\n/g, "\n");

		const auth = new google.auth.GoogleAuth({
			credentials: {
				client_email: email,
				private_key: key,
			},
			scopes: ["https://www.googleapis.com/auth/spreadsheets"],
		});
		// Use GoogleAuth directly; client retrieval not needed for sheets instance.
		const sheets = google.sheets({ version: "v4", auth });

		const values = [[new Date().toISOString(), body.name, body.email, body.company || "", body.message || ""]];

		await sheets.spreadsheets.values.append({
			spreadsheetId: sheetId,
			range: "Leads!A:E",
			valueInputOption: "USER_ENTERED",
			requestBody: { values },
		});

		const res: LeadResponse = { success: true };
		return new Response(JSON.stringify(res), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ success: false, error: err instanceof Error ? err.message : "Unknown error" } satisfies LeadResponse), { status: 500 });
	}
}
