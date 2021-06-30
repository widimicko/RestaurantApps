import FavoriteRestaurant from '../../data/FavoriteRestaurant'
import '../component/restaurant-list'

const Favorite = {
  async render () {
    return `
      <center>
        <h1 style="margin-top: 2em;">Favorite Restaurant</h1>
      </center>

      <restaurant-list id="restaurants" class="restaurants">
        <div class="loader"></div>
      </restaurant-list>
    `
  },

  async afterRender () {
    const RestaurantListElement = document.querySelector('#restaurants')
    const renderResult = results => {
      RestaurantListElement.restaurants = results
    }

    const fallbackResult = message => {
      RestaurantListElement.renderError(message)
    }

    try {
      const result = await FavoriteRestaurant.getAllRestaurants()
      document.querySelector('.loader').remove()
      if (result.length === 0) {
        RestaurantListElement.innerHTML = '<center><p>No favorite restaurant saved</center></p>'
      } else {
        renderResult(result)
      }
    } catch (message) {
      fallbackResult(message)
    }
  }
}

export default Favorite
