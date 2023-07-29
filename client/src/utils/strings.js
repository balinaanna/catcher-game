export function generateObjectId(obj) {
  let id;
  do {
    id = (Math.random() + 1).toString(36).substring(7);
  } while(obj.id);

  return id;
}
