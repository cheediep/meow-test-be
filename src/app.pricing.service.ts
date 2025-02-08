import { Injectable } from "@nestjs/common";
import { PouchPrice } from "../data";
import { Cat } from "./types";

@Injectable()
export class PricingService {
  constructor(private readonly cats: Cat[]) {
    this.cats = cats;
  }

  getTotalSubscriptionPrice(): number {
    return 1;
  }

  getPriceByPouchSize(pouchSize: keyof typeof PouchPrice): number {
    return PouchPrice[pouchSize];
  }

  filterInactiveCats(): Cat[] {
    return this.cats;
  }
}
