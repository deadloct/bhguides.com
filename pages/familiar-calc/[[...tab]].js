import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Familiars from '../../src/components/Familiars';
import { updatePageMeta } from '../../src/utils/seo';

const validTabs = ['stats', 'persuades'];

export default function FamiliarCalcPage() {
    const router = useRouter();
    const tab = router.query.tab?.[0] || validTabs[0];

    useEffect(() => {
        updatePageMeta('/familiar-calc');
    }, []);

    return <Familiars activeTab={tab} />;
}

export function getStaticPaths() {
    const paths = [
        { params: { tab: [] } },
        ...validTabs.map(t => ({ params: { tab: [t] } })),
    ];
    return { paths, fallback: false };
}

export function getStaticProps() {
    return { props: {} };
}
