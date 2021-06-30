import Restaurants from '../views/pages/restaurants'
import Detail from '../views/pages/detail'
import Favorite from '../views/pages/favorite'

const routes = {
  '/': Restaurants,
  '/restaurants': Restaurants,
  '/detail/:id': Detail,
  '/favorite': Favorite
}

export default routes
