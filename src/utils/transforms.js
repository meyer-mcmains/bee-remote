import { get } from 'dot-prop';

export const merge = (oldData, newData, id, ignoreId) => [
  ...oldData.map(oldItem => {
    const shouldMerge = newData.find(newItem => newItem[id] === oldItem[id]);
    if (shouldMerge) {
      return union(
        oldData.filter(item => item[id] === shouldMerge[id])[0],
        shouldMerge,
        ignoreId
      );
    } else {
      console.log(oldItem);
      return oldItem;
    }
  })
];

const union = (oldData, newData, keyToKeep) => {
  return { ...oldData, ...newData, [keyToKeep]: oldData[keyToKeep] };
};

/**
 * Update a value in an array if it has a matching field
 * @param  {Array} items      Array to update
 * @param  {String} field     Field name to compare
 * @param  {Any} id           Value field must be equal to
 * @param  {Function} update  Update function to run on matching items
 * @return {Array}            Updated array
 */
export const updateByField = (items, field, id, update) =>
  items.map(item => (get(item, field) === id ? update(item) : item));
