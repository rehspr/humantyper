import { signIn } from "next-auth/react";

export default function Home() {
return (
<div className="flex flex-col items-center justify-center min-h-screen p-4">
<h1 className="text-4xl font-bold mb-8">Human Typer</h1>
<button
className="bg-blue-600 text-white px-6 py-3 rounded"
onClick={() => signIn("google")}
>
Login with Google
</button>
</div>
);
}