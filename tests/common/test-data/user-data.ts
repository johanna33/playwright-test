import { UserAccountData } from "../interfaces/user-interface";
import { faker } from "@faker-js/faker";

/*Note: The credentials were added here for this demo, in a real scenario, they will be stored in a .env file
*       or a vault in case of a CI/CD pipeline, for security reasons.
*/
export const credentials = {
    username: 'mary22',
    password: 'test1234'
};

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
    password: faker.internet.password( { length: 6 })
}