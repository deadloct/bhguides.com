import { useEffect } from 'react';
import Familiars from '../src/components/Familiars';
import { updatePageMeta } from '../src/utils/seo';

export default function FamiliarCalcPage() {
    useEffect(() => {
        updatePageMeta('/familiar-calc');
    }, []);

    return <Familiars />;
}