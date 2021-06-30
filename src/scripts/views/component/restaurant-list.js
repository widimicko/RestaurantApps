import './restaurant-item'

class RestaurantList extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor () {
    super()
  }

  // eslint-disable-next-line accessor-pairs
  set restaurants (restaurants) {
    this._restaurants = restaurants
    this.render()
  }

  render () {
    this.innerHTML = ''
    this._restaurants.forEach(restaurant => {
      const restaurantItemElement = document.createElement('restaurant-item')
      restaurantItemElement.restaurant = restaurant
      this.appendChild(restaurantItemElement)
    })
  }

  renderError (message) {
    this.innerHTML = `
        <style>
             .placeholder {
                   font-weight: lighter;
                   color: rgba(0,0,0,0.5);
                   -webkit-user-select: none;
                   -moz-user-select: none;
                   -ms-user-select: none;
                   user-select: none;
               }
        </style>`
    this.innerHTML += `<h2 class="placeholder">${message}</h2>`
  }
}

customElements.define('restaurant-list', RestaurantList)
