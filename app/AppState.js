import Project from "./Models/Project.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  projects = [new Project({
    name: 'Keepr', body: 'Empower users to engage through imagery, and Vaults of their favorites.', id: 0, images: ['keepr.png', 'keepr-modal.png']
  }), new Project({
    name: 'Curb-Syde', body: 'Add value by facilitating curbside pickup, online ordering, and customer service.', id: 1, images: ['keepr.png']
  }), new Project({
    name: 'Keepr', body: 'Empower users to engage through imagery, and Vaults of their favorites.', id: 2, images: ['keepr.png', 'keepr.png']
  }), new Project({
    name: 'Keepr', body: 'Empower users to engage through imagery, and Vaults of their favorites.', id: 3, images: ['keepr.png', 'cs.png']
  }),]
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
