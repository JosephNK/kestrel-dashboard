import { APIService } from "@/services/api.service";
import { getQueryClient } from "@/utils/react-query/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default function Layout({ children }: React.PropsWithChildren) {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["health"],
    queryFn: () => APIService.instance.getHealth(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>{children}</main>
    </HydrationBoundary>
  );
}
