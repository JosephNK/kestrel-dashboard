import { Exchange } from "@/models/exchange";
import APIService, { APIResponse } from "@/services/api.service";
import { getQueryClient } from "@/utils/react-query/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Layout({ children }: React.PropsWithChildren) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["exchanges"],
    queryFn: () => APIService.instance.getExchanges(),
  });

  const exchanges = queryClient.getQueryData<APIResponse<Exchange[]>>([
    "exchanges",
  ]);

  const defaultExchangeId = exchanges?.items[0].id;

  queryClient.prefetchQuery({
    queryKey: ["tickers"],
    queryFn: () => APIService.instance.getTickers(defaultExchangeId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>{children}</main>
    </HydrationBoundary>
  );
}
