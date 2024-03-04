import { MemberType, PrismaClient } from '@prisma/client';

export const memberTypeLoader =
  (prisma: PrismaClient) => async (ids: readonly string[]) => {
    const memberTypes = await prisma.memberType.findMany({
      where: {
        id: { in: [...ids] },
      },
    });

    const memberTypesMap = new Map<string, MemberType>();

    memberTypes.forEach((memberType) => memberTypesMap.set(memberType.id, memberType));

    return ids.map((id) => memberTypesMap.get(id));
  };
