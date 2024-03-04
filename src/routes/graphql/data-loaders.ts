import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { profileLoader } from './entities/profile/profile.loader.js';
import { postLoader } from './entities/post/post.loader.js';
import { memberTypeLoader } from './entities/member-types/member-type.loader.js';
import {
  subscribedToUserLoader,
  userSubscribedToLoader,
} from './entities/user/user.loader.js';

export const DataLoaders = (prisma: PrismaClient) => ({
  profileLoader: new DataLoader(profileLoader(prisma)),

  postLoader: new DataLoader(postLoader(prisma)),

  memberTypeLoader: new DataLoader(memberTypeLoader(prisma)),

  userSubscribedToLoader: new DataLoader(userSubscribedToLoader(prisma)),

  subscribedToUserLoader: new DataLoader(subscribedToUserLoader(prisma)),
});
