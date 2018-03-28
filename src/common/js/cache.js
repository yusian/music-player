import storage from 'good-storage'

const SEARCH_KEY = '__search__';
const SEARCH_MAX_LENGTH = 15;

function insertArray(array, value, compareFun, maxLen) {
  let index = array.findIndex(compareFun);
  if (index === 0) return;
  if (index > 0) array.splice(index, 1);
  array.unshift(value);
  if (maxLen && (array.length > maxLen)) array.pop();
}

function deleteArray(array, compareFun) {
  let index = array.findIndex(compareFun);
  if (index < 0) return;
  array.splice(index, 1);
}

export function saveSearch(value) {
  let array = storage.get(SEARCH_KEY, []);
  insertArray(array, value, historyItem => {
    return historyItem === value;
  }, SEARCH_MAX_LENGTH);
  storage.set(SEARCH_KEY, array);
  return array;
}
export function deleteSearch(value) {
  let array = storage.get(SEARCH_KEY, []);
  deleteArray(array, historyItem => {
    return historyItem === value;
  })
  storage.set(SEARCH_KEY, array);
  return array;
}
export function clearSearch() {
  storage.remove(SEARCH_KEY);
  return []
}
export function loadSearch() {
  return storage.get(SEARCH_KEY, []);
}
