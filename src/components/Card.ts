import { CardsSlots } from ".";
import { getElement } from "../utils";
import { CARD_TEMPLATE, CARDDATA, Slot } from "../models";

type TargetSlot = "todo-slot" | "progress-slot" | "done-slot";

export class Card {
  constructor(title: string, text: string, targetSlotId: TargetSlot, template: HTMLTemplateElement) {
    const clone = template.content.cloneNode(true) as HTMLElement;
    const cardEl = clone.firstElementChild as HTMLElement;
    const cardTitle = cardEl.querySelector(CARD_TEMPLATE.TITLE) as HTMLElement;
    const cardText = cardEl.querySelector(CARD_TEMPLATE.TEXT) as HTMLElement;

    cardTitle.innerText = title;
    cardText.innerText = text;
    cardEl.id = Math.floor(Math.random() * Date.now()).toString();
    cardEl.draggable = true;

    const cardSlots = CardsSlots.getInstance();
    this.listenDrag(cardEl, cardSlots.slots);

    cardSlots.atatch("beforeend", cardSlots.getSlot(cardSlots.slots, targetSlotId), cardEl);
  }

  private listenDrag(cardEl: HTMLElement, slotsList: Slot[]) {
    // Drag Actions
    const dragStart = function(event: DragEvent) {
      const target = event.currentTarget as HTMLElement;

      if (event.dataTransfer && target.parentElement) {
        event.dataTransfer.setData(CARDDATA.ELEMENTID, target.id)
        event.dataTransfer.setData(CARDDATA.PARENTID, target.parentElement.id)
      }

      addDropableStyle(slotsList);

      target.classList.add("dragging");
    }
    const dragEnd = function(event: DragEvent) {
      event.preventDefault();
      const target = event.currentTarget as HTMLElement;

      removeDropableStyle(slotsList);
      target.classList.remove("dragging");
    }

    // Drag Styles
    const addDropableStyle = function(slots: Slot[]) {
      for (let slot of slots) {
        slot.element.classList.add("dropable");
      }
    }
    const removeDropableStyle = function(slots: Slot[]) {
      for (let slot of slots) {
        slot.element.classList.remove("dropable");
      }
    }

    cardEl.addEventListener("dragstart", dragStart);
    cardEl.addEventListener("dragend", dragEnd);
  }
}
