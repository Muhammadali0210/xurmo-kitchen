export interface IFood {
    _id?: string;
    title: string;
    price: number;
    currency: string;
    description: string;
    image: string;
    categoryId: string;
}

export interface ICategory  {
    _id?: string
    name: string
}

export interface IContact {
    address: string
    email: string
    workingHours: string
    phones: string[]
    socialMedia: {
        facebook?: string
        instagram?: string
        telegram?: string
        youtube?: string
    }
}