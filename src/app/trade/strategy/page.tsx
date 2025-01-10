"use client";

import { Typography, Button, Row } from "antd";
import { AimOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import PageLayout from "@/components/page.layout";
import PageTrade from "@/components/page.trade";
import { useSuspenseQuery } from "@tanstack/react-query";
import { KestrelAPIService } from "@/services/kestrel.service";
import { SuspenseAndErrorBoundary } from "@/components/suspense.errorboundary";
// import styles from "./page.module.css";

export default function Page() {
  useEffect(() => {
    return () => {
      console.log("cleaned up");
    };
  }, []);

  return (
    <PageLayout selectedMenuKey="Trade" selectedSubMenu="Strategy">
      <SuspenseAndErrorBoundary>
        <SuspensePageComponent />
      </SuspenseAndErrorBoundary>
    </PageLayout>
  );
}

function SuspensePageComponent() {
  const { data } = useSuspenseQuery({
    queryKey: ["health"],
    queryFn: () => KestrelAPIService.instance.getHealth(),
  });

  console.log("data", data);

  return (
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
        <Typography.Title level={2}>Strategy Trade</Typography.Title>
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
  );
}
