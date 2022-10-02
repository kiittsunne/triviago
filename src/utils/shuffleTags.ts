export function shuffleTags(arr: any[]) {
  let idx = arr.length;
  while (idx) {
    const i = Math.floor(Math.random() * idx--);
    [arr[idx], arr[i]] = [arr[i], arr[idx]];
  }
  return arr;
}
