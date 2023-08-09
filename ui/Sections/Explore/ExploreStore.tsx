import { create } from 'zustand';

interface ExploreStore {
    filters: {
        cities: string[];
        states: string[];
    };
    setFilters: ({ cities, states }: { cities: string[]; states: string[] }) => void;
    activeFilters: string[];
    setActiveFilters: (newFilters: string[]) => void;
    handleClear: () => void;
    handleClearItem: (filter: string) => void;
    handleFilterClick: (filter: string) => void;
    fetchInitialData: () => void;
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
    setActiveFilters: (newFilters) => set(() => ({ activeFilters: newFilters })),
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
    fetchInitialData: () => {
        // Use the filters from the state when cities and states length is greater than 0
        const initialCities = useExploreStore.getState().filters.cities.length > 0
            && useExploreStore.getState().filters.cities;

        const initialStates = useExploreStore.getState().filters.states.length > 0
            && useExploreStore.getState().filters.states;
        if (initialCities && initialStates)
            set(() => ({
                filters: {
                    cities: initialCities,
                    states: initialStates,
                },
                activeFilters: [],
            }));
    },
}));

