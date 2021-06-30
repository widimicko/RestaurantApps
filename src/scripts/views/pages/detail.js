import UrlParser from '../../routes/url-parser'
import DataRestaurant from '../../data/DataRestaurant'
import '../component/restaurant-detail'
import LikeButtonInitiator from '../../utils/LikeButtonInitiator'

const Detail = {
  async render () {
    return `
      <center id="loader"><div class="loader"></div></center>
      <restaurant-detail id="restaurantDetail" class="restaurantDetail"></restaurant-detail>
      <div id="likeButtonContainer"></div>
    `
  },

  async afterRender () {
    const restaurantElement = document.querySelector('#restaurantDetail')
    const renderResult = result => {
      restaurantElement.restaurant = result
    }

    const fallbackResult = message => {
      restaurantElement.renderError(message)
    }

    const postNewReview = (data, statusElement, reviewsContainer) => {
      DataRestaurant.AddReviewRestaurant(data)
        .then(() => {
          statusElement.innerHTML = '<p style="color:green">Success submitted</p>'
          reviewsContainer.innerHTML += `
            <hr>
            <p>By : ${data.name}</p>
            <p>Review : ${data.review}</p>
            <p>Submitted : Just Now</p>
          `
        })
        .catch((error) => {
          statusElement.innerHTML = '<p style="color: red;">Error submitting your review, try again</p>'
          console.error(error)
        })
    }

    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner()
      const result = await DataRestaurant.getDetailRestaurant(url.id)
      document.querySelector('#loader').remove()
      renderResult(result.restaurant)

      const form = document.querySelector('#form-review')
      const statusElement = document.querySelector('#reviewStatus')
      const reviewsContainer = document.querySelector('.reviews-container')

      form.addEventListener('submit', (event) => {
        event.preventDefault()
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries())
        const onlineStatus = window.navigator.onLine

        if (!onlineStatus) {
          statusElement.innerHTML = '<p style="color: red;">You are now offline, Check your internet connection</p>'
        } else if (!data.name && !data.review) {
          statusElement.innerHTML = '<p style="color: red;">Fill form corectly!</p>'
        } else if (!data.name) {
          statusElement.innerHTML = '<p style="color: red;">Provide your name!</p>'
        } else if (!data.review) {
          statusElement.innerHTML = '<p style="color: red;">Provide your review!</p>'
        } else if (data.name && data.review && onlineStatus) {
          postNewReview(data, statusElement, reviewsContainer)
        }
      })

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: result.restaurant.id,
          name: result.restaurant.name,
          description: result.restaurant.description,
          city: result.restaurant.city,
          customerReviews: result.restaurant.customerReviews,
          rating: result.restaurant.rating,
          menus: result.restaurant.menus,
          categories: result.restaurant.categories,
          pictureId: result.restaurant.pictureId,
          address: result.restaurant.address
        }
      })
    } catch (message) {
      fallbackResult(message)
    }
  }
}

export default Detail
