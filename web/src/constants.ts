export const ROOT_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
// export const API_VERSION = "v1";
export const API_URL = `${ROOT_API_URL}/api`;

export const SIGNUP_URL = `${API_URL}/signup`;
export const LOGIN_URL = `${API_URL}/login`;
export const CREATE_TEST_CONNECT_ACCOUNT_URL = `${API_URL}/merchants/create_test_connect_account`;
// Products
export const GET_PRODUCTS_URL = `${API_URL}/products`;
export const CREATE_PRODUCT_URL = `${API_URL}/products`;
export const UPDATE_PRODUCT_URL = `${API_URL}/products/:id`;
export const DELETE_PRODUCT_URL = `${API_URL}/products/:id`;

// Local Storage
export const AUTH_TOKEN_KEY = "sweet_treats_token";
export const USER_KEY = "sweet_treats_user";
