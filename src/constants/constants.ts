export const STORAGE_KEY = 'storage_key';

//ENDPOINTS

export const ENDPOINTS = {
  LOGIN: 'login',
  PROFILE: 'me',
  REFRESH_TOKEN: 'token/renew',
  LOGOUT: 'logout',
  POSTS: 'posts',
  USER_POST: (id: number | null) => `posts/${id}`,
  POST_COMMENTS: (id: number | null) => `posts/${id}/comments`,
  COMMENTS_POSTID: (postId: number | null) => `/comments?postId=${postId}`,
};

export const EMAIL = 'EMAIL';
export const PASSWORD = 'PASSWORD';
export const SHOW_PASSWORD = 'SHOW_PASSWORD';
export const EMAIL_ERROR = 'EMAIL_ERROR';
export const PASSWORD_ERROR = 'PASSWORD_ERROR';

export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const AUTH_TOKEN = 'AUTH_TOKEN';
export const ISLOGGEDIN = 'ISLOGGEDIN';
