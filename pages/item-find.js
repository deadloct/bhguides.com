import { useEffect } from 'react';
import Tools from '../src/components/Tools';
import { updatePageMeta } from '../src/utils/seo';

export default function ItemFindPage() {
    useEffect(() => {
        updatePageMeta('/item-find');
    }, []);

    return <Tools />;
}