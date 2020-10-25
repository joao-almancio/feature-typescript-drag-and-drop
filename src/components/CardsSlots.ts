import { getElement } from "../utils";
import { TARGET_SLOT, CARDDATA, Slot } from "../models";

export class CardsSlots {
  readonly slots: Slot[] = [];

  private static instance: CardsSlots;

  static getInstance() {
    if (CardsSlots.instance) {
      return CardsSlots.instance
    }
    return CardsSlots.instance = new CardsSlots(TARGET_SLOT.TODO, TARGET_SLOT.PROGRESS, TARGET_SLOT.DONE);
  }

  private constructor(...slotsId: string[]) {
    for (let slotId of slotsId) {
      const slotEl = getElement(slotId)
      this.slots.push({ element: slotEl, id: slotId });
      this.listenDrop(slotEl);
    }
  }

  atatch(insertPosition: InsertPosition, target: HTMLElement, element: HTMLElement) {
    target.insertAdjacentElement(insertPosition, element);
  }

  getSlot(slotsArray: Slot[], slotId: string) {
    let element;
    for (let slot of slotsArray) {
      let id = slot.id;
      if (id !== slotId) {
        continue
      }
      return slot.element;
    }
    return slotsArray[0].element;
  }

  private listenDrop(dropableArea: HTMLElement) {
    const dragEnter = function (_event: DragEvent) {
      addDragOverStyle(dropableArea);
      console.log("enter");
    }

    const dragLeave = function (_event: DragEvent) {
      removeDragOverStyle(dropableArea);
      console.log("leave");
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

        if (oldParent !== newParent) {
          oldParent.removeChild(cardEl);
          newParent.insertAdjacentElement("afterbegin", cardEl);
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
