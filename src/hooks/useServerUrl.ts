import { useEffect, useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';

const COOKIE_NAME = 'serverUrl'; // Nombre de la cookie para la URL

export function useServerUrl() {
    const [serverUrl, setServerUrl] = useState<string | null>(null);

    useEffect(() => {
        const cookieUrl = getCookie(COOKIE_NAME);

        if (cookieUrl && typeof cookieUrl === 'string') {
            setServerUrl(cookieUrl);
        } else {
            setServerUrl(process.env.NEXT_PUBLIC_API_URL || '');
        }
    }, []);

    const updateServerUrl = (url: string) => {
        setServerUrl(url);
        setCookie(COOKIE_NAME, url, { maxAge: 60 * 60 * 24 * 7 }); // days
    };

    return {
        serverUrl,
        updateServerUrl,
    };
}
