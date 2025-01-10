import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./error.fallback";
import { Suspense } from "react";
import { Flex, Spin } from "antd";

export const SuspenseAndErrorBoundary = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
      <Suspense
        fallback={
          <Flex
            style={{ height: "100%" }}
            gap="middle"
            justify="center"
            align="center"
            vertical
          >
            <Spin tip="Loading" size="large"></Spin>
          </Flex>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};
