export function getElement(queryId: string) {
  let element = document.getElementById(queryId);
  if (element) {
    return element;
  }
  console.error(`"${queryId}" is not a valid id.`);
  return document.createElement("br") as HTMLElement;
}
