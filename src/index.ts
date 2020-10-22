import "./index.scss";

class TodoCardInput {
  readonly titleInputEl: HTMLElement;
  readonly textInputEl: HTMLElement;

  constructor(titleId: string, textId: string) {
    this.titleInputEl = this.getElement(titleId);
    this.textInputEl = this.getElement(textId);

    this.addPlaceholder(this.titleInputEl);
    this.addPlaceholder(this.textInputEl);
  }

  private getElement(queryId: string) {
    let element = document.getElementById(queryId);
    if (element) {
      return element;
    }
    console.error(`"${queryId}" is not a valid id.`);
    return document.createElement("br") as HTMLElement;
  }

  private addPlaceholder(inputEl: HTMLElement) {
    function handlePlaceholder(event: Event) {
      const target = event.target as HTMLElement;
      if (!!target.innerText) {
        target.classList.add("has-content");
      } else {
        target.classList.remove("has-content");
      }
    }

    inputEl.addEventListener('input', handlePlaceholder)
  }

}

const todoCardInput = new TodoCardInput('title-input', "text-input");
