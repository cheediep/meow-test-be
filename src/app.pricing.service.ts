import { Injectable } from "@nestjs/common";
import { PouchPrice } from "../data";
import { Cat } from "./types";

@Injectable()
export class PricingService {
  constructor(private readonly cats: Cat[]) {
    this.cats = cats;
  }

  getTotalSubscriptionPrice(): number {
    return this.filterInactiveCats().reduce(
      (acc, cat) => acc + this.getPriceByPouchSize(cat.pouchSize),
      0
    );
  }

  getPriceByPouchSize(pouchSize: keyof typeof PouchPrice): number {
    return PouchPrice[pouchSize];
  }

  filterInactiveCats(): Cat[] {
    return this.cats.filter((cat) => cat.subscriptionActive);
  }

  hasFreeGift(): boolean {
    return this.getTotalSubscriptionPrice() >= 120;
  }
}
