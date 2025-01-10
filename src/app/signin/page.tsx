"use client";

import { Button, Typography, Divider } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import React from "react";
import styles from "./page.module.css";
import { AuthProvider, AuthService } from "@/services/auth_service";
import { createClientComponentClient } from "@/utils/supabase/client";

export default function Page() {
  const handleGoogleLogin = async () => {
    console.log("Google login clicked");
    const supabase = createClientComponentClient();
    await new AuthService(supabase).signInWithOAuth(
      AuthProvider.GOOGLE,
      `${location.origin}/auth/callback?next=/trade/strategy`
    );
  };

  return (
    <div className={styles.container}>
      <Typography.Title level={2} className={styles.title}>
        Kestrel 로그인
      </Typography.Title>

      <div className={styles.buttonContainer}>
        <Button
          icon={<GoogleOutlined />}
          size="large"
          className={`${styles.socialButton} ${styles.googleButton}`}
          onClick={handleGoogleLogin}
        >
          Google로 계속하기
        </Button>
      </div>

      <Divider plain className={styles.divider}>
        또는
      </Divider>

      <Typography.Text className={styles.subText}>
        다른 로그인 방법을 선택하세요
      </Typography.Text>
    </div>
  );
}
