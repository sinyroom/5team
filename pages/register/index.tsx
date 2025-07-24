import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/pages/register/register.module.css";
import Logo from '@/assets/img/logo.svg';

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState<"worker" | "owner">("worker");
  const [error, setError] = useState<{ [key: string]: string }>({});

  const validateEmail = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError((prev) => ({ ...prev, email: "이메일 형식으로 작성해 주세요." }));
      return false;
    } else {
      setError((prev) => ({ ...prev, email: "" }));
      return true;
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setError((prev) => ({ ...prev, password: "8자 이상 입력해주세요." }));
      return false;
    } else {
      setError((prev) => ({ ...prev, password: "" }));
      return true;
    }
  };

  const validateConfirm = () => {
    if (password !== confirmPassword) {
      setError((prev) => ({ ...prev, confirm: "비밀번호가 일치하지 않습니다." }));
      return false;
    } else {
      setError((prev) => ({ ...prev, confirm: "" }));
      return true;
    }
  };

  const handleSubmit = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirm();

    if (!isEmailValid || !isPasswordValid || !isConfirmValid) return;

    // 임시 중복 이메일 확인
    if (email === "test@example.com") {
      alert("이미 사용중인 이메일입니다");
      return;
    }

    alert("가입이 완료되었습니다");
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgcontainer}>
        <Logo/>
      </div>
      <div className={styles.form}>
        <label className={styles.label}>이메일</label>
        <input
          className={`${styles.input} ${error.email && styles.error}`}
          placeholder="입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail}
        />
        {error.email && <p className={styles.errorText}>{error.email}</p>}

        <label className={styles.label}>비밀번호</label>
        <input
          type="password"
          className={`${styles.input} ${error.password && styles.error}`}
          placeholder="입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validatePassword}
        />
        {error.password && <p className={styles.errorText}>{error.password}</p>}

        <label className={styles.label}>비밀번호 확인</label>
        <input
          type="password"
          className={`${styles.input} ${error.confirm && styles.error}`}
          placeholder="입력"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={validateConfirm}
        />
        {error.confirm && <p className={styles.errorText}>{error.confirm}</p>}

        <div className={styles.userTypeSection}>
          <span className={styles.label}>회원 유형</span>
          <div className={styles.userTypeToggle}>
            <button
              className={`${styles.typeButton} ${userType === "worker" ? styles.selected : ""}`}
              onClick={() => setUserType("worker")}
            >
              알바님
            </button>
            <button
              className={`${styles.typeButton} ${userType === "owner" ? styles.selected : ""}`}
              onClick={() => setUserType("owner")}
            >
              사장님
            </button>
          </div>
        </div>

        <button onClick={handleSubmit} className={styles.submitButton}>
          가입하기
        </button>

        <p className={styles.loginText}>
          이미 가입하셨나요?{" "}
          <span className={styles.loginLink} onClick={() => router.push("/login")}>
            로그인하기
          </span>
        </p>
      </div>
    </div>
  );
}
