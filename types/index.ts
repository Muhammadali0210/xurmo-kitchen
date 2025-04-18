export interface IFood {
    _id?: string;
    title: string;
    price: number;
    currency: string;
    description: string;
    image: string;
    category: string;
}

export interface ICategory  {
    _id?: string
    name: string
    type: string
}