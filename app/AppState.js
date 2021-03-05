import Project from "./Models/Project.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  projects = [new Project({
    name: 'Keepr', body: 'Empower users to engage through imagery, and Vaults of their favorites.', id: 0, images: ['keepr.png', 'keepr-modal.png']
  })]
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
