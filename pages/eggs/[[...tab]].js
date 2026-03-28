import { useEffect } from 'react';
import { useRouter } from 'next/router';
import EggsWrapper from '../../src/components/Eggs/EggsWrapper';
import { updatePageMeta } from '../../src/utils/seo';

const validTabs = ['calculator', 'cracker'];

export default function EggsPage() {
    const router = useRouter();
    const tab = router.query.tab?.[0] || validTabs[0];

    useEffect(() => {
        updatePageMeta('/eggs');
    }, []);

    return <EggsWrapper activeTab={tab} />;
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
