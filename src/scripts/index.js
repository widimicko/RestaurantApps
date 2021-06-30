import 'regenerator-runtime'
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'

import '../styles/main.css'
import '../styles/responsive.css'
import '../styles/detail.css'
import App from './views/App'
import swRegister from './utils/swRegister'

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navMenu'),
  content: document.querySelector('#main-content')
})

window.addEventListener('hashchange', () => {
  app.renderPage()
})

window.addEventListener('load', () => {
  app.renderPage()
  swRegister()
})
