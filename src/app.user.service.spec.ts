import { faker } from "@faker-js/faker";
import { UserService } from "./app.user.service";
import { CatPouchSize } from "./types";

describe("UserService", () => {
  let service: UserService;
  const users = [
    {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      cats: [
        {
          name: faker.person.firstName(),
          subscriptionActive: true,
          breed: faker.animal.cat(),
          pouchSize: CatPouchSize.A,
        },
      ],
    },
    {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      cats: [
        {
          name: faker.person.firstName(),
          subscriptionActive: false,
          breed: faker.animal.cat(),
          pouchSize: CatPouchSize.B,
        },
        {
          name: faker.person.firstName(),
          subscriptionActive: true,
          breed: faker.animal.cat(),
          pouchSize: CatPouchSize.C,
        },
      ],
    },
  ];

  beforeEach(async () => {
    service = new UserService(users);
  });

  describe("findOne", () => {
    it("return a user based on id", () => {
      const user = service.findOne(users[0].id);
      expect(user?.id).toEqual(users[0].id);
    });

    it("returns null if user not found", () => {
      const user = service.findOne(faker.string.uuid());
      expect(user).toBeNull();
    });
  });
});
