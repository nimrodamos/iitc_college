// // Spread Operator with Arrays

// // Basic Array Operations (Beginner)

// // 1.
// const array = [1, 2, 3];
// const newArray = [...array];
// console.log(newArray);

// // 2.
// const array1 = [1, 2];
// const array2 = [3, 4];
// const combined = [...array1, ...array2];
// console.log(combined);

// // 3.
// const updatedArray1 = [0, ...array];
// console.log(updatedArray1);

// // 4.
// const updatedArray2 = [...array, 4];
// console.log(updatedArray2);

// // 5.
// const array3 = [5, 6];
// const merged = [...array1, ...array2, ...array3];
// console.log(merged);

// // 6.
// const newArrayWithElement = [...array, 4];
// console.log(newArrayWithElement);

// // 7.
// const withoutFirst = [...array.slice(1)];
// console.log(withoutFirst);

// // 8.
// const lastThree = [...merged.slice(-3)];
// console.log(lastThree);

// // 9.
// const reversed = [...array].reverse();
// console.log(reversed);

// // 10.
// const replaced = [array[0], 99, ...array.slice(2)];
// console.log(replaced);

// // Practical Scenarios (Intermediate)

// // 1.
// const str = "hello";
// const chars = [...str];
// console.log(chars);

// // 2.
// const nested = [
//   [1, 2],
//   [3, 4],
// ];
// const flattened = [...nested[0], ...nested[1]];
// console.log(flattened);

// // 3.
// const withoutLast = [...array.slice(0, -1)];
// console.log(withoutLast);

// // 4.
// const inserted = [...array.slice(0, 2), 99, ...array.slice(2)];
// console.log(inserted);

// // 5.
// const duplicates = [1, 2, 2, 3];
// const unique = [...new Set(duplicates)];
// console.log(unique);

// // 6.
// const middle = [...merged.slice(2, 4)];
// console.log(middle);

// // 7.
// const rotated = [...array.slice(1), array[0]];
// console.log(rotated);

// // 8.
// const combinedWithString = ["Hello", ...array];
// console.log(combinedWithString);

// // 9.
// const mergeArrays = (...arrays) => [].concat(...arrays);
// console.log(mergeArrays([1], [2], [3]));

// // 10.
// const shuffled = [...array].sort(() => Math.random() - 0.5);
// console.log(shuffled);

// // Spread Operator with Objects

// // Basic Object Operations (Beginner)

// // 1.
// const obj = { a: 1, b: 2 };
// const newObj = { ...obj };
// console.log(newObj);

// // 2.
// const obj1 = { a: 1 };
// const obj2 = { b: 2 };
// const mergedObjects = { ...obj1, ...obj2 };
// console.log(mergedObjects);

// // 3.
// const updatedObj = { ...obj, b: 99 };
// console.log(updatedObj);

// // 4.
// const addedProperty = { ...obj, c: 3 };
// console.log(addedProperty);

// // 5.
// const obj3 = { c: 3 };
// const mergedThreeObjects = { ...obj1, ...obj2, ...obj3 };
// console.log(mergedThreeObjects);

// // 6.
// const shallowCopy = { ...obj };
// console.log(shallowCopy);

// // 7.
// const { b, ...rest } = obj;
// console.log(rest);

// // 8.
// const swapped = { ...obj, a: obj.b, b: obj.a };
// console.log(swapped);

// // 9.
// const extracted = { ...rest };
// console.log(extracted);

// // 10.
// const nestedObj = { x: 1, nested: { y: 2 } };
// const updatedNested = { ...nestedObj, nested: { ...nestedObj.nested, y: 99 } };
// console.log(updatedNested);

// // Practical Scenarios (Intermediate)

// // 1.
// const mergeObjects = (...objs) => Object.assign({}, ...objs);
// console.log(mergeObjects({ a: 1 }, { b: 2 }, { c: 3 }));

// // 2.
// const precedence = { ...obj1, ...obj2 };
// console.log(precedence);

// // 3.
// const withNested = { ...obj, nested: { key: "value" } };
// console.log(withNested);

// // 4.
// const { a, ...remaining } = obj;
// console.log(remaining);

// // 5.
// const cleanedObj = Object.fromEntries(
//   Object.entries({ a: 1, b: null, c: undefined, d: 2 }).filter(
//     ([_, value]) => value != null
//   )
// );
// console.log(cleanedObj);

// // 6.
// const defaultSettings = { theme: "light", notifications: true };
// const userConfig = { theme: "dark" };
// const finalSettings = { ...defaultSettings, ...userConfig };
// console.log(finalSettings);

// // 7.
// const skipProperty = (({ a, ...rest }) => rest)(mergedObjects);
// console.log(skipProperty);

// // 8.
// const deepUpdated = { ...nestedObj, nested: { ...nestedObj.nested, z: 3 } };
// console.log(deepUpdated);

// // 9.
// const keyValueArray = [
//   ["a", 1],
//   ["b", 2],
// ];
// const convertedObject = Object.fromEntries(keyValueArray);
// console.log(convertedObject);
