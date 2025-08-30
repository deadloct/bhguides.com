import { useEffect } from 'react';
import Eggs from '../src/components/Eggs';
import { updatePageMeta } from '../src/utils/seo';

export default function EggsPage() {
    useEffect(() => {
        updatePageMeta('/eggs');
    }, []);

    return <Eggs />;
}