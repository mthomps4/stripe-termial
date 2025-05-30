export interface SessionResponse {
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    stripe_account_status?: string | null;
    stripe_account_id?: string | null;
    is_merchant?: boolean;
    is_admin?: boolean;
  };
  token: string;
}
