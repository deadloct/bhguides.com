import { useEffect } from 'react';
import BoostCalcs from '../src/components/BoostCalcs';
import { updatePageMeta } from '../src/utils/seo';

export default function BoostCalcsPage() {
    useEffect(() => {
        updatePageMeta('/boost-calcs');
    }, []);

    return <BoostCalcs />;
}
