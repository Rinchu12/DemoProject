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

export type AuthStackParamList = {
  Login: undefined;
  Post: undefined;
  Comments: { id?: number | null; type: CommentScreenType };
};

export type AppStackParamList = {
  Home: undefined;
  Profile: undefined;
};

export enum CommentScreenType {
  Post,
  PostComments,
  PostIdComments,
}

export interface LoginResponse {
  status: string; // "success"
  data: LoginData;
  message: string;
  technicalDetails: TechnicalDetails;
}

export interface LoginData {
  userData: UserData;
  accessToken: string;
  refreshToken: string;
  expiresIn: string; // "7d"
}

export interface UserData {
  uuid?: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  verified?: boolean;
  role?: number;
  profilePic?: string | null;
  authProvider?: number;
}

export interface TechnicalDetails {}

export interface ProfileResponse {
  status: string; // "success"
  data: UserData;
  message: string;
  technicalDetails: TechnicalDetails;
}
export interface LoginDataProps {
  email: string;
  password: string;
  showPassword: boolean;
  emailError?: string | null;
  passwordError?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}
