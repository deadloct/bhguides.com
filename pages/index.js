import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Guides from '../src/components/Guides';
import { updatePageMeta } from '../src/utils/seo';

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        updatePageMeta('/');
    }, []);

    return <Guides />;
}