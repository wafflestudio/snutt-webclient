interface SimpleResultResposne {
  message: string;
}

export interface FeedbackResponse extends SimpleResultResposne {}
export interface UnregisterResponse extends SimpleResultResposne {}

export interface NotificationCountResponse {
  count: number;
}

export interface TokenSuccessResponse {
  token: string;
}

export interface RegisterSuccessResponse extends SimpleResultResposne {
  token: string;
  user_id: string;
}

export interface ErrorResponse {
  message: string;
  errcode: number;
}

export type TokenResponse = TokenSuccessResponse | ErrorResponse;

export type RegistalLocalResponse = RegisterSuccessResponse | ErrorResponse;

export interface LogoutResponse extends SimpleResultResposne {}
