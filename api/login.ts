// import { sign } from "jsonwebtoken";
// //jsonwebtoken 패키지에서 sign함수 가져옴

// import { serialize } from "cookie";
// // cookie 패키지에서 seriallize 함수 가져옴

// const SECRET_KEY = process.env.JWT_SECRET || "secret123"; // .env로 분리 권장
// //토큰 만들 때 사용할 비밀 키 설정 
// // 환경변수 .env에 설정된 값이 있으면 사용하고 , 없으면 "secret123"기본값 사용
// // . env로 분리하는게 보안상 맞긴함


// export default async function handler(req, res) {
//     //nextjs API 핸들러 => /api/로그인 같은 경로로 POST 요청을 받으면 실행됨
//   if (req.method !== "POST") {
//     return res.status(405).end();
//   }
//   //요청이 POST가 아닐시 거부 

//   const { email, password } = req.body;

//   //클라이언트가 보낸 이메일과 비밀번호를 가져옴

//   // 간단한 유저 인증 예시
//   if (email === "test@example.com" && password === "1234") {
//     const token = sign({ email }, SECRET_KEY, { expiresIn: "1h" });
//     //JWT 토큰을 생성함
//     //payload로는 { email } 만
//     // 서명에는 SECRET_KEY 사용
//     // 토큰은 1시간뒤 만료됨

//     const cookie = serialize("token", token, {
//       httpOnly: true,
//       path: "/",
//       maxAge: 60 * 60, // 1시간
//       sameSite: "lax",
//       secure: process.env.NODE_ENV === "production", // HTTPS에서만 작동
//     });
//     //쿠키 이름 : "token"
//     //httpOnly : 브라우저 자바스크립트에서 접근 못함(보안에 중요함)
//     //maxAge : 쿠키 만료 시간 : 현재 1시간
//     //sameSite : lax : CSRFF 공격방지 기본값
//     //secure : HTTPS에서만 전송 ( 운영환경에서만 적용 )

//     res.setHeader("Set-Cookie", cookie);
//     //쿠키를 응답 헤더에 추가
//     //클라이언트 브라우저는 이 쿠키를 저장함
//     return res.status(200).json({ message: "로그인 성공" });
//     //응답은 JSON 형식으로 성공 메시지 전송
//   }

//   return res.status(401).json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
//   //인증 실패시 401 상태 코드로 응답
// }
