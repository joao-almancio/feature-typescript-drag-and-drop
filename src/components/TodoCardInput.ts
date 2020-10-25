import { Card } from "./Card";
import { getElement } from "../utils";
import { CardsSlots } from "./CardsSlots";

const HAS_CONTENT = "has-content";
type InputHandler = (inputEl: HTMLElement) => void;

export class TodoCardInput {
  readonly titleInputEl: HTMLElement;
  readonly textInputEl: HTMLElement;
  readonly createButtonEl: HTMLButtonElement;
  readonly templateEl: HTMLTemplateElement;

  constructor(titleId: string, textId: string, buttonId: string, templateId: string) {
    this.titleInputEl = getElement(titleId);
    this.textInputEl = getElement(textId);
    this.createButtonEl = getElement(buttonId) as HTMLButtonElement;
    this.templateEl = getElement(templateId) as HTMLTemplateElement;

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
      const cardSlot = CardsSlots.getInstance();
      new Card(title, text, "todo-slot", cardInput.templateEl);
    });
  }

  clearInputField(cardInput: TodoCardInput) {
    cardInput.titleInputEl.innerText = "";
    cardInput.textInputEl.innerText = "";
    cardInput.titleInputEl.classList.remove(HAS_CONTENT);
    cardInput.textInputEl.classList.remove(HAS_CONTENT);
  }
}
