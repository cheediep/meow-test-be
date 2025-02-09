import { Injectable } from "@nestjs/common";
import { PouchPrice } from "../../data";
import { Cat } from "../types";

@Injectable()
export class PricingService {
  getTotalSubscriptionPrice(cats: Cat[]): number {
    return this.filterInactiveCats(cats).reduce(
      (acc, cat) => acc + this.getPriceByPouchSize(cat.pouchSize),
      0
    );
  }

  getPriceByPouchSize(pouchSize: keyof typeof PouchPrice): number {
    return PouchPrice[pouchSize];
  }

  filterInactiveCats(cats: Cat[]): Cat[] {
    return cats.filter((cat) => cat.subscriptionActive);
  }

  hasFreeGift(totalPrice: number): boolean {
    return totalPrice >= 120;
  }
}
