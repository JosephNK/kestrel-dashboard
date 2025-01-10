"use client";

import { Typography, Button, Row } from "antd";
import { AimOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import PageLayout from "@/components/page.layout";
import PageTrade from "@/components/page.trade";
// import styles from "./page.module.css";

export default function Page() {
  useEffect(() => {
    return () => {
      console.log("cleaned up");
    };
  }, []);

  return (
    <PageLayout selectedMenuKey="Trade" selectedSubMenu="AI">
      <PageTrade
        onExchangeChange={(value) => {
          console.log("onExchangeChange", value);
        }}
        onSymbolChange={(value) => {
          console.log("onSymbolChange", value);
        }}
        onScheduleChange={(value) => {
          console.log("onScheduleChange", value);
        }}
        onInvestmentMethodOptionChange={(value) => {
          console.log("onInvestmentMethodOptionChange", value);
        }}
        onInitialInvestmentRatioChange={(value) => {
          console.log("onInitialInvestmentRatioChange", value);
        }}
      >
        <Row justify={"space-between"}>
          <Typography.Title level={2}>AI Trade</Typography.Title>
          <Button
            type="primary"
            icon={<AimOutlined />}
            iconPosition="end"
            disabled={true}
          >
            Run
          </Button>
        </Row>
      </PageTrade>
    </PageLayout>
  );
}
