import useSWR from 'swr';

import useQueryStore from '@/store/useQueryStore'
/**Obtains the categories data from the backend
 * 
 * TODO: add auth token for the query, etc, this is just a POC
*/
const useCategoriesData = (serverUrl?:string|null) => {
    const { getCategoryQuery} = useQueryStore()

    const fetcher = async (url: string) => {
        console.log("RELOADING;", serverUrl)
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_AUTH}` 
            }
        }).then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
            return res.json();
        });
    };

    const url = serverUrl || process.env.NEXT_PUBLIC_API_URL
    const { data, error, isLoading, mutate } = useSWR(
        `${url}/api/categories/get${getCategoryQuery()}`, 
        fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return {
        categories: data,
        isLoading,
        isError: !!error,
        mutate
    };
}

export default useCategoriesData;