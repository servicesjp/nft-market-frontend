export interface IReview {
  id: string;
  rate: number;
  title?: string;
  createdAt: string;
  description: string;
  user: {
    id: string;
    username: string;
    avatarId: string;
    avatarUrl: string;
  };
}