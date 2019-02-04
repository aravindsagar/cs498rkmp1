const header = document.getElementsByTagName('header')[0];
const headerDiv = document.getElementById('header');
const nav = document.getElementsByTagName('nav')[0];
const carousalSlides = [document.getElementsByName('carousal-1-slide'), document.getElementsByName('carousal-2-slide')];
const imgEnlarged = document.getElementById('img-enlarged');
const modalImg = document.getElementById('modal-img');
const modalImgCaption = document.getElementById('modal-img-caption');

let carousalImgIdx = [0, 0];
carousalImgIdx.forEach((imgIdx, carousalIdx) => {
  updateCarousal(imgIdx, carousalIdx);
});
let modalCarousalIdx = 0;
let enlargedImgIdx = 0;

function headerResize() {
  if (window.scrollY > 0) {
    headerDiv.classList.remove('open');
    headerDiv.classList.add('collapse');
  } else {
    headerDiv.classList.remove('collapse');
    headerDiv.classList.add('open');
  }
}

function updateNavSelection() {
  for (let i = 0; i < nav.children.length; i++) {
    const scrollY = window.scrollY + header.offsetHeight;
    const sectionId = nav.children.item(i).href.split('#')[1];
    const section = document.getElementById(sectionId);
    if (section && scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
      nav.children.item(i).classList.add('nav-selected');
      nav.children.item(i).classList.remove('nav-unselected');
    } else {
      nav.children.item(i).classList.add('nav-unselected');
      nav.children.item(i).classList.remove('nav-selected');
    }
  }
}

function updateCarousal(imgIdx, carousalIdx) {
  let slides = carousalSlides[carousalIdx];
  if (imgIdx < 0 || imgIdx >= slides.length) return;

  Array.prototype.forEach.call(slides, (s) => {
      s.style.display = "none";
      s.className = "carousal-slide";
  });
  let curSlide = slides.item(imgIdx);
  curSlide.style.display = 'block';

  if (imgIdx > carousalImgIdx[carousalIdx]) {
    if (imgIdx > 0) {
      let prevSlide = slides.item(imgIdx - 1);
      prevSlide.style.display = 'block';
      prevSlide.classList.add('exit-left');
    }
    curSlide.classList.add('slide-from-right');
  } else if (imgIdx < carousalImgIdx[carousalIdx]) {
    if (imgIdx < slides.length - 1) {
      let nextSlide = slides.item(imgIdx + 1);
      nextSlide.style.display = 'block';
      nextSlide.classList.add('exit-right');
    }
    curSlide.classList.add('slide-from-left');
  }
  carousalImgIdx[carousalIdx] = imgIdx;
}

function closeEnlargedImg() {
  imgEnlarged.classList.replace('modal-visible', 'modal-invisible');
  modalImg.classList.remove('zoom-in');
  modalImg.classList.add('zoom-out');
}

function showEnlargedImg(s) {
  modalImg.src = s.src;
  modalImgCaption.textContent = s.alt;
  modalImg.classList.remove('zoom-out');
  modalImg.classList.remove('zoom-in');
  modalImg.classList.add('zoom-in');
  imgEnlarged.classList.replace('modal-invisible', 'modal-visible');
}

function updateEnlargedImg(imgIdx) {
  let slides = carousalSlides[modalCarousalIdx];
  if (imgIdx < 0 || imgIdx >= slides.length) return;
  enlargedImgIdx = imgIdx;
  showEnlargedImg(slides[imgIdx]);
}

window.addEventListener("scroll", () => {
  headerResize();
  updateNavSelection();
});

document.getElementById('next-btn-1').onclick = () => {
  updateCarousal(carousalImgIdx[0] + 1, 0);
};

document.getElementById('prev-btn-1').onclick = () => {
  updateCarousal(carousalImgIdx[0] - 1, 0);
};

document.getElementById('next-btn-2').onclick = () => {
  updateCarousal(carousalImgIdx[1] + 1, 1);
};

document.getElementById('prev-btn-2').onclick = () => {
  updateCarousal(carousalImgIdx[1] - 1, 1);
};

document.getElementById('next-btn-modal').onclick = () => {
  updateEnlargedImg(enlargedImgIdx + 1)
};

document.getElementById('prev-btn-modal').onclick = () => {
  updateEnlargedImg(enlargedImgIdx - 1)
};

document.getElementById('close-btn').onclick = () => {
  closeEnlargedImg();
};

carousalSlides.forEach((slides, idx) => {
  Array.prototype.forEach.call(slides, (s, i) => {
    s.onclick = () => {
      modalCarousalIdx = idx;
      enlargedImgIdx = i;
      showEnlargedImg(s);
    };
  });
});
