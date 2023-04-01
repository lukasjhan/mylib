export function getFileSizeString(size: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const power = Math.floor(Math.log(size) / Math.log(1024));
  return `${(size / Math.pow(1024, power)).toFixed(1)} ${units[power]}`;
};