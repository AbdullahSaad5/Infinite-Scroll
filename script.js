// Unsplash API url
const count = 30;
const apiKey = "eCeE0M6G0Fw7eT9u1Tb_A-9qAkaXIcN4MW5CzHOavcw";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let photosData = [];
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let totalLoaded = 0;
let ready = false;

function imageLoaded() {
  totalLoaded++;
  if (totalLoaded === count) {
    ready = true;
    loader.style.display = "none";
  }
}
// Fetching data
async function getPhotos() {
  totalLoaded = 0;
  try {
    const response = await fetch(apiURL);
    photosData = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error.message);
  }
}

// Set Attributes function
function setAttributes(element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Load photos into HTML
function displayPhotos() {
  photosData.forEach((photo) => {
    //   Create anchor tag
    const link = document.createElement("a");
    setAttributes(link, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create image element
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imageLoaded);

    link.appendChild(img);
    imageContainer.appendChild(link);
  });
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
// On Load
getPhotos();
