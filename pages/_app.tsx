import Layout from '@/components/common/Layout/Layout';
import '@/styles/global.css';
import { UserProvider } from '@/contexts/auth-context';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	const noLayoutRoutes = ['/login', '/register'];

	const isLayoutHidden = noLayoutRoutes.includes(router.pathname);

	return (
		<UserProvider>
			{isLayoutHidden ? (
				<Component {...pageProps} />
			) : (
				<Layout>
					<Component {...pageProps} />
				</Layout>
			)}
		</UserProvider>
	);
}
