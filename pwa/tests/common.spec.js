import {getDaysBetweenDates} from "../utils/common";

test('days between 01/05/2021 and 16/05/2021 should return 15 days', () => {
  expect(getDaysBetweenDates(new Date(2021, 5, 1), new Date(2021, 5, 16))).toBe(15)
})

test('days between 16/05/2021 and 01/05/2021 should return 15 days', () => {
  expect(getDaysBetweenDates(new Date(2021, 5, 16), new Date(2021, 5, 1))).toBe(15)
})

test('days between 01/01/2021 and 01/01/2022 should return 365 days', () => {
  expect(getDaysBetweenDates(new Date(2021, 1, 1), new Date(2022, 1, 1))).toBe(365)
})

test('parseJwt should return a json object', () => {
  expect(0).toBe(1)
})

test('getUserIdFromJwt should return an integer with value X', () => {
  expect(0).toBe(1)
})

test('dateToFormString should return date in format yyyy-mm-dd', () => {
  expect(0).toBe(1)
})