
//import Layout from '@/components/common/Layout/Layout.tsx';
import '@/styles/global.css';
import { AuthProvider } from "@/contexts/auth-context";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {

	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
