export function DeepCopy(obj) {
  const a = JSON.stringify(obj);
  const newobj = JSON.parse(a);
  return newobj;
}
