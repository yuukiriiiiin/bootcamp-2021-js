import store from "../store.js";
import {deleteTodoAction, toggleStatusTodoAction} from '../flux/index.js'

class Todo {
  constructor(parent, { id, name, done }) {
    this.parent = parent;
    this.props = { id, name, done };
    this.mounted = false;
  }

  mount() {
    if (this.mounted) return;
    // TODO: ここにTODOの削除ボタンが押されたときの処理を追記
    this.element.querySelector('.todo-remove-button').addEventListener('click', (e) => {
      e.preventDefault();
      store.dispatch(deleteTodoAction(this.props.id))
    })
    // TODO: ここにTODOのチェックボックスが押されたときの処理を追記
    this.element.querySelector('.todo-toggle__checkmark').addEventListener('click', () => {
      store.dispatch(toggleStatusTodoAction({id: this.props.id, name: this.props.name, done: !this.props.done}))
    })
    this.mounted = true;
  }

  render() {
    const { id, name, done } = this.props;
    const next = document.createElement("li");
    next.className = "todo-item";
    next.innerHTML = `
      <label class="todo-toggle__container">
        <input
          data-todo-id="${id}"
          type="checkbox"
          class="todo-toggle"
          value="checked"
          ${done ? "checked" : ""}
        />
        <span class="todo-toggle__checkmark"></span>
      </label>
      <div class="todo-name">${name}</div>
      <div data-todo-id="${id}" class="todo-remove-button">x</div>
    `;
    if (!this.element) {
      this.parent.appendChild(next);
    } else {
      this.parent.replaceChild(this.element, next);
    }
    this.element = next;
    this.mount();
  }
}

export default Todo;
