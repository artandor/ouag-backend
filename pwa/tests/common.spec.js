import {dateToFormString, getDaysBetweenDates, getUserIdFromJwt, parseJwt} from "../utils/common";

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
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MjU1NzcwODcsImV4cCI6MTYyNTU4NDI4Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidXNlckBleGFtcGxlLmNvbSIsInVzZXJJZCI6NzQ5fQ.fu3o9VFI5Kf_DmVb5dV99y60R2LEckAKeYiLjnBlb4tUN43aG7HFKnbiJ8FEAkTHDyAi__w-Q7w4FJMxuILbgy5JMAMZN-TNt52ztFpyZ60f1Z9-Om4BmFlCHPGTPVINHVb5D87sUVTguvy4wja2R5qsJZ8jG9b-6k74op-5EhQFW-4b80gHClz-O7LWpHJnkL3mP0B0BE1mdhMA_7Qb0lDvhn1SFf3oMna3weBtMajjgDDyRyphgP6RYvy2KCiTkVHiv2DG1YZVyQ1dEAfoBwg055z-EcFR4mF9KDM-47sBcDBCqgQDkGXtJYS993MZDHUKKWPU65-tbP1oDS5mKElGMgzBKaKd8PKJTnWIQn3qM2xX8gkqxNJf2vvd57NYnJ70tekAlLftK_t6ypj1jJv2n8atRf--qAXR1qu3PhhgRInI_HgHv7NkDA5GA8uTcS2g9SzzDvSWX8TqryDhA2gOJOZIhy9bTTLyZD6EI91TuOdk9UbJ-292MYpk1Me_VvjULdZYRkA-Zj2Tw1Ruj9Utb9Fu4B3RGNNF5rxFqJjCeXbZAlHhuA5TADn2ziIJzEwcQFglzlgi0pEuu0qzre9Sc2l23Ku_Bwn7AoldSkZsiK_ACCFWYbl4LKujTX5gtqdCyJ3x7GZAAQA5-YFISrvtUHNJTSk9vbZ61Iwpulg'
  const jwtObject = parseJwt(token)
  expect(jwtObject).toBeTruthy()
  expect(jwtObject['iat']).toBeGreaterThan(1625577086)
})

test('getUserIdFromJwt should return an integer with value X', () => {
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MjU1NzcwODcsImV4cCI6MTYyNTU4NDI4Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidXNlckBleGFtcGxlLmNvbSIsInVzZXJJZCI6NzQ5fQ.fu3o9VFI5Kf_DmVb5dV99y60R2LEckAKeYiLjnBlb4tUN43aG7HFKnbiJ8FEAkTHDyAi__w-Q7w4FJMxuILbgy5JMAMZN-TNt52ztFpyZ60f1Z9-Om4BmFlCHPGTPVINHVb5D87sUVTguvy4wja2R5qsJZ8jG9b-6k74op-5EhQFW-4b80gHClz-O7LWpHJnkL3mP0B0BE1mdhMA_7Qb0lDvhn1SFf3oMna3weBtMajjgDDyRyphgP6RYvy2KCiTkVHiv2DG1YZVyQ1dEAfoBwg055z-EcFR4mF9KDM-47sBcDBCqgQDkGXtJYS993MZDHUKKWPU65-tbP1oDS5mKElGMgzBKaKd8PKJTnWIQn3qM2xX8gkqxNJf2vvd57NYnJ70tekAlLftK_t6ypj1jJv2n8atRf--qAXR1qu3PhhgRInI_HgHv7NkDA5GA8uTcS2g9SzzDvSWX8TqryDhA2gOJOZIhy9bTTLyZD6EI91TuOdk9UbJ-292MYpk1Me_VvjULdZYRkA-Zj2Tw1Ruj9Utb9Fu4B3RGNNF5rxFqJjCeXbZAlHhuA5TADn2ziIJzEwcQFglzlgi0pEuu0qzre9Sc2l23Ku_Bwn7AoldSkZsiK_ACCFWYbl4LKujTX5gtqdCyJ3x7GZAAQA5-YFISrvtUHNJTSk9vbZ61Iwpulg'
  localStorage.setItem('token', token)
  expect(getUserIdFromJwt())
})

test('dateToFormString should return date in format yyyy-mm-dd', () => {
  expect(dateToFormString(new Date('06/07/2021'))).toEqual('2021-06-07')
})
