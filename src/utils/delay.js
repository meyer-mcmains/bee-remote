export const delay = (ms, value) =>
  new Promise(resolve => setTimeout(() => resolve(value), ms));

export const delayReject = (ms, error) =>
  new Promise((resolve, reject) => setTimeout(() => reject(error), ms));

export default delay;
