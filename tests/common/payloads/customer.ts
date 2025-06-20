import { faker } from "@faker-js/faker";
import { credentials } from "../test-data/user-data";

export function getCustomerPayloadInJson() {
  return {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      phoneNumber: faker.string.numeric(10),
      ssn: faker.string.numeric(9),
    },
  };
}

export function getCustomerPayloadInFormUrlEncoded() {
  const formData = new URLSearchParams({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.string.numeric(10),
    ssn: faker.string.numeric(9),
    username: credentials.username,
    password: credentials.password,
  });
  return {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: formData.toString(),
  };
}
