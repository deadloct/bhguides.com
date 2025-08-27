import { useEffect } from 'react';
import FamiliarCalc from '../src/components/FamiliarCalc';
import { updatePageMeta } from '../src/utils/seo';

export default function FamiliarCalcPage() {
    useEffect(() => {
        updatePageMeta('/familiar-calc');
    }, []);

    return <FamiliarCalc />;
}