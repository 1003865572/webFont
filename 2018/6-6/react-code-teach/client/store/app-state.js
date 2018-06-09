import {
  observable,
  computed,
  // autorun,
  action,
} from 'mobx';

export class AppState {
  @observable const = 0
  @observable name = 'Jokcy'

  @computed get msg() {
    return `${this.name} say count is ${this.const}`;
  }

  @action add() {
    this.const += 1
  }
  @action changeName(name) {
    this.name = name
  }
}

const appState = new AppState();

// autorun(() => {
//   console.log(appState.msg)
// })

export default appState
