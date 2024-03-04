import { PrismaClient, Profile } from '@prisma/client';

export const profileLoader = (prisma: PrismaClient) => async (ids: readonly string[]) => {
  const profiles = await prisma.profile.findMany({
    where: {
      userId: { in: [...ids] },
    },
  });

  const profilesMap = new Map<string, Profile>();

  profiles.forEach((profile) => profilesMap.set(profile.userId, profile));

  return ids.map((id) => profilesMap.get(id));
};
