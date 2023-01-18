/*
Developers:
Oren Zehavi ID: 315940429
Matan Maimon ID: 207275959
*/
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