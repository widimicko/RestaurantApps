/* eslint-disable space-before-function-paren */
import { openDB } from 'idb'
import CONFIG from '../globals/CONFIG'

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' })
  }
})

const FavoriteRestaurant = {
  async getRestaurant(id) {
    if (!id) {
      return
    }
    return (await dbPromise).get(OBJECT_STORE_NAME, id)
  },
  async getAllRestaurants() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME)
  },
  async putRestaurant(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      return
    }
    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant)
  },
  async deleteRestaurant(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id)
  }
}

export default FavoriteRestaurant
