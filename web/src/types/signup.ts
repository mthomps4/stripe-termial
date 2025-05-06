export interface SignUpParams {
  user: {
    email: string;
    password: string;
    confirmPassword: string;
    merchant_attributes: {
      first_name: string;
      last_name: string;
    };
  };
}

export interface SessionResponse {
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    stripe_connect_account_status?: string;
    stripe_connect_account_id?: string;
    is_merchant?: boolean;
    is_admin?: boolean;
  };
  token: string;
}
