/* eslint-disable no-undef */
import FavoriteRestaurant from '../src/scripts/data/FavoriteRestaurant'
import * as TestFactories from './helpers/TestFactories'

describe('Unliking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>'
  }

  beforeEach(async () => {
    addLikeButtonContainer()
    await FavoriteRestaurant.putRestaurant({ id: 1 })
  })

  afterEach(async () => {
    await FavoriteRestaurant.deleteRestaurant(1)
  })

  it('should display unlike widget when the Restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 })

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy()
  })

  it('should not display like widget when the Restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 })

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy()
  })

  it('should be able to remove liked Restaurant from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 })

    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'))

    expect(await FavoriteRestaurant.getAllRestaurants()).toEqual([])
  })

  it('should not throw error if the unliked Restaurant is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 })

    // hapus dulu restoran dari daftar restoran yang disukai
    await FavoriteRestaurant.deleteRestaurant(1)

    // kemudian, simulasikan pengguna menekan widget batal menyukai restoran
    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'))

    expect(await FavoriteRestaurant.getAllRestaurants()).toEqual([])
  })
})
