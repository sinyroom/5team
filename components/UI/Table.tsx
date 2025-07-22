import React from 'react';
import { useAuth } from '@/contexts/auth-context';

export default function Table ({ data }: { data: any[] }) {
    const { login } = useAuth();
    if(res.ok && data.accessToken){
        Login(data.accessToken);
        router.push('/');
    }
  return (
    <table className="w-full border text-sm">
      <thead>
        <tr>
          <th className="border px-2 py-1">가게</th>
          <th className="border px-2 py-1">{'일자'}</th>
          {/* {!isTablet && <th className="border px-2 py-1">시급</th>} */}
          <th className="border px-2 py-1">상태</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i}>
            <td className="border px-2 py-1">{item.store}</td>
            <td className="border px-2 py-1">{item.date}</td>
            {/* {!isTablet && <td className="border px-2 py-1">{item.pay}</td>} */}
            <td className="border px-2 py-1">{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};