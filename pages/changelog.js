import { useEffect } from 'react';
import Changelog from '../src/components/Changelog';
import { updatePageMeta } from '../src/utils/seo';

export default function ChangelogPage() {
    useEffect(() => {
        updatePageMeta('/changelog');
    }, []);

    return <Changelog />;
}
