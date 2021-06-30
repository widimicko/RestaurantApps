import DataRestaurant from '../../data/DataRestaurant'
import '../component/restaurant-list'
import { createSkeletonRestaurantTemplate } from '../component/template-creator'

const Restaurants = {
  async render () {
    return `
      <div class="hero">
        <div class="hero__inner">
          <h1 class="hero__title">Join Us, Register your restaurant and to be known</h1>
          <p class="hero__tagline">Explore a thausand of restaurant information served</p>
        </div>
      </div>

      <center>
        <h1>Explore Restaurant</h1>
        <div style="padding-left: 10%; padding-right: 10%;">
          <input type="text" placeholder="Search" />
          <span id="search-status"></span>
        </div>
      </center>

      <restaurant-list id="restaurants" class="restaurants">
        ${createSkeletonRestaurantTemplate(6)}
      </restaurant-list>
    `
  },

  async afterRender () {
    const restaurantListElement = document.querySelector('#restaurants')
    const searchElement = document.querySelector('input')
    const statusElement = document.querySelector('#search-status')

    const renderResult = results => {
      restaurantListElement.restaurants = results
    }

    const fallbackResult = message => {
      restaurantListElement.renderError(message)
    }

    searchElement.addEventListener('keyup', async (e) => {
      try {
        showSkeleton(restaurantListElement)
        const result = await DataRestaurant.searchRestaurants(e.target.value)

        if (result.founded === 0) {
          document.querySelector('.skeleton').remove()
          statusElement.innerHTML = '<p>No restaurant found</p>'
        } else {
          statusElement.innerHTML = `<p>${result.founded} Restaurant founded</p>`
          renderResult(result.restaurants)
        }
      } catch (message) {
        fallbackResult(message)
      }
    })

    try {
      const result = await DataRestaurant.getRestaurants()
      document.querySelector('.skeleton').remove()
      renderResult(result.restaurants)
    } catch (message) {
      fallbackResult(message)
    }
  }
}

const showSkeleton = element => {
  element.innerHTML = createSkeletonRestaurantTemplate(6)
}

export default Restaurants
