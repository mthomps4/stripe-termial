import { useQuery } from "@tanstack/react-query";
import { GET_PRODUCTS_URL } from "@/constants";
import { Product } from "@/types/products";
import { useCurrentUser } from "@/contexts/CurrentUserProvider";

export function useGetProducts({ searchParam }: { searchParam: string }) {
  const { token, user } = useCurrentUser();

  // pagination
  const queryParams = new URLSearchParams({
    "q[name_cont]": searchParam,
    page: "1",
    per_page: "50",
  });

  return useQuery<Product[], Error>({
    queryKey: ["products", searchParam, user?.id],
    queryFn: async (): Promise<Product[]> => {
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

      return data.products;
    },
  });
}
