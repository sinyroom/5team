import React, { ReactNode } from 'react';
import styles from 'components/common/Layout/Layout.module.css';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<Header />
			<main className={styles.main}>{children}</main>
			<Footer />
		</>
	);
}
