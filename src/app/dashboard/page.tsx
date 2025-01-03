"use client";

import { Typography } from "antd";
import React from "react";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <Typography.Title level={2} className={styles.title}>
        Kestrel Dashboard
      </Typography.Title>
    </div>
  );
}
