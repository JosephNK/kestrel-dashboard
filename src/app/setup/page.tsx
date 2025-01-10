"use client";

import type { RadioChangeEvent, InputNumberProps } from "antd";
import { Typography, InputNumber, Radio, Space, Select } from "antd";
import React, { useState } from "react";
import PageLayout from "@/components/page.layout";
// import styles from "./page.module.css";

export default function Page() {
  return (
    <PageLayout>
      <Typography.Title level={2}>Setup</Typography.Title>
    </PageLayout>
  );
}
