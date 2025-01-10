"use client";

import type { RadioChangeEvent, InputNumberProps } from "antd";
import { Typography, InputNumber, Radio, Space, Select, Divider } from "antd";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { NumberAnimationText } from "./number.animation";
import { debounce } from "lodash";
import { Ticker } from "@/models/ticker";
import { Exchange } from "@/models/exchange";
// import styles from "./page.trade.module.css";

export type InvestmentMethodOptionValue = "InvMethodOpt1" | "InvMethodOpt2";

export type PageTradeProps = {
  style?: React.CSSProperties;
  defaultExchange?: Exchange;
  exchanges?: Exchange[];
  tickers?: Ticker[];
  onExchangeChange?: (value: string) => void;
  onTickerChange?: (value: string) => void;
  onScheduleChange?: (value: string) => void;
  onInvestmentMethodOptionChange?: (value: string) => void;
  onInitialInvestmentRatioChange?: (value: number) => void;
};

export default function PageTrade(props: PropsWithChildren<PageTradeProps>) {
  const {
    children,
    defaultExchange,
    exchanges,
    tickers,
    onExchangeChange,
    onTickerChange,
    onScheduleChange,
    onInvestmentMethodOptionChange,
    onInitialInvestmentRatioChange,
  } = props;
  const [assetsHeld] = useState(0);

  const [assetsRatio, setAssetsRatio] = useState(10);

  const [investmentCost, setInvestmentCost] = useState(0);

  const [investmentMethodValue, setInvestmentMethodValue] =
    useState("InvMethodOpt1");

  const debouncedInvestmentCostOnChange = useMemo(
    () =>
      debounce((value: number) => {
        setInvestmentCost(value);
      }, 500),
    []
  );

  const updateCost = useCallback(
    (asset: number, ratio: number) => {
      const cost = asset * (ratio / 100);
      debouncedInvestmentCostOnChange(cost);
    },
    [debouncedInvestmentCostOnChange]
  );

  useEffect(() => {
    updateCost(assetsHeld, assetsRatio);
    return () => {
      console.log("cleaned up");
    };
  }, [assetsHeld, assetsRatio, updateCost]);

  const exchangeOnChange = (value: string) => {
    onExchangeChange?.call(null, value);
  };

  const tickerOnChange = (value: string) => {
    onTickerChange?.call(null, value);
  };

  const scheduleOnChange = (value: string) => {
    onScheduleChange?.call(null, value);
  };

  const investmentMethodOptionOnChange = (e: RadioChangeEvent) => {
    const value = e.target.value;
    setInvestmentMethodValue(value);
    onInvestmentMethodOptionChange?.call(null, value?.toString() ?? "1");
  };

  const initialInvestmentRatioOnChange: InputNumberProps["onChange"] = (
    value
  ) => {
    if (typeof value === "number") {
      setAssetsRatio(value);
      updateCost(assetsHeld, value);
      onInitialInvestmentRatioChange?.call(null, value);
    }
  };

  return (
    <>
      {children}
      <div style={{ overflowY: "auto" }}>
        <Typography.Title level={5}>Select Exchange</Typography.Title>
        <Select
          defaultValue={defaultExchange?.id}
          style={{ width: 150 }}
          onChange={exchangeOnChange}
          options={exchanges?.map((exchange) => ({
            value: exchange.id,
            label: exchange.name,
          }))}
        />
        <Divider />
        <Typography.Title level={5}>Select Ticker</Typography.Title>
        <Select
          defaultValue={tickers?.[0].id}
          style={{ width: 150 }}
          onChange={tickerOnChange}
          options={tickers?.map((ticker) => ({
            value: ticker.id,
            label: ticker.name,
          }))}
        />
        <Divider />
        <Typography.Title level={5}>
          Assets held From Select Exchange
        </Typography.Title>
        <NumberAnimationText uniqueKey={"AssetsHeld"} number={assetsHeld} />
        <Divider />
        <Typography.Title level={5}>
          Initial investment in assets held of %
        </Typography.Title>
        <InputNumber<number>
          defaultValue={assetsRatio}
          style={{ width: 150 }}
          min={0}
          max={100}
          formatter={(value) => `${value}%`}
          parser={(value) => value?.replace("%", "") as unknown as number}
          onChange={initialInvestmentRatioOnChange}
        />
        <Divider />
        <Typography.Title level={5}>Initial investment cost</Typography.Title>
        <NumberAnimationText
          uniqueKey={"InvestmentCost"}
          number={investmentCost}
        />
        <Divider />
        <Typography.Title level={5}>Investment method</Typography.Title>
        <Radio.Group
          onChange={investmentMethodOptionOnChange}
          value={investmentMethodValue}
        >
          <Space direction="vertical">
            <Radio value={"InvMethodOpt1"}>BuyAndHold</Radio>
            <Radio value={"InvMethodOpt2"}>Compounding</Radio>
          </Space>
        </Radio.Group>
        <Divider />
        <Typography.Title level={5}>Select Schedule</Typography.Title>
        <Select
          defaultValue="1d"
          style={{ width: 150 }}
          onChange={scheduleOnChange}
          options={[
            { value: "1m", label: "1min" },
            { value: "5m", label: "5min" },
            { value: "1h", label: "1hour" },
            { value: "1d", label: "1day" },
          ]}
        />
      </div>
    </>
  );
}
