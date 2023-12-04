interface Category {
  _id: string;
  cateName: string;
  uid: string;
  __v: number;
}

export interface ICate {
  cate: { categories: { data: { categories: Category[] } } };
}
