export type WithId = {
  id: string;
};

export type InputDto<T> = {
  dto: T;
};

export type UserId = {
  userId: string;
};

export type AuthorId = {
  authorId: string;
};

export type UserSubscription = UserId & AuthorId;
