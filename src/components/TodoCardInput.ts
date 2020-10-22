const HAS_CONTENT = "has-content";

enum CARD_TEMPLATE {
  TEMPLATE_ID = 'card',
  TITLE = ".title",
  TEXT = ".text",
  TODO = "todo",
  PROGRESS = "progress",
  DONE = "done",
}

enum TARGET_SLOT {
  TODO = "todo-slot",
  PROGRESS = "progress-slot",
  DONE = "done-slot",
}

type InputHandler = (inputEl: HTMLElement) => void;

type InsertPosition = "afterbegin" | "beforeend";

export class TodoCardInput {
  readonly titleInputEl: HTMLElement;
  readonly textInputEl: HTMLElement;
  readonly createButtonEl: HTMLButtonElement;
  readonly templateEl: HTMLTemplateElement;

  constructor(titleId: string, textId: string, buttonId: string, templateId: string) {
    this.titleInputEl = this.getElement(titleId);
    this.textInputEl = this.getElement(textId);
    this.createButtonEl = this.getElement(buttonId) as HTMLButtonElement;
    this.templateEl = this.getElement(templateId) as HTMLTemplateElement;

    this.listenPlaceholder(this.titleInputEl, this.handlePlaceholder);
    this.listenPlaceholder(this.textInputEl, this.handlePlaceholder);
    this.listenCreateButton(this);
  }

  private listenPlaceholder(inputEl: HTMLElement, handler: InputHandler) {
    inputEl.addEventListener('input', () => {
      handler(inputEl);
    })
  }

  private handlePlaceholder(inputEl: HTMLElement) {
    if (!!inputEl.innerText) {
      inputEl.classList.add(HAS_CONTENT);
    } else {
      inputEl.classList.remove(HAS_CONTENT);
    }
  }

  private listenCreateButton(cardInput: TodoCardInput) {
    cardInput.createButtonEl.addEventListener('click', (event: Event) => {
      const title = cardInput.titleInputEl.innerText;
      const text = cardInput.textInputEl.innerText

      if (!title && !text) {
        return;
      }

      // Limpa e Adiciona placeholder
      cardInput.clearInputField(cardInput);

      // Cria o card
      const host = cardInput.getElement(TARGET_SLOT.TODO)
      cardInput.createCard(title, text, host, cardInput.templateEl);
    });
  }

  getElement(queryId: string) {
    let element = document.getElementById(queryId);
    if (element) {
      return element;
    }
    console.error(`"${queryId}" is not a valid id.`);
    return document.createElement("br") as HTMLElement;
  }

  clearInputField(cardInput: TodoCardInput) {
    cardInput.titleInputEl.innerText = "";
    cardInput.textInputEl.innerText = "";
    cardInput.titleInputEl.classList.remove(HAS_CONTENT);
    cardInput.textInputEl.classList.remove(HAS_CONTENT);
  }

  createCard(title: string, text: string, host: HTMLElement, template: HTMLTemplateElement) {
    const clone = template.content.cloneNode(true) as HTMLElement;
    const cardEl = clone.firstElementChild as HTMLElement;
    const cardTitle = cardEl.querySelector(CARD_TEMPLATE.TITLE)! as HTMLElement;
    const cardText = cardEl.querySelector(CARD_TEMPLATE.TEXT)! as HTMLElement;
    cardTitle.innerText = title;
    cardText.innerText = text;
    cardEl.classList.add(CARD_TEMPLATE.TODO);

    host.insertAdjacentElement("beforeend", cardEl);
  }
}
