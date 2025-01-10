import { getErrorDataByCode } from "@/utils/axios/axios.error";
import { Button, Flex, Space, Typography } from "antd";
import { FallbackProps } from "react-error-boundary";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { code, message } = getErrorDataByCode(error);

  return (
    <Flex
      style={{ height: "100%" }}
      gap="middle"
      justify="center"
      align="center"
      vertical
    >
      <Typography.Title level={5}>{`ErrorCode: ${code}`}</Typography.Title>
      <Space direction="vertical" size="large" align="center">
        <Typography.Text>{message}</Typography.Text>
        <Button style={{ width: 120 }} onClick={resetErrorBoundary}>
          재시도
        </Button>
      </Space>
    </Flex>
  );
};
