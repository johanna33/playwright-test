import { faker } from '@faker-js/faker';

export const transferData = {
    amount: faker.number.int({ min: 1, max: 1000 }),
    fromAccount: '13344',
    toAccount: '13455'
}