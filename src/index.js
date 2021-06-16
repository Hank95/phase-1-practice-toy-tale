let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
    // fetchToys("http://localhost:3000/toys");
  });
});

const fetchToys = function (url) {
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.forEach(buildCard))
    .catch((error) => console.error(error));
};
fetchToys("http://localhost:3000/toys");

const buildCard = function (toy) {
  const div = document.querySelector("#toy-collection");
  const card = document.createElement("div");
  card.className = "card";
  const h2 = document.createElement("h2");
  h2.innerText = toy.name;
  const img = document.createElement("img");
  img.src = toy.image;
  img.className = "toy-avatar";
  const pTag = document.createElement("p");
  pTag.innerText = `${toy.likes} Likes`;
  const button = document.createElement("button");
  button.textContent = "Like <3";
  button.className = "like-btn";
  button.id = toy.id;

  card.append(h2, img, pTag, button);
  div.append(card);

  button.addEventListener("click", (event) => {
    toy.likes = toy.likes + 1;
    pTag.textContent = `${toy.likes} Likes`;

    fetch(`http://localhost:3000/toys/${event.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: toy.likes,
      }),
    });
  });
};

// POST

document
  .querySelector(".add-toy-form")
  .addEventListener("submit", submitNewToy);

function submitNewToy(event) {
  event.preventDefault();
  console.log(event.target);

  let toy = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0,
  };

  postToy(toy);
}

function postToy(toy) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toy),
  })
    .then((res) => res.json())
    .then((json) => buildCard(json))
    .catch((error) => console.error(error));
}

// function patchLikes(id){

// }
