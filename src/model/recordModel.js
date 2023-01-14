// Change file name to models
export interface recordModel {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    month: string;
    year: string;
}

export interface filterModel {
    category: string;
    month: string;
    year: string;
}