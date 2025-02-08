import { Injectable } from "@nestjs/common";
import { Cat } from "./types";

@Injectable()
export class PricingService {
  constructor(private readonly cats: Cat[]) {
    this.cats = cats;
  }

  getTotalSubscriptionPrice(): number {
    return 1;
  }

  getPriceByPouchSize(pouchSize: string): number {
    return 1;
  }

  filterInactiveCats(): Cat[] {
    return this.cats;
  }
}
