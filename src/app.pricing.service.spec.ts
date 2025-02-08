import { faker } from "@faker-js/faker";
import { PouchPrice } from "../data";
import { PricingService } from "./app.pricing.service";
import { Cat } from "./types";

describe("PricingService", () => {
  let service: PricingService;
  const cats: Cat[] = [
    {
      name: faker.person.firstName(),
      subscriptionActive: true,
      breed: faker.animal.cat(),
      pouchSize: "B",
    },
    {
      name: faker.person.firstName(),
      subscriptionActive: true,
      breed: faker.animal.cat(),
      pouchSize: "B",
    },
    {
      name: faker.person.firstName(),
      subscriptionActive: true,
      breed: faker.animal.cat(),
      pouchSize: "F",
    },
    {
      name: faker.person.firstName(),
      subscriptionActive: false,
      breed: faker.animal.cat(),
      pouchSize: "D",
    },
  ];

  beforeEach(() => {
    service = new PricingService(cats);
  });

  describe("getTotalSubscriptionPrice", () => {
    it("returns the total subscription price, ignoring inactive cats", () => {
      const totalPrice = service.getTotalSubscriptionPrice();
      expect(totalPrice).toEqual(
        PouchPrice[cats[0].pouchSize] +
          PouchPrice[cats[1].pouchSize] +
          PouchPrice[cats[2].pouchSize]
      );
    });
  });

  describe("getPriceByPouchSize", () => {
    it("returns the correct price based on pouch size", () => {
      expect(service.getPriceByPouchSize("A")).toEqual(PouchPrice.A);
      expect(service.getPriceByPouchSize("B")).toEqual(PouchPrice.B);
      expect(service.getPriceByPouchSize("C")).toEqual(PouchPrice.C);
      expect(service.getPriceByPouchSize("D")).toEqual(PouchPrice.D);
      expect(service.getPriceByPouchSize("E")).toEqual(PouchPrice.E);
      expect(service.getPriceByPouchSize("F")).toEqual(PouchPrice.F);
    });
  });

  describe("filterInactiveCats", () => {
    it("returns only cats with an active subscription", () => {
      const filteredCats = service.filterInactiveCats();
      expect(filteredCats).toEqual([cats[0], cats[1], cats[2]]);
    });
  });
});
