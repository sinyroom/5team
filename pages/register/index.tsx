import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<{ [key: string]: string }>({});

  const validateEmail = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(prev => ({ ...prev, email: '이메일 형식으로 작성해 주세요.' }));
      return false;
    } else {
      setError(prev => ({ ...prev, email: '' }));
      return true;
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setError(prev => ({ ...prev, password: '8자 이상 입력해주세요.' }));
      return false;
    } else {
      setError(prev => ({ ...prev, password: '' }));
      return true;
    }
  };

  const validateConfirm = () => {
    if (password !== confirmPassword) {
      setError(prev => ({ ...prev, confirm: '비밀번호가 일치하지 않습니다.' }));
      return false;
    } else {
      setError(prev => ({ ...prev, confirm: '' }));
      return true;
    }
  };

  const handleSubmit = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirm();

    if (!isEmailValid || !isPasswordValid || !isConfirmValid) {
      return;
    }

    if (email === 'test@example.com') {
      alert('이미 사용중인 이메일입니다');
      return;
    }

    alert('가입이 완료되었습니다');
    router.push('/login');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">회원가입</h1>

      <input
        className={`border w-full p-2 ${error.email && 'border-red-500'}`}
        placeholder="이메일"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onBlur={validateEmail}
      />
      {error.email && <p className="text-red-500 text-sm">{error.email}</p>}

      <input
        className={`border w-full p-2 mt-2 ${error.password && 'border-red-500'}`}
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={e => setPassword(e.target.value)}
        onBlur={validatePassword}
      />
      {error.password && <p className="text-red-500 text-sm">{error.password}</p>}

      <input
        className={`border w-full p-2 mt-2 ${error.confirm && 'border-red-500'}`}
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        onBlur={validateConfirm}
      />
      {error.confirm && <p className="text-red-500 text-sm">{error.confirm}</p>}

      <button
        className="bg-orange-500 text-white w-full mt-4 py-2 hover:bg-orange-600 transition"
        onClick={handleSubmit}
      >
        가입하기
      </button>

      <p className="mt-2 text-sm">
        이미 가입하셨나요?{' '}
        <span
          onClick={() => router.push('/login')}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          로그인하기
        </span>
      </p>
    </div>
  );
}