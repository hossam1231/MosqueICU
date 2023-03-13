export const getFromLocalStorage = async (key, type) => {
  try {
    const value = await AsyncStorage.getItem(`@storage_${key}`);
    if (value !== null) {
      // value previously stored
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
  }
};
