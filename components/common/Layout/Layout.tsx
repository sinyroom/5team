import React, { ReactNode } from 'react';
import Header from './Header.tsx';
import Footer from './Footer.tsx';

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
}
