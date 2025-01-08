"use client";

import { Space, Typography } from "antd";
import React from "react";
import PageLayout from "@/components/page.layout";
// import styles from "./page.module.css";

export default function Page() {
  return (
    <PageLayout selectedMenuKey="Trade" selectedSubMenu="Strategy">
      <Typography.Title level={2}>Strategy</Typography.Title>
    </PageLayout>
  );
}
