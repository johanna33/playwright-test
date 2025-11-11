import { UserAccountData } from "../interfaces/user-interface";
import { faker } from "@faker-js/faker";

 export function getCredentials() { 
  if (!process.env.USER_NAME || !process.env.PASSWORD) {
    throw new Error(
      `The USER_NAME and PASSWORD are missing in the .env file.`
    );
  }
  const credentials = {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
  };
  return credentials;
}

export const newUser: UserAccountData = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  street: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
  zipCode: faker.location.zipCode(),
  phoneNumber: faker.string.numeric(10),
  ssn: faker.string.numeric(9),
  username: faker.string.alphanumeric(6),
  password: faker.internet.password({ length: 6 }),
};
