import { useEffect } from 'react';
import About from '../src/components/About';
import { updatePageMeta } from '../src/utils/seo';

export default function AboutPage() {
    useEffect(() => {
        updatePageMeta('/about');
    }, []);

    return <About />;
}
