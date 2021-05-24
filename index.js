// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');

appDiv.innerHTML = `<h1>Virtual Scroller</h1>`;

let sI = 0, // startIndex - keeps track of nodes in the container
  sP = 0; // last scroll Position - detects scroll direction

const container = createEle('div', 200, 500);

addChildren(container);
container.style.overflow = 'auto';

appDiv.appendChild(container);

// Scroll event listener
container.addEventListener('scroll', e => {
  paintVisibleNodes(e);

  const containerHeight = e.target.offsetHeight;
  const containerScroll = ~~e.target.scrollTop;

  const scrollDif = containerScroll - (sI * 100 - containerHeight);

  // end of scrll get more data for container
  if (scrollDif >= -1 && scrollDif <= 0) {
    addChildren(e.target);
  }
  console.log('colored', document.querySelectorAll('.bg-yellow').length);
});

// Paint function utilities
function paintVisibleNodes(e) {
  const contHeight = e.target.offsetHeight;
  const nodeHeight = 100;
  const visibleNodesWindow = contHeight / nodeHeight;

  const scrollHeight = ~~(e.target.scrollTop / 100);

  if (sP < scrollHeight) {
    if (sP !== scrollHeight) {
      dePaintNodes(sP, scrollHeight);
    }
  } else {
    if (sP !== scrollHeight) {
      dePaintNodesDown(sP + 4, scrollHeight + 4);
    }
  }
  paintNodes(scrollHeight);
  sP = scrollHeight;

  // console.log(scrollHeight);
}

function paintNodes(start) {
  for (let i = start; i < start + 5; i++) {
    const node = document.getElementById(i);
    if (!node.classList.contains('bg-yellow')) {
      node.classList.add('bg-yellow');
    }
  }
}

function dePaintNodes(start, end) {
  for (let i = start; i < end; i++) {
    const node = document.getElementById(i);
    if (node.classList.contains('bg-yellow')) {
      node.classList.remove('bg-yellow');
    }
  }
}

function dePaintNodesDown(start, end) {
  for (let i = start; i > end; i--) {
    const node = document.getElementById(i);
    if (node.classList.contains('bg-yellow')) {
      node.classList.remove('bg-yellow');
    }
  }
}

// Element Creation
function createEle(ele, width, height) {
  const newEle = document.createElement(ele);
  newEle.style.width = width + 'px';
  newEle.style.height = height + 'px';

  return newEle;
}

function addChildren(container) {
  let i = sI;
  for (; i < sI + 10; i++) {
    const childDiv = createEle('div', 100, 100);
    childDiv.innerText = i;
    childDiv.id = i;
    container.appendChild(childDiv);
  }
  sI = i;
}
