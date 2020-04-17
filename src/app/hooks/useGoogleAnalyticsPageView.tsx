import { useEffect } from 'react';
import ReactGA from 'react-ga';

export const useGoogleAnalyticsPageView = (): void => {
    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);
};
