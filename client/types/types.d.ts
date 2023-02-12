type Lists = {
    title: string,
    value: number | undefined
}

export type Layout = {
    children: any
}

export type News = {
    _id: string,
    url?: string,
    title: string,
    description: string,
    creator: string,
    tags: string[],
    image: string,
    published: boolean,
    category: string,
    rating: Number 
    createdAt?: string,
    updatedAt?: string,
}

export interface typeNews {
    items: News[],
    status?: string
}

export type User = {
    _id: string,
    email: string,
    name: string,
    role: string,
    image: string
}


export interface Comment {
    data: Comment
    _id?: string,
    body: string,
    userId: string | undefined,
    parentId?: string | null,
    postId: string,
    name?: string | undefined,
    createdAt?: string | number | Date | undefined,
}


declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
  }