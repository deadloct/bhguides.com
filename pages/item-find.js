import { useEffect } from 'react';
import ItemFindCapRateWrapper from '../src/components/ItemFindCapRateWrapper';
import { updatePageMeta } from '../src/utils/seo';

export default function ItemFindPage() {
    useEffect(() => {
        updatePageMeta('/item-find');
    }, []);

    return <ItemFindCapRateWrapper />;
}