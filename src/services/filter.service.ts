export interface FilterOption {
    id: string;
    label: string;
}

export interface Filter {
    id: string;
    label: string;
    options?: FilterOption[]
}

export const getFilters: () => Promise<Filter[]> = async () =>
    Promise.resolve([
        {
            id: "location",
            label: "Locație",
            options: [
                { id: 'forest', label: 'Pădure' },
                { id: 'plain', label: 'Câmpie' },
                { id: 'riverbed', label: 'Luncă' }
            ]
        },
        {
            id: 'name',
            label: 'Denumire'
        }
    ])