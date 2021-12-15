import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";

const postsPath = path.join(__dirname, "..", "posts")

export async function getPosts() {
  const dir = await fs.readdir(postsPath);
  return Promise.all(
    dir.map(async filename => {
      const file = await fs.readFile(path.join(postsPath, filename));

      const { attributes } = parseFrontMatter(file.toString());
      invariant(attributes, `${filename} has bad meta data!`)
      return {
        slug: filename.replace(/\.md$/, ""),
        title: attributes.title
      };
    })
  );
}

export async function getPost(slug) {
  const filepath = path.join(postsPath, slug + ".md");
  const file = await fs.readFile(filepath);
  const { attributes } = parseFrontMatter(file.toString());
  invariant(attributes, `Post ${filepath} is missing attributes`);

  return { slug, title: attributes.title };
}