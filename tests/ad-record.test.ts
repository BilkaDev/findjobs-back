import { AdRecord } from '../records/ad.record';
import { AdEntity } from '../types';

const defaultObj: AdEntity = {
  date: new Date(),
  id: '',
  creatorId: '123456789012345678901234567890123456',
  lat: 123456789,
  lon: 123456789,
  name: 'Company name',
  image: 'http://image.com',
  title: 'Title ads',
  address: 'Katowice, mariacka 10',
  salaryMin: 1000,
  salaryMax: 10000,
  technology: 'JS,React',
  email: 'example@example.com',
  description:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum is simply dummy text of the printing and typesetting industry',
};

test('Can build AdRecord', () => {
  const ad = new AdRecord(defaultObj);

  expect(ad.name).toBe('Company name');
  expect(ad.title).toBe('Title ads');
  expect(ad.creatorId).toBe('123456789012345678901234567890123456');
  expect(ad.lat).toBe(123456789);
  expect(ad.lon).toBe(123456789);
  expect(ad.salaryMin).toBe(1000);
  expect(ad.salaryMax).toBe(10000);
  expect(ad.address).toBe('Katowice, mariacka 10');
  expect(ad.title).toBe('Title ads');
  expect(ad.technology).toBe('JS,React');
  expect(ad.email).toBe('example@example.com');
  expect(ad.description).toBe(
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum is simply dummy text of the printing and typesetting industry',
  );
});

test('validate invalid price', () => {
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        salaryMin: -3,
      }),
  ).toThrow('the price cannot be less than 0 or more than 9999999');
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        salaryMin: 10000000,
      }),
  ).toThrow('the price cannot be less than 0 or more than 9999999');
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        salaryMax: -3,
      }),
  ).toThrow('the price cannot be less than 0 or more than 9999999');
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        salaryMax: 10000000,
      }),
  ).toThrow('the price cannot be less than 0 or more than 9999999');
});
test('validate invalid name', () => {
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        name: undefined,
      }),
  ).toThrow('Company name cannot be blank or exceed 30 characters');
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        name: '1234567890123456789012345678901',
      }),
  ).toThrow('Company name cannot be blank or exceed 30 characters');
});
test('validate invalid title', () => {
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        title: undefined,
      }),
  ).toThrow('Ad title cannot be blank or exceed 50 characters');
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        title: '12345678901234567890123456789011234567890123456789012345678901',
      }),
  ).toThrow('Ad title cannot be blank or exceed 50 characters');
});
test('validate invalid address', () => {
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        address: undefined,
      }),
  ).toThrow('Address cannot be blank or exceed 100 characters');
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        address:
          '123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901',
      }),
  ).toThrow('Address cannot be blank or exceed 100 characters');
});
test('validate invalid technology', () => {
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        technology: undefined,
      }),
  ).toThrow('Technology cannot be blank or exceed 100 characters');
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        technology:
          '123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901',
      }),
  ).toThrow('Technology cannot be blank or exceed 100 characters');
});
test('validate invalid description', () => {
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        description: undefined,
      }),
  ).toThrow('Description cannot be blank or exceed 1000 characters');
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        description:
          '123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901',
      }),
  ).toThrow('Description cannot be blank or exceed 1000 characters');
});
test('validate invalid email', () => {
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        email: undefined,
      }),
  ).toThrow('E-mail cannot be blank or exceed 100 characters');
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        email:
          '123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901123456789012345678901234567890112345678901234567890123456789011234567890123456789012345678901',
      }),
  ).toThrow('Company name cannot be blank or exceed 100 characters');
});
test('validate invalid creatorId', () => {
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        creatorId: undefined,
      }),
  ).toThrow('creator id cannot be blank');
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        creatorId: '1234567890123456789012345',
      }),
  ).toThrow('creator id cannot be blank');
});
test('validate invalid lat and lot', () => {
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        lat: undefined,
      }),
  ).toThrow('The ad cannot be located.');
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        lon: undefined,
      }),
  ).toThrow('The ad cannot be located.');
});
