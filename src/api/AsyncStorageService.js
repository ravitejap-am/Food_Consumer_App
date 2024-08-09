import AsyncStorage from "@react-native-community/async-storage";


export const storeData = async (key, value) => {
  // await dataStore.write(() => {
  //   let dbObject = dataStore.objects('Storage').filtered('key = "' + key + '"')
  //   if (dbObject) {
  //     dataStore.delete(dbObject)
  //   }
  //   // console.log('Storing key ... ', key, value)
  //   dataStore.create('Storage', { key, value: JSON.stringify(value) })
  // })
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export const getData = async (key) => {
  let value = await AsyncStorage.getItem(key);
  let ret = JSON.parse(value)
  return ret;
  // try {
  //   // const value = await AsyncStorage.getItem(key);
  //   const values = dataStore.objects('Storage').filtered('key = "' + key + '"')
  //   for (let item of values) {
  //     return JSON.parse(item.value);
  //   }
  // } catch (error) {
  //   console.log("error", error)
  // }
  // return undefined;
}