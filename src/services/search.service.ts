export interface Result {
    id: string;
    label: string;
    photoUrl: string;
}
export const search = (filterOptions: { [key: string]: string }): Promise<Result[]> => {
    return Promise.resolve([])
}