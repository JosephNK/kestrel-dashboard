import { KestrelAPIService } from "@/services/kestrel.service";
import { getQueryClient } from "@/utils/react-query/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default function Layout({ children }: React.PropsWithChildren) {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["health"],
    queryFn: () => KestrelAPIService.instance.getHealth(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>{children}</main>
    </HydrationBoundary>
  );
}
