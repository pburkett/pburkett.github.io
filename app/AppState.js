import Project from "./Models/Project.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  projects = [new Project({
    name: 'Keepr'
    , body: 'Empower users to engage through Keeps and Vaults of their favorite keeps.',
    id: 0,
    siteLink: 'https://curbsyde.herokuapp.com/',
    gitHubLink: 'https://github.com/pburkett/Keepr',
    images: ['./assets/img/keepr.png', './assets/img/keepr-modal.png'],
    techs: ['Vue', 'C#', 'DotNet', 'AuthO', 'Figma']
  }), new Project({
    name: 'Curbsyde'
    , body: 'Facilitate curbside pickup, online ordering, and customer service through a web application. ',
    id: 1,
    siteLink: 'https://curbsyde.herokuapp.com/#/',
    gitHubLink: 'https://github.com/pburkett/curb-side-fork',
    images: ['./assets/img/activeorders.png', './assets/img/checkout.png'],
    techs: ['Vue', 'Express.js', 'Socket.io', 'AuthO']
  }), new Project({
    name: 'Formulator'
    , body: 'Expedite daily recipe calculations for commercial bakeries.',
    id: 2,
    siteLink: 'https://pburkett.github.io/bread-calculator-web-app/',
    gitHubLink: 'https://github.com/pburkett/bread-calculator-web-app',
    images: ['./assets/img/formulator.png', './assets/img/formulator-results.png'],
    techs: ['JavaScript', 'HTML', 'CSS']
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
