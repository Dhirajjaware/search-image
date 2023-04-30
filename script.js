'use strict';

//Selecting Elements
const imgContainer = document.querySelector('.image-container');
const btnSearch = document.querySelector('.btn__search');
const inputName = document.querySelector('.input__name');
const imgLady = document.querySelector('.img-lady');
const navbar = document.getElementById('navbar');
const spinner = document.querySelector('.spinner');
const heading = document.querySelector('.title');

const apiKey = '47a60597e8msh27d3768a3c0a0ccp17bfb0jsn56c0cc5f8f4f';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'porn-gallery.p.rapidapi.com',
  },
};

//Create and render Image
const renderImage = function (imagePath) {
  return new Promise((resolve, reject) => {
    const image = document.createElement('img');
    image.src = imagePath;

    image.addEventListener('load', function () {
      imgContainer.append(image);
      resolve(image);
    });

    image.addEventListener('error', function () {
      reject(new Error('Image not found'));
      const p = document.createElement('p');
      p.innerText = 'Image not found!';

      navbar.prepend(p);
    });
  });
};

//Fetch Data from API
const fetchImages = async function (e) {
  try {
    e.preventDefault();
    const pornStarName = inputName.value;

    //hide lady img
    imgLady.style.display = 'none';

    //hide heading
    heading.style.display = 'none';

    setTimeout(() => {
      spinner.style.opacity = 1;
    }, 500);

    setTimeout(() => {
      spinner.style.opacity = 0;
    }, 7500);

    const res = await fetch(
      `https://porn-gallery.p.rapidapi.com/pornos/${pornStarName}`,
      options
    );

    const data = await res.json();
    const { results } = data;
    const firstEl = results.slice(0, `${1}`);
    const images = firstEl.flatMap(firstEl => firstEl.images);

    images.forEach(path => renderImage(path));

    //clear input
    inputName.value = '';
  } catch (err) {
    console.error(err);
  }
};

btnSearch.addEventListener('click', fetchImages);
btnSearch.addEventListener('submit', fetchImages);

 