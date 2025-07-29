import { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '@/api/settings/axiosInstance';
import { jwtDecode } from 'jwt-decode';

interface User {
	id: string;
	email: string;
	type: 'employee' | 'employer';
	//   name?: string;
	//   phone?: string;
	//   address?: string;
	//   bio?: string;
}

interface UserContextType {
	user: User | null;
	setUser: (user: User | null) => void;
	isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	console.log(user);
	//   useEffect(() => {
	//     const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
	//     if (!token) {
	//       setIsLoading(false);
	//       return;
	//     }
	//     const decoded = jwtDecode(token);
	//     const id = decoded.userId;
	//     // 유저 정보 가져오기
	//     console.log(id,user);
	//     axiosInstance
	//       .get(`/users/${id}`) // ← 이 엔드포인트는 토큰 기반으로 유저 정보를 반환해야 함
	//       .then((res) => {
	//         const userData = res.data.item;
	//         console.log(userData);
	//         setUser(userData);
	//       })
	//       .catch(() => {
	//         localStorage.removeItem("token");
	//         setUser(null);
	//       })
	//       .finally(() => {
	//         setIsLoading(false);
	//       });
	//   }, [user?.id]);

	return (
		<UserContext.Provider value={{ user, setUser, isLoading }}>{children}</UserContext.Provider>
	);
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUserContext must be used within a UserProvider');
	}
	return context;
};
