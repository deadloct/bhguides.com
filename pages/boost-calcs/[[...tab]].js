import { useEffect } from 'react';
import { useRouter } from 'next/router';
import BoostCalcs from '../../src/components/BoostCalcs';
import { updatePageMeta } from '../../src/utils/seo';

const validTabs = ['simple-if', 'item-find', 'experience', 'cap-rate'];
const tabRedirects = { 'complete-if': 'item-find' };

export default function BoostCalcsPage() {
    const router = useRouter();
    const rawTab = router.query.tab?.[0];
    const redirectTarget = rawTab && tabRedirects[rawTab];

    useEffect(() => {
        if (redirectTarget) {
            router.replace(`/boost-calcs/${redirectTarget}`);
        }
    }, [redirectTarget, router]);

    useEffect(() => {
        updatePageMeta('/boost-calcs');
    }, []);

    if (redirectTarget) {
        return null;
    }

    const tab = rawTab || validTabs[0];
    return <BoostCalcs activeTab={tab} />;
}

export function getStaticPaths() {
    const paths = [
        { params: { tab: [] } },
        ...validTabs.map(t => ({ params: { tab: [t] } })),
        ...Object.keys(tabRedirects).map(t => ({ params: { tab: [t] } })),
    ];
    return { paths, fallback: false };
}

export function getStaticProps() {
    return { props: {} };
}
