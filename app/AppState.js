import Project from "./Models/Project.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  projects = [new Project({
    name: 'Keepr'
    , body: 'Empower users to engage through Keeps and Vaults of their favorite keeps ',
    id: 0,
    siteLink: 'https://curbsyde.herokuapp.com/',
    gitHubLink: 'https://github.com/pburkett/Keepr',
    images: ['./assets/img/keepr.png', './assets/img/keepr-modal.png'],
    techs: ['Vue', 'C#', 'DotNet', 'AuthO']
  }), new Project({
    name: 'Curbsyde'
    , body: 'Facilitate curbside pickup, online ordering, and customer service through a web application. ',
    id: 1,
    siteLink: 'https://curbsyde.herokuapp.com/#/',
    gitHubLink: 'https://github.com/pburkett/curb-side-fork',
    images: ['./assets/img/activeorders.png', './assets/img/checkout.png'],
    techs: ['Vue', 'Express.js', 'Socket.io', 'AuthO']
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
