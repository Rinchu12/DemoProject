export interface ListItemType {
  id: string;
  name: string;
  isCompleted: boolean;
}

export interface PostsType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface CommentsDataType {
  userId?: number;
  postId?: number;
  id?: number;
  name?: string;
  email?: string;
  body?: string;
  title?: string;
  completed?: boolean;
}

export type RootStackParamList = {
  Post: undefined;
  Comments: { id?: number | null; type: CommentScreenType };
};

export enum CommentScreenType {
  Post,
  PostComments,
  PostIdComments,
}
