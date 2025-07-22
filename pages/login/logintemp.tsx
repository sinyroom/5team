import { useRouter } from "next/router";
import { useState } from "react";

export default function Login(){
    const router = useRouter();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');

    const handleLogin = async () =>{
        const isValid = email === 'user@example.com' && password ==='123456778';

        if(!isValid){
            alert('비밀번호가 일치하지않습니다');
            return;
        }

        //엑세스 토큰 발급 예시
        const fakeAccessToken = 'access_token_123456789';
        localStorage.setItem('accessToken',fakeAccessToken);
        console.log('발급된 엑세스 토큰', fakeAccessToken);
    

    router.push('/');
    };

    const validEmail = () => {
        if(password.length < 8) {
            setError(prev => ({...prev,password :'8자 이상 작성해 주세요'}));
        } else {
            setError(prev => ({...prev,password : ''}));
        }
    };

    return (
    <div className="p-4 max-w-md mx-auto">
      <h1>로그인</h1>
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

      <button className="bg-orange-500 text-white w-full mt-4 py-2" onClick={handleLogin}>
        로그인 하기
      </button>
      <p className="mt-2">회원이 아니신가요? <span onClick={() => router.push('/signup')} className="text-blue-500 cursor-pointer">회원가입하기</span></p>
    </div>
    )
}