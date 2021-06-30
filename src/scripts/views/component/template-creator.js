const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`
const createSkeletonRestaurantTemplate = (count) => {
  let template = ''

  for (let i = 0; i < count; i++) {
    template += `
      <div class="skeleton"></div>
  `
  }
  return template
}

export { createLikeButtonTemplate, createLikedButtonTemplate, createSkeletonRestaurantTemplate }
