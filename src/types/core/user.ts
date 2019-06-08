export interface User {
  email?: string;
  local_id: string | null;
  fb_name: string | null;
}

export interface Error {
  errorCode: number;
  message: string;
}
