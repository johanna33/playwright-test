import { faker } from "@faker-js/faker";

export const transferData = {
  amount: faker.string.numeric({ length: { min: 1, max: 6 } }),
  fromAccount: "13344",
  toAccount: "13455",
};
