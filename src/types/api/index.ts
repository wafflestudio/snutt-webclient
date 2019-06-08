interface SimpleResultResposne {
  message: string;
}

export interface FeedbackResponse extends SimpleResultResposne {}
export interface UnregisterResponse extends SimpleResultResposne {}

export interface NotificationCountResponse {
  count: number;
}

export interface TokenSuccessfulResponse extends SimpleResultResposne {
  token: string;
  user_id: string;
}

export interface AuthenticationErrorResponse {
  message: string;
  errcode: number;
}

export type TokenResponse =
  | TokenSuccessfulResponse
  | AuthenticationErrorResponse;

export type RegistalLocalResponse = TokenResponse;

export interface LogoutResponse extends SimpleResultResposne {}
