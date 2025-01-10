"use client";

import { ConfigProvider, theme } from "antd";
import { AliasToken } from "antd/es/theme/interface/alias";

export interface ThemeConfigProviderProps {
  children: React.ReactNode;
  token?: Partial<AliasToken>;
}

export default function ThemeConfigProvider({
  children,
  token = undefined,
}: ThemeConfigProviderProps) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: token,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
