import Project from "./Models/Project.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  projects = [new Project({
    name: 'Keepr'
    , body: 'Empower users to engage through Keeps and Vaults of their favorite keeps ',
    id: 0,
    siteLink: 'https://curbsyde.herokuapp.com/',
    gitHubLink: 'https://github.com/pburkett/curb-side-fork',
    images: ['keepr.png', 'keepr-modal.png'],
    techs: ['Vue', 'C#', 'DotNet', 'Auth0']
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
