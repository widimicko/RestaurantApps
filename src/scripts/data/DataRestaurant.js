import API_ENDPOINT from '../globals/API_ENDPOINT'

class DataRestaurant {
  static async getRestaurants () {
    try {
      const response = await fetch(API_ENDPOINT.restaurant)
      const responseJson = await response.json()
      return responseJson
    } catch (error) {
      console.error(error)
    }
  }

  static async getDetailRestaurant (id) {
    try {
      const response = await fetch(API_ENDPOINT.detail(id))
      return response.json()
    } catch (error) {
      console.error(error)
    }
  }

  static async AddReviewRestaurant (data) {
    try {
      await fetch(API_ENDPOINT.addReview, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': '12345'
        },
        body: JSON.stringify(data)
      })
    } catch (error) {
      console.error(error)
    }
  }

  static async searchRestaurants (query) {
    try {
      const response = await fetch(API_ENDPOINT.search(query))
      const responseJson = await response.json()
      return responseJson
    } catch (error) {
      console.error(error)
    }
  }
}

export default DataRestaurant
