import { create } from 'zustand';

interface StoreState {
    productPage: number | null
    categoryPage: number | null
    limit: number | null
    setCategoryPage: (newPage: number | null) => void
    setPrductPage: (newPage: number | null) => void
    setLimit: (newLimit: number | null) => void
    getCategoryQuery: () => string
    getProductQuery: () => string
}

const useQueryStore = create<StoreState>((set, get) => ({
    // Default values
    productPage: 1,
    categoryPage: 1,
    limit: 50,

    // Setters
    setPrductPage: (newPage) => set({ productPage: newPage }),
    setCategoryPage: (newPage) => set({ categoryPage: newPage }),
    setLimit: (newLimit) => set({ limit: newLimit }),

    // Getter for query string
    getCategoryQuery: () => {
        const { categoryPage, limit } = get();
        const queryParams = []

        if (categoryPage !== null) {
            queryParams.push(`page=${categoryPage}`)
        }

        if (limit !== null) {
            queryParams.push(`limit=${limit}`)
        }

        return queryParams.length > 0 ? `?${queryParams.join('&')}` : ''
    },
    getProductQuery: () => {
        const { productPage, limit } = get();
        const queryParams = []

        if (productPage !== null) {
            queryParams.push(`page=${productPage}`)
        }

        if (limit !== null) {
            queryParams.push(`limit=${limit}`)
        }

        return queryParams.length > 0 ? `?${queryParams.join('&')}` : ''
    },
}));

export default useQueryStore
  