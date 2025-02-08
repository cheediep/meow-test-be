import { faker } from "@faker-js/faker";
import { TemplateValuesService } from "./app.template-values.service";
import { Cat } from "./types";

describe("TemplateValuesService", () => {
  let service: TemplateValuesService;
  const cats: Cat[] = [
    {
      name: faker.person.firstName(),
      subscriptionActive: true,
      breed: faker.animal.cat(),
      pouchSize: "A",
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
      pouchSize: "B",
    },
  ];

  beforeEach(() => {
    service = new TemplateValuesService();
  });

  describe("getNames", () => {
    it("returns the value correctly when there is only one name", () => {
      const names = service.getSentenceFormattedNames([cats[0].name]);
      expect(names).toEqual([cats[0].name]);
    });

    it("returns the value correctly when there are two names", () => {
      const names = service.getSentenceFormattedNames([
        cats[0].name,
        cats[1].name,
      ]);
      expect(names).toEqual([cats[0].name, cats[1].name]);
    });

    it("returns the value correctly when there are more than two names", () => {
      const names = service.getSentenceFormattedNames([
        cats[0].name,
        cats[1].name,
        cats[2].name,
      ]);
      expect(names).toEqual([cats[0].name, cats[1].name, cats[2].name]);
    });
  });
});
