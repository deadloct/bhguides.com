import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HashRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        const checkForHashRedirect = () => {
            const hash = window.location.hash;
            
            // Only process if we have a hash that looks like a route
            if (!hash || !hash.startsWith('#/')) return;
            
            // Map old hash routes to new routes
            const routeMap = {
                '#/': '/',
                '#/item-find': '/item-find',
                '#/turn-rate': '/turn-rate', 
                '#/familiar-calc': '/familiar-calc',
                '#/rng-me': '/rng-me'
            };

            // Find matching route by checking if hash starts with any known route
            let targetRoute = null;
            let remainingHash = '';
            let matchedRoute = '';
            
            for (const [oldRoute, newRoute] of Object.entries(routeMap)) {
                // Check if hash starts with this route (with or without trailing slash)
                if (hash === oldRoute || 
                    hash === oldRoute + '/' ||
                    hash.startsWith(oldRoute + '/') ||
                    hash.startsWith(oldRoute + '#')) {
                    
                    targetRoute = newRoute;
                    matchedRoute = oldRoute;
                    
                    // Find where the route ends to preserve any remaining content
                    let routeEndIndex = oldRoute.length;
                    
                    // Skip trailing slash if present
                    if (hash[routeEndIndex] === '/') {
                        routeEndIndex++;
                    }
                    
                    // Preserve any anchor after the route
                    if (hash.length > routeEndIndex && hash[routeEndIndex] === '#') {
                        remainingHash = hash.substring(routeEndIndex);
                    }
                    break;
                }
            }
            
            if (targetRoute) {
                // Navigate to new route
                router.push(targetRoute + remainingHash);
            }
        };

        // Run immediately when component mounts
        checkForHashRedirect();
        
        // Also listen for hash changes
        window.addEventListener('hashchange', checkForHashRedirect);
        
        return () => {
            window.removeEventListener('hashchange', checkForHashRedirect);
        };
    }, [router]);

    return null;
};

export default HashRedirect;