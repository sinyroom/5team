"use client";

import { useState } from "react";
import styles from "@/pages/login/login.module.css";
import Logo from '@/assets/img/logo.svg';
import Link from "next/link";
import { isValidEmail, isValidPassword } from '@/utils/validators';
import { useRouter } from "next/router";
import { TextInput } from "@/components/common/inputs/TextInput";
import { BaseButton } from "@/components/common/BaseButton";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (!isValidEmail(email)) {
      setEmailError("이메일 형식으로 작성해주세요");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!isValidPassword(password)) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormValid = validateForm();
    if (!isFormValid) return;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 쿠키 포함
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        alert("로그인 실패");
      }
    } catch (err) {
      console.error("로그인 요청 실패:", err);
      alert("서버 오류");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgcontainer}>
        <Logo />
      </div>
      <form className={styles.formBox} onSubmit={handleLogin}>
        <TextInput
          id="email"
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) =>
            setEmailError(
              isValidEmail(e.target.value) ? "" : "이메일 형식으로 작성해주세요"
            )
          }
          error={emailError}
          placeholder="입력"
          className="emailInput"
          width="350px"
          required
        />

        <TextInput
          id="password"
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) =>
            setPasswordError(
              isValidPassword(e.target.value)
                ? ""
                : "비밀번호는 8자 이상이어야 합니다"
            )
          }
          error={passwordError}
          placeholder="입력"
          width="350px"
          required
        />

        <BaseButton
          type="submit"
          color='red'
          size="medium"
          className={styles.loginButton}
          >
          로그인하기
        </BaseButton>
        <p className={styles.signupText}>
          회원이 아니신가요?{" "}
          <Link href="/register" className={styles.signupLink}>
            회원가입하기
          </Link>
        </p>
      </form>
    </div>
  );
}
