import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import styles from 'components/common/Layout/Layout.module.css';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	const router = useRouter();
	if (router.pathname === '/login' || router.pathname === '/signup') {
		return <main className={styles.main}>{children}</main>; // '/login' 또는 '/signup' 페이지에서는 아무것도 렌더링하지 않음
	}

	return (
		<>
			<Header />
			<main className={styles.main}>{children}</main>
			<Footer />
		</>
	);
}
