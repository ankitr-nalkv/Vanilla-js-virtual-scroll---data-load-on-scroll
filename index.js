// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');

appDiv.innerHTML = `<h1>JS Starter</h1>`;

function createEle(ele, width, height) {
  const newEle = document.createElement(ele);
  newEle.style.width = width +'px';
  newEle.style.height = height+'px';
  newEle.style.background = 'lightgrey';
  
  return newEle;
}

const container = createEle('div', 100, 500);

for(let i= 0; i< 10; i++){
  const childDiv = createEle('div', 100, 100);
  childDiv.innerText = i;
  container.appendChild(childDiv);
}

container.style.overflow = 'auto';

appDiv.appendChild(container);

container.addEventListener('scroll', (e) => {
//consoleconsoleconsole.log(Math.floor(e.target.scrollTop), e.target.offsetHeight);
const containerHeight= e.target.offsetHeight;
const containerScroll = e.target.scrollTop;
if(containerScroll >= containerHeight - 2 && containerScroll <= containerHeight){
console.log('in')
}
});
