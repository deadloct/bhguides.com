import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function RngMeRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/eggs');
    }, [router]);

    return (
        <Head>
            <meta httpEquiv="refresh" content="0; url=/eggs" />
            <link rel="canonical" href="https://bhguides.com/eggs" />
        </Head>
    );
}