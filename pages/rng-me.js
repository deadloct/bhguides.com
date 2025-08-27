import { useEffect } from 'react';
import RNGME from '../src/components/RNGME';
import { updatePageMeta } from '../src/utils/seo';

export default function RNGMEPage() {
    useEffect(() => {
        updatePageMeta('/rng-me');
    }, []);

    return <RNGME />;
}