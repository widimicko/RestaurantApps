import CONFIG from '../../globals/CONFIG'

class RestaurantItem extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor () {
    super()
  }

  // eslint-disable-next-line accessor-pairs
  set restaurant (restaurant) {
    this._restaurant = restaurant
    this.render()
  }

  render () {
    this.innerHTML = `
        <article class="restaurant">
          <img class="restaurant-image lazyload" data-src="${CONFIG.BASE_IMAGE_URL + this._restaurant.pictureId}" alt="${this._restaurant.name} Image">
          <div class="restaurant-content">
            <h1 class="restaurant-name"><a href="${`/#/detail/${this._restaurant.id}`}">${this._restaurant.name}</a></h1>
            <hr>
            <p class="restaurant-info">City: ${this._restaurant.city} - Rating: ${this._restaurant.rating}</p>
            <p class="restaurant-description">${this._restaurant.description}</p>
          </div>
        </article>`
  }
}

customElements.define('restaurant-item', RestaurantItem)
