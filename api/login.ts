// import { sign } from "jsonwebtoken";
// import { serialize } from "cookie";

// const SECRET_KEY = process.env.JWT_SECRET || "secret123"; // .env로 분리 권장

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).end();
//   }

//   const { email, password } = req.body;

//   // 간단한 유저 인증 예시
//   if (email === "test@example.com" && password === "1234") {
//     const token = sign({ email }, SECRET_KEY, { expiresIn: "1h" });

//     const cookie = serialize("token", token, {
//       httpOnly: true,
//       path: "/",
//       maxAge: 60 * 60, // 1시간
//       sameSite: "lax",
//       secure: process.env.NODE_ENV === "production", // HTTPS에서만 작동
//     });

//     res.setHeader("Set-Cookie", cookie);
//     return res.status(200).json({ message: "로그인 성공" });
//   }

//   return res.status(401).json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
// }
