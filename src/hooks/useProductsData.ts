import useSWR from 'swr';

import useQueryStore from '@/store/useQueryStore'
/**Obtains the categories data from the backend
 * 
 * TODO: add auth token for the query, etc, this is just a POC
*/
const useProductsData = (serverUrl?:string|null) => {
    const { getProductQuery } = useQueryStore()

    const fetcher = async (url: string) => {
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
        `${url}/api/products/get${getProductQuery()}`, 
        fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return {
        products: data,
        isLoading,
        isError: !!error,
        mutate
    };
}

export default useProductsData;