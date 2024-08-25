import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Params = {
  id: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const { id } = context.params;
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  if (!secret) {
    return new Response("Please provide a secret", {
      status: 400,
    });
  }

  cookies().set("secret", secret, {
    path: `/memories/${id}`,
  });

  redirect(`/memories/${id}`);
}
