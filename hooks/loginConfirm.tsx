import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '허용되지 않은 요청 방식입니다.' });
  }

  const { email, password } = req.body;

  // 간단한 사용자 인증 로직 (실제로는 DB 확인 필요)
  if (email === 'user@example.com' && password === '12345678') {
    return res.status(200).json({ accessToken: 'access_token_123456789' });
  } else {
    return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
  }
}