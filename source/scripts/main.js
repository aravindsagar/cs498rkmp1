const header = document.getElementsByTagName('header')[0];
const headerDiv = document.getElementById('header');

const sectionBounds = [];
const nav = document.getElementsByTagName('nav')[0];
for (let i = 0; i < nav.children.length; i++) {
  const sectionId = nav.children.item(i).href.split('#')[1];
  const section = document.getElementById(sectionId);
  if (section) {
    sectionBounds.push({top: section.offsetTop, bottom: section.offsetTop + section.offsetHeight});
  } else {
    sectionBounds.push({top: -1, bottom: -1});
  }
}

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
  sectionBounds.forEach((bounds, i) => {
    const scrollY = window.scrollY + header.offsetHeight*2;
    if (scrollY >= bounds.top && scrollY < bounds.bottom) {
      console.log(bounds.top, bounds.bottom);
      nav.children.item(i).classList.add('nav-selected');
      nav.children.item(i).classList.remove('nav-unselected');
    } else {
      nav.children.item(i).classList.add('nav-unselected');
      nav.children.item(i).classList.remove('nav-selected');
    }
  });
}

window.addEventListener("scroll", () => {
  headerResize();
  updateNavSelection();
});