import AsyncStorage from '@react-native-async-storage/async-storage';

export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }
  return shuffledArray;
}

export async function checkIfDataCached(key: string): Promise<any> {
  try {
    const cachedData = await AsyncStorage.getItem(key);

    if (cachedData) {
      const {data, timestamp} = JSON.parse(cachedData);
      const thirtyMinutesInMilliseconds = 30 * 60 * 1000;

      if (Date.now() - timestamp < thirtyMinutesInMilliseconds) {
        return data;
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}

export async function chacheDatainAsync(key: string, data: any) {
  try {
    const cacheItem = JSON.stringify({data, timestamp: Date.now()});

    await AsyncStorage.setItem(key, cacheItem);
  } catch (error) {
    console.log('Hehe');
  }
}
