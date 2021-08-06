import axios from 'axios';

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const cardDiv = document.createElement('div');
  const headlineDiv = document.createElement('div');
  const authorDiv = document.createElement('div');
  const imgDiv = document.createElement('div');
  const imgURL = document.createElement('img');
  const authorSpan = document.createElement('span');

  headlineDiv.textContent = article.headline;
  imgURL.src = article.authorPhoto;
  authorSpan.textContent = article.authorName;

  cardDiv.classList.add('card');
  headlineDiv.classList.add('headline');
  authorDiv.classList.add('author');
  imgDiv.classList.add('img-container');

  cardDiv.appendChild(headlineDiv);
  cardDiv.appendChild(authorDiv);
  authorDiv.appendChild(imgDiv);
  imgDiv.appendChild(imgURL);
  authorDiv.appendChild(authorSpan);

  cardDiv.addEventListener('click', event => {
    console.log(article.headline);
  })

  return cardDiv;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios.get(`http://localhost:5000/api/articles`)
  .then(response => {
    // console.log(response);
    const bootstrap = response.data.articles.bootstrap;
    const javascript = response.data.articles.javascript;
    const jquery = response.data.articles.jquery;
    const node = response.data.articles.node;
    const technology = response.data.articles.technology;

    const selected = document.querySelector(selector);

    bootstrap.forEach(item => {
      selected.appendChild(Card(item));
    })

    javascript.forEach(item => {
      selected.appendChild(Card(item));
    })

    jquery.forEach(item => {
      selected.appendChild(Card(item));
    })

    node.forEach(item => {
      selected.appendChild(Card(item));
    })

    technology.forEach(item => {
      selected.appendChild(Card(item));
    })
  })
  .catch(error => {
    console.error(error);
  })
}

export { Card, cardAppender }
