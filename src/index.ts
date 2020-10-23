import "./index.scss";
import { TodoCardInput, CardsSlots } from "./components";

const todoCardInput = new TodoCardInput('title-input', "text-input", "create", "card");
const slots = CardsSlots.getInstance();
