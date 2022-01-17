import CONFIG from './CONFIG'

const API_ENDPOINT = {
  restaurant: `${CONFIG.BASE_URL}list`,
  detail: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  addReview: `${CONFIG.BASE_URL}review`,
  search: (query) => `${CONFIG.BASE_URL}search?q=${query}`
}

export default API_ENDPOINT
