"use client";

import React, { PropsWithChildren } from "react";
import { StockOutlined, LineChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme, Typography } from "antd";
import { useRouter } from "next/navigation";
// import styles from "./page.layout.module.css";

const { Header, Content, Footer, Sider } = Layout;

export type MenuLabel = "Trade" | "Backtesting";

const menuIcons = [StockOutlined, LineChartOutlined];
const menuLabels = [
  {
    name: "Trade",
    items: ["Strategy", "AI"],
  },
  {
    name: "Backtesting",
    items: ["Strategy"],
  },
];

const menuItems: MenuProps["items"] = menuIcons.map((icon, index) => {
  const menuItem = menuLabels[index];
  const label = menuItem["name"];
  const key = label;

  return {
    key: key,
    icon: React.createElement(icon),
    label: label,
    children: menuItem["items"].map((item, index) => {
      const subKey = `${label}-${index}`;
      const subLabel = item;
      return {
        key: subKey,
        label: subLabel,
      };
    }),
  };
});

type PageLayoutProps = {
  selectedMenuKey?: MenuLabel;
  selectedSubMenu?: string;
  style?: React.CSSProperties;
};

export function PageHeader() {
  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <Typography.Title level={2}>Kestrel Dashboard</Typography.Title>
    </Header>
  );
}

export function PageFooter() {
  return (
    <Footer style={{ textAlign: "center" }}>
      Kestrel ©{2025} Created by JosephNK
    </Footer>
  );
}

export default function PageLayout(props: PropsWithChildren<PageLayoutProps>) {
  const { children, selectedMenuKey, selectedSubMenu, style } = props;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const menuNames = menuLabels.map((item, _) => item["name"]);

  const router = useRouter();

  // Find the item index
  function findItemIndex(name: string, findItem: string): number {
    const menu = menuLabels.find((menu) => menu.name === name);
    if (!menu) {
      return 0;
    }
    return menu.items.findIndex((item) => item === findItem);
  }

  // Find the item by index
  function findItemByIndex(name: string, findIndex: number): string {
    const menu = menuLabels.find((menu) => menu.name === name);
    if (!menu) {
      return "";
    }
    if (findIndex < 0 || findIndex >= menu.items.length) {
      return "";
    }
    return menu.items[findIndex];
  }

  return (
    <Layout style={{ ...style, height: "100%" }}>
      <PageHeader />
      <Content style={{ height: "100%" }}>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            height: "100%",
          }}
        >
          {selectedMenuKey !== undefined && selectedSubMenu !== undefined ? (
            <>
              <Sider style={{ background: colorBgContainer }} width={200}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={[
                    `${selectedMenuKey}-${findItemIndex(
                      selectedMenuKey,
                      selectedSubMenu
                    )}`,
                  ]}
                  defaultOpenKeys={[...menuNames]}
                  style={{ height: "100%" }}
                  items={menuItems}
                  onClick={(value) => {
                    console.log("MenuOnClick", value.key);
                    const [name, indexStr] = value.key.split("-");
                    const subMenu = findItemByIndex(name, Number(indexStr));
                    if (subMenu === "") {
                      return;
                    }
                    return router.push(
                      `/${name.toLowerCase()}/${subMenu.toLowerCase()}`
                    );
                  }}
                />
              </Sider>
              <Content
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0 24px",
                }}
              >
                {children}
              </Content>
            </>
          ) : (
            <>
              <Content
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0 24px",
                }}
              >
                {children}
              </Content>
            </>
          )}
        </Layout>
      </Content>
      <PageFooter />
    </Layout>
  );
}
