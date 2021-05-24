// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');

appDiv.innerHTML = `<h1>Virtual Scroller</h1>`;

function createEle(ele, width, height) {
  const newEle = document.createElement(ele);
  newEle.style.width = width + 'px';
  newEle.style.height = height + 'px';
  newEle.style.background = 'lightgrey';

  return newEle;
}

const container = createEle('div', 100, 500);
let sI = 0,
  direction = true;
let sP = 0;

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

addChildren(container);
container.style.overflow = 'auto';

appDiv.appendChild(container);

container.addEventListener('scroll', e => {
  //consoleconsoleconsole.log(Math.floor(e.target.scrollTop), e.target.offsetHeight);
  paintVisibleNodes(e);

  const containerHeight = e.target.offsetHeight;
  const containerScroll = ~~e.target.scrollTop;

  const scrollDif = containerScroll - (sI * 100 - containerHeight);
  //consoleconsole.log(containerScroll, scrollDif);
  if (scrollDif >= -1 && scrollDif <= 0) {
    console.log('in');
    addChildren(e.target);
  }
  console.log('colored', document.querySelectorAll('.bg-yellow').length);
});

function paintVisibleNodes(e) {
  const contHeight = e.target.offsetHeight;
  const nodeHeight = 100;
  const visibleNodesWindow = contHeight / nodeHeight;

  const scrollHeight = ~~(e.target.scrollTop / 100);

  if (sP < scrollHeight) {
    if (sP && sP !== scrollHeight) {
      dePaintNodes(sP, scrollHeight);
    }

    paintNodes(scrollHeight);
  } else {
    if (sP && sP !== scrollHeight) {
      dePaintNodesDown(sP + 4, scrollHeight + 4);
    }
    paintNodes(scrollHeight);
  }
  sP = scrollHeight;

  console.log(scrollHeight);
}

function paintNodes(start) {
  for (let i = start; i < start + 5; i++) {
    const node = document.getElementById(i);
    //node.style.background = 'lightyellow';
    console.log(node.classList.contains('bg-yellow'));
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
    //node.style.background = 'none';
  }
}

function dePaintNodesDown(start, end) {
  for (let i = start; i > end; i--) {
    const node = document.getElementById(i);
    if (node.classList.contains('bg-yellow')) {
      node.classList.remove('bg-yellow');
    }
    //nodenode.style.background = 'none';
  }
}
