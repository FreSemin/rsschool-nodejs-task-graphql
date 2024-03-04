import { Post, PrismaClient } from '@prisma/client';

export const postLoader = (prisma: PrismaClient) => async (ids: readonly string[]) => {
  const posts = await prisma.post.findMany({
    where: {
      authorId: { in: [...ids] },
    },
  });

  const userPostsMap = new Map<string, Post[]>();

  posts.forEach((post) => {
    const userPosts = userPostsMap.get(post.authorId) || [];

    userPosts.push(post);

    userPostsMap.set(post.authorId, userPosts);
  });

  return ids.map((id) => userPostsMap.get(id));
};
