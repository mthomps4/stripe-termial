import { useQuery } from "@tanstack/react-query";
import { GET_PRODUCTS_URL } from "@/constants";
import { GetProductsResponse } from "@/types/products";
import { useCurrentUser } from "@/contexts/CurrentUserProvider";

export function useGetProducts({
  searchParam,
  page,
  perPage,
}: {
  searchParam: string;
  page: number;
  perPage: number;
}) {
  const { token, user } = useCurrentUser();

  // pagination
  const queryParams = new URLSearchParams({
    "q[name_cont]": searchParam,
    page: page.toString(),
    per_page: perPage.toString(),
  });

  return useQuery<GetProductsResponse, Error>({
    queryKey: ["products", searchParam, page, perPage, user?.id],
    queryFn: async (): Promise<GetProductsResponse> => {
      const response = await fetch(
        `${GET_PRODUCTS_URL}?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      // console.log(data);
      return data;
    },
  });
}
