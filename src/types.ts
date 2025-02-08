export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cats: Cat[];
}

export interface Cat {
  name: string;
  subscriptionActive: boolean;
  breed: string;
  pouchSize: CatPouchSize;
}

export const CatPouchSize = {
  A: "A",
  B: "B",
  C: "C",
  D: "D",
  E: "E",
  F: "F",
} as const;

export type CatPouchSize = (typeof CatPouchSize)[keyof typeof CatPouchSize];
