export interface Service {
    id: string;
    title: string;
    description: string;
    price: number | string;
    images?: string[]; 
    image?: string;    
  }

  export interface IReview {
    _id: string;
    name: string;
    date: string;
    text: string;
    service: string;
    stars: number;
    // ডেটাবেস থেকে আসা বাকি ফিল্ডগুলো
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  }