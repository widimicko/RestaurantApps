import LikeButtonPresenter from '../../src/scripts/utils/LikeButtonPresenter'
import FavoriteRestaurant from '../../src/scripts/data/FavoriteRestaurant'

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestaurant: FavoriteRestaurant,
    restaurant
  })
}

export { createLikeButtonPresenterWithRestaurant }
