import CONFIG from '../../globals/CONFIG'

class RestaurantDetail extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor () {
    super()
  }

  // eslint-disable-next-line accessor-pairs
  set restaurant (restaurant) {
    this._restaurant = restaurant
    this.render()
  }

  render () {
    this.innerHTML = `
      <div id="restaurant-detail">
        <h2 class="restaurant_name">${this._restaurant.name}</h2>
        <img class="restaurant_image" src="${CONFIG.BASE_IMAGE_URL + this._restaurant.pictureId}" alt="${this._restaurant.name}" />
        <h3>Information</h3>
        <div class="restaurant_info">
          <div>
            <h4>City</h4>
            <p>${this._restaurant.city}</p>
          </div>
          <div>
            <h4>Address</h4>
            <p>${this._restaurant.address}</p>
          </div>
          <div>
            <h4>Category</h4>
            <p>${this._restaurant.categories.map((category) => category.name).join(', ')}</p>
          </div>
          <div>
            <h4>Rating</h4>
            <p>${this._restaurant.rating}</p>
          </div>
        </div>
        <div class="restaurant_description">
          <h4>Description</h4>
          <p>${this._restaurant.description}</p>
        </div>
        <div class"restaurant_menus">
          <h4>Menu</h4>
          <h5>Foods</h5>
          <p>${this._restaurant.menus.foods.map((food) => food.name).join(', ')}<p>
          <h5>Drinks</h5>
          <p>${this._restaurant.menus.drinks.map((drink) => drink.name).join(', ')}<p>
        </div>
        <div class="restaurant_reviews">
          <h4>Review</h4>
          <h3>Submit your review about this restaurant!</h3>
          <span id="reviewStatus"></span>
          <div class="review-container">
            <form method="post" id="form-review">
              <input type="hidden" name="id" value="${this._restaurant.id}">
              <label for="name">Your Name</label>
              <input type="text" class="nameInput" name="name" placeholder="John Doe" aria-label="Add review form input">
              <label for="review">Review</label>
              <textarea name="review" class="reviewInput" placeholder="Such a good place"></textarea>
              <button id="submit-review">Submit</button>
            </form>
          </div>
          <br>
          <h3>Reviews</h3>
          <div class="reviews-container">
            ${this._restaurant.customerReviews.map((customer) => '<p>By : ' + customer.name + '</p><p>Review : ' + customer.review + '</p><p>Submitted : ' + customer.date + '</p>').join('<hr>')}
          </div>
        </div>
      </div>
    `
  }

  renderError (message) {
    this.innerHTML = `
        <style>
             .placeholder {
                   font-weight: lighter;
                   color: rgba(0,0,0,0.5);
                   -webkit-user-select: none;
                   -moz-user-select: none;
                   -ms-user-select: none;
                   user-select: none;
               }
        </style>`
    this.innerHTML += `<h2 class="placeholder">${message}</h2>`
  }
}

customElements.define('restaurant-detail', RestaurantDetail)
