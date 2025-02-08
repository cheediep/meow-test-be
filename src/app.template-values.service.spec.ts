import { faker } from "@faker-js/faker";
import { TemplateValuesService } from "./app.template-values.service";
import { Cat } from "./types";

describe("TemplateValuesService", () => {
  let service: TemplateValuesService;
  const cats: Cat[] = [
    {
      name: "Mia",
      subscriptionActive: true,
      breed: faker.animal.cat(),
      pouchSize: "A",
    },
    {
      name: "Grease",
      subscriptionActive: true,
      breed: faker.animal.cat(),
      pouchSize: "B",
    },
    {
      name: "Nala",
      subscriptionActive: true,
      breed: faker.animal.cat(),
      pouchSize: "B",
    },
    {
      name: "James",
      subscriptionActive: false,
      breed: faker.animal.cat(),
      pouchSize: "C",
    },
  ];

  beforeEach(() => {
    service = new TemplateValuesService();
  });

  describe("getSentenceFormattedNames", () => {
    it("returns the value correctly when there is only one name", () => {
      const names = service.getSentenceFormattedNames([cats[0].name]);
      expect(names).toEqual(`${cats[0].name}`);
    });

    it("returns the value correctly when there are two names", () => {
      const names = service.getSentenceFormattedNames([
        cats[0].name,
        cats[1].name,
      ]);
      expect(names).toEqual(`${cats[0].name} and ${cats[1].name}`);
    });

    it("returns the value correctly when there are more than two names", () => {
      const names1 = service.getSentenceFormattedNames([
        cats[0].name,
        cats[1].name,
        cats[2].name,
      ]);

      expect(names1).toEqual(
        `${cats[0].name}, ${cats[1].name} and ${cats[2].name}`
      );

      const names2 = service.getSentenceFormattedNames([
        cats[0].name,
        cats[1].name,
        cats[2].name,
        cats[3].name,
      ]);

      expect(names2).toEqual(
        `${cats[0].name}, ${cats[1].name}, ${cats[2].name} and ${cats[3].name}`
      );
    });
  });
});
