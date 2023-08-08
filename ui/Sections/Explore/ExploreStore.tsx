import { create } from 'zustand';

interface ExploreStore {
    filters: {
        cities: string[];
        states: string[];
    };
    setFilters: ({ cities, states }: { cities: string[], states: string[] }) => void; // Update the action signature
    activeFilters: string[];
    setActiveFilters: (newFilters: string[]) => void;
    handleClear: () => void;
    handleClearItem: (filter: string) => void; // Add the new function here
    handleFilterClick: (filter: string) => void;
}

export const useExploreStore = create<ExploreStore>((set) => ({
    filters: {
        cities: [],
        states: [],
    },
    setFilters: ({ cities, states }) => {
        set((state) => ({
            filters: { cities, states },
            activeFilters: state.activeFilters,
        }));
    },
    activeFilters: [],
    setActiveFilters: (newFilters) =>
        set(() => ({ activeFilters: newFilters })),
    handleClear: () => set(() => ({ activeFilters: [] })),
    handleClearItem: (filter) =>
        set((state) => ({
            activeFilters: state.activeFilters.filter((f) => f !== filter),
        })),
    handleFilterClick: (filter) =>
        set((state) => {
            if (state.activeFilters.includes(filter)) {
                const newFilters = state.activeFilters.filter((f) => f !== filter);
                return { activeFilters: newFilters };
            } else {
                const newFilters = [...state.activeFilters, filter];
                return { activeFilters: newFilters };
            }
        }),
}));


