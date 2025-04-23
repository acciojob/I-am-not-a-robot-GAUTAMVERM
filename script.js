//your code here
const images = ['img1', 'img2', 'img3', 'img4', 'img5'];
const container = document.getElementById('image-container');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const message = document.getElementById('para');
const instruction = document.getElementById('h');

let selectedImages = [];
let allImages = [];

function shuffleAndRender() {
  // Choose a random duplicate
  const duplicateIndex = Math.floor(Math.random() * images.length);
  const duplicate = images[duplicateIndex];

  // Clone images + 1 duplicate
  allImages = [...images, duplicate];

  // Shuffle
  allImages = allImages
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  // Render
  container.innerHTML = '';
  allImages.forEach((cls, index) => {
    const img = document.createElement('img');
    img.className = cls;
    img.dataset.index = index;
    container.appendChild(img);
  });

  selectedImages = [];
  message.textContent = '';
  instruction.textContent =
    'Please click on the identical tiles to verify that you are not a robot.';
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
}

container.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    const img = e.target;

    if (selectedImages.find(sel => sel.index === img.dataset.index)) return;

    if (selectedImages.length < 2) {
      img.classList.add('selected');
      selectedImages.push({ class: img.className, element: img, index: img.dataset.index });

      resetBtn.style.display = 'inline-block';

      if (selectedImages.length === 2) {
        verifyBtn.style.display = 'inline-block';
      }
    }
  }
});

resetBtn.addEventListener('click', () => {
  selectedImages.forEach(sel => sel.element.classList.remove('selected'));
  selectedImages = [];
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  message.textContent = '';
  instruction.textContent =
    'Please click on the identical tiles to verify that you are not a robot.';
});

verifyBtn.addEventListener('click', () => {
  verifyBtn.style.display = 'none';
  if (selectedImages[0].class === selectedImages[1].class) {
    message.textContent = 'You are a human. Congratulations!';
  } else {
    message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

window.onload = shuffleAndRender;