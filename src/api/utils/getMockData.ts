/**
 * Returns mocked data for a given user ID from a provided array of mock data objects.
 * @template T - A generic type extending an object with optional `userId` and `id` properties.
 * @param {T[]} mockedDataArray - An array of objects representing mocked data.
 * @param {number} userId - The user ID to search for in the array of mock data.
 * @returns {T} - The first object in the array with a matching `userId` or `id` property to the provided `userId`.
 * @throws {Error} - If the provided `userId` is not a number, or if no object is found with a matching `userId` or `id` property.
 */
export default function getMockData<T extends { userId?: number; id?: number }>(
  mockedDataArray: T[],
  userId: number
): T {
  if (Number.isNaN(userId)) {
    throw new Error(`L'identifiant utilisateur saisi ne respecte pas le format correct`);
  }
  const mockData = mockedDataArray.find((el) => el.userId ?? el.id === userId);
  if (!mockData) {
    throw new Error(`Les données du profil "${userId}" sont introuvables par le MOCK API`);
  }
  return mockData;
}
