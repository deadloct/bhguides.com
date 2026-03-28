import { useEffect } from 'react';
import EggsWrapper from '../src/components/Eggs/EggsWrapper';
import { updatePageMeta } from '../src/utils/seo';

export default function EggsPage() {
    useEffect(() => {
        updatePageMeta('/eggs');
    }, []);

    return <EggsWrapper />;
}