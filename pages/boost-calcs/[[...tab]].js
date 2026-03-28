import { useEffect } from 'react';
import { useRouter } from 'next/router';
import BoostCalcs from '../../src/components/BoostCalcs';
import { updatePageMeta } from '../../src/utils/seo';

const validTabs = ['simple-if', 'complete-if', 'cap-rate'];

export default function BoostCalcsPage() {
    const router = useRouter();
    const tab = router.query.tab?.[0] || validTabs[0];

    useEffect(() => {
        updatePageMeta('/boost-calcs');
    }, []);

    return <BoostCalcs activeTab={tab} />;
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
