"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "@/pages/login/login.module.css";
import logo from '@/assets/img/logo.svg';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = async () => {
  //   const res = await fetch("/api/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include", // 중요: 쿠키 포함
  //     body: JSON.stringify({ email, password }),
  //   });

  //   if (res.ok) {
  //     router.push("/");
  //   } else {
  //     alert("로그인 실패");
  //   }
  // };

  return (
    <div className={styles.container}>
      <div className={styles.imgcontainer}>
      <Image
        src={logo} alt='로고이미지' fill/>
      </div>
      <div className={styles.formBox}>
        <label className={styles.label}>이메일</label>
        <input
          type="email"
          placeholder="입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />

        <label className={styles.label}>비밀번호</label>
        <input
          type="password"
          placeholder="입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />

        <button 
          // onClick={handleLogin} 
          className={styles.loginButton}>
          로그인 하기
        </button>

        <p className={styles.signupText}>
          회원이 아니신가요?{" "}
          <a href="/signup" className={styles.signupLink}>
            회원가입하기
          </a>
        </p>
      </div>
    </div>
  );
}
