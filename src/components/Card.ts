import { CardsSlots } from ".";
import { CARD_TEMPLATE } from "../models";

type targetSlot = "todo-slot" | "progress-slot" | "done-slot";

export class Card {
  constructor(title: string, text: string, targetSlot: HTMLElement, template: HTMLTemplateElement) {
    const clone = template.content.cloneNode(true) as HTMLElement;
    const cardEl = clone.firstElementChild as HTMLElement;
    const cardTitle = cardEl.querySelector(CARD_TEMPLATE.TITLE) as HTMLElement;
    const cardText = cardEl.querySelector(CARD_TEMPLATE.TEXT) as HTMLElement;

    cardTitle.innerText = title;
    cardText.innerText = text;
    cardEl.classList.add(CARD_TEMPLATE.TODO);
    cardEl.id = Math.floor(Math.random() * Date.now()).toString();
    cardEl.draggable = true;

    const slots = CardsSlots.getInstance();
    slots.atatch("beforeend", slots.todoSlot, cardEl);
  }
}
