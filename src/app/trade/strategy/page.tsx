"use client";

import { Typography, Button, Row } from "antd";
import { AimOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import PageLayout from "@/components/page.layout";
import PageTrade from "@/components/page.trade";
import { useSuspenseQuery } from "@tanstack/react-query";
import APIService from "@/services/api.service";
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
  const { data: exchanges } = useSuspenseQuery({
    queryKey: ["exchanges"],
    queryFn: () => APIService.instance.getExchanges(),
  });

  const [exchangeId] = useState(exchanges?.items[0].id ?? "");

  const { data: ticker } = useSuspenseQuery({
    queryKey: ["tickers"],
    queryFn: () => APIService.instance.getTickers(exchangeId),
  });

  return (
    <PageTrade
      defaultExchange={exchanges?.items[0]}
      exchanges={exchanges?.items}
      tickers={ticker.items}
      onExchangeChange={(value) => {
        console.log("onExchangeChange", value);
      }}
      onTickerChange={(value) => {
        console.log("onTickerChange", value);
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
