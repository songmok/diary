export interface ICategory {
  _id: string;
  uid: string;
  cateName: string;
  __v: number;
}

export interface ICate {
  cate: { categories: ICategory[] };
}
