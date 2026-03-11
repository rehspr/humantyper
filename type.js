import { google } from "googleapis";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
if (!token) return res.status(401).json({ error: "Unauthorized" });

const auth = new google.auth.OAuth2();
auth.setCredentials({ access_token: token.accessToken });

const drive = google.drive({ version: "v3", auth });

const files = await drive.files.list({
q: "mimeType='application/vnd.google-apps.document'",
fields: "files(id,name)",
});

res.json(files.data.files);
}