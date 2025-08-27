import { useEffect } from 'react';
import TurnRateCalc from '../src/components/TurnRateCalc';
import { updatePageMeta } from '../src/utils/seo';

export default function TurnRatePage() {
    useEffect(() => {
        updatePageMeta('/turn-rate');
    }, []);

    return <TurnRateCalc />;
}