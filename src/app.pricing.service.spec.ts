import { faker } from "@faker-js/faker";
import { PouchPrice } from "../data";
import { PricingService } from "./app.pricing.service";
import { Cat, CatPouchSize } from "./types";

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

    it("returns 0 if there are no active cats", () => {
      const noActiveCatsService = new PricingService([
        { ...cats[0], subscriptionActive: false },
      ]);
      const totalPrice = noActiveCatsService.getTotalSubscriptionPrice();
      expect(totalPrice).toEqual(0);
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

  describe("hasFreeGift", () => {
    const serviceWithFreeGift = new PricingService([
      { ...cats[0], subscriptionActive: true, pouchSize: CatPouchSize.F },
      { ...cats[1], subscriptionActive: true, pouchSize: CatPouchSize.F },
    ]);

    const serviceWithoutFreeGift = new PricingService([
      { ...cats[0], subscriptionActive: true, pouchSize: CatPouchSize.F },
      { ...cats[1], subscriptionActive: false, pouchSize: CatPouchSize.F },
    ]);

    it("returns true if the total subscription price is greater than or equal to 120", () => {
      const hasFreeGift = serviceWithFreeGift.hasFreeGift();
      expect(hasFreeGift).toEqual(true);
    });

    it("returns false if the total subscription price is less than 120", () => {
      const hasFreeGift = serviceWithoutFreeGift.hasFreeGift();
      expect(hasFreeGift).toEqual(false);
    });
  });
});
