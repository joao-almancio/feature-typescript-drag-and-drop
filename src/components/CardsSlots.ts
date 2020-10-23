import { getElement } from "../utils";
import { TARGET_SLOT } from "../models";

export class CardsSlots {
  readonly todoSlot: HTMLElement;
  readonly progressSlot: HTMLElement;
  readonly doneSlot: HTMLElement;

  private static instance: CardsSlots;

  static getInstance() {
    if (CardsSlots.instance) {
      return CardsSlots.instance
    }
    return CardsSlots.instance = new CardsSlots(TARGET_SLOT.TODO, TARGET_SLOT.PROGRESS, TARGET_SLOT.TODO);
  }

  private constructor(todoId: string, progressId: string, doneId: string) {
    this.todoSlot = getElement(todoId);
    this.progressSlot = getElement(progressId);
    this.doneSlot = getElement(doneId);
  }

  atatch(insertPosition: InsertPosition, target: HTMLElement, element: HTMLElement) {
    target.insertAdjacentElement(insertPosition, element);
  }
}
