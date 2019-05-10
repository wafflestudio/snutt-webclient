interface SimpleResultResposne {
  message: string;
}

export interface FeedbackResp extends SimpleResultResposne {}

export interface NotificationCountResponse {
  count: number;
}

export interface TokenResponse {
  token: string;
  user_id: string;
}

export interface RegistalLocalResponse extends TokenResponse {
  message: string;
}

export interface LogoutResponse extends SimpleResultResposne {}
