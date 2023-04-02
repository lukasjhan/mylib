const get = <K extends string | number, V>(
  record: Record<K, V>,
  key: K,
): V | undefined => {
  return record[key];
};

const set = <K extends string | number, V>(
  record: Record<K, V>,
  key: K,
  value: V,
) => {
  record[key] = value;
};

const remove = <K extends string | number, V>(
  record: Record<K, V>,
  removedKey: K,
) => {
  delete record[removedKey];
};

export const RecordUtil = {
  get,
  set,
  remove,
};
