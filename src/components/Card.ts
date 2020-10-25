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
    this.listenDrop(cardEl);

    cardSlots.atatch("beforebegin", cardSlots.getSlot(cardSlots.slots, targetSlotId), cardEl);
  }

  private listenDrag(cardEl: HTMLElement, slotsList: Slot[]) {
    // Drag Actions
    const dragStart = function (event: DragEvent) {
      const target = event.currentTarget as HTMLElement;

      event.dataTransfer?.setDragImage(target, 10, (target.scrollHeight * 0.5));

      if (event.dataTransfer && target.parentElement) {
        event.dataTransfer.setData(CARDDATA.ELEMENTID, target.id)
        event.dataTransfer.setData(CARDDATA.PARENTID, target.parentElement.id)
      }

      addDropableStyle(slotsList);

      target.classList.add("dragging");

      const cardContainer = getElement("task-list");
      cardContainer.classList.add("dragging");

      event.dataTransfer!.effectAllowed = "move"
    }
    const dragEnd = function (event: DragEvent) {
      event.preventDefault();
      const target = event.currentTarget as HTMLElement;

      removeDropableStyle(slotsList);
      target.classList.remove("dragging");

      const cardContainer = getElement("task-list");
      cardContainer.classList.remove("dragging");
    }

    // Drag Styles
    const addDropableStyle = function (slots: Slot[]) {
      for (let slot of slots) {
        slot.element.classList.add("dropable");
      }
    }
    const removeDropableStyle = function (slots: Slot[]) {
      for (let slot of slots) {
        slot.element.classList.remove("dropable");
      }
    }

    cardEl.addEventListener("dragstart", dragStart);
    cardEl.addEventListener("dragend", dragEnd);
  }

  private listenDrop(dropableArea: HTMLElement) {
    const dragEnter = function (event: DragEvent) {
      addDragOverStyle(dropableArea);
      event.dataTransfer!.dropEffect = "move"
    }

    const dragLeave = function (_event: DragEvent) {
      removeDragOverStyle(dropableArea);
    }

    const dragOver = function (event: DragEvent) {
      event.preventDefault();
    }

    const drop = function (event: DragEvent) {
      if (event.dataTransfer) {
        const elementId = event.dataTransfer.getData(CARDDATA.ELEMENTID);
        const oldParentId = event.dataTransfer.getData(CARDDATA.PARENTID);
        const cardEl = getElement(elementId);
        const oldParent = getElement(oldParentId);
        const newParent = event.currentTarget as HTMLElement;

        if (oldParent !== newParent && newParent !== cardEl) {
          oldParent.removeChild(cardEl);
          newParent.insertAdjacentElement("beforebegin", cardEl);
          removeDragOverStyle(oldParent);
          removeDragOverStyle(newParent);
        }
      }
    }

    // Drag Styles
    const addDragOverStyle = function (slot: HTMLElement) {
      slot.classList.add("dropable-over");
    }
    const removeDragOverStyle = function (slot: HTMLElement) {
      slot.classList.remove("dropable-over");
    }

    dropableArea.addEventListener("dragenter", dragEnter);
    dropableArea.addEventListener("dragleave", dragLeave);
    dropableArea.addEventListener("dragover", dragOver);
    dropableArea.addEventListener("drop", drop);
  }
}
