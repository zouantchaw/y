import { useLoaderData } from "remix";
import { getPost } from "../../post";
import invariant from "tiny-invariant";

export const loader = async ({ params }) => {
  return getPost(params.slug);
}

export default function PostSlug() {
  const post = useLoaderData();
  console.log("here")
  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  );
}