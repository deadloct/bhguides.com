import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ItemFindRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/boost-calcs');
    }, [router]);

    return null;
}