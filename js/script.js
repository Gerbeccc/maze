const ANIMATION_STEP_DURATION = 200; 
const MAZE_DIMENSIONS = 30; 
const PATH_COLOR = "#00157d"; 
let counter = 0;
let interval;

const path = [[14.5, 0], [0, 0.5], [-1, 0], [0, 1], [-4, 0], [0, 3], [1, 0], [0, 1], [1, 0], 
[0, 1], [-2, 0], [0, 2], [-1, 0], [0, 2], [-1, 0], [0, 2], [-2, 0], [0, 1], [3, 0], 
[0, -1], [1, 0], [0, 1], [5, 0], [0, 1], [-2, 0], [0, 5], [1, 0], [0, -2], [1, 0], 
[0, 1], [1, 0], [0, 1], [-1, 0], [0, 1], [1, 0], [0, 1], [-1, 0], [0, 3], [1, 0], 
[0, -1], [3, 0], [0, -1], [-2, 0], [0, -1], [1, 0], [0, -2], [-1, 0], [0, -2], 
[1, 0], [0, 1], [1, 0], [0, 3], [2, 0] , [0, -1], [-1, 0], [0, -3], [3, 0], [0, -1], 
[2, 0], [0, 2], [5, 0], [0, 2], [-2, 0], [0, -1], [-1, 0], [0, 2], [-1, 0], [0, 1], 
[2, 0], [0, -1], [2, 0], [0, 5], [-1, 0], [0, 2], [1, 0], [0, 1], [-3, 0], [0, -1], 
[1, 0], [0, -2], [-1, 0], [0, 1], [-1, 0], [0, 1], [-2, 0], [0, 1], [-2, 0], [0, -4], 
[-2, 0], [0, -1], [-2, 0], [0, 3], [-2, 0], [0, 3]];

function draw (drawPath = false) {
  const img = document.getElementsByTagName('img')[0];
  
  const canvas = document.getElementById('sketch');
  const ctx = canvas.getContext('2d');


  canvas.width = img.width;
  canvas.height = img.height;

  let w = canvas.width;
  let h = canvas.height;

  
  counter = 0;
  if (interval) {
    clearInterval(interval);
  }

  
  if (drawPath) {
    interval = setInterval(animatePath, ANIMATION_STEP_DURATION);
  } else {
    interval = setInterval(animateObject, ANIMATION_STEP_DURATION);
  }

  function animatePath () {
    if (counter >= path.length) return;

    let x = 0;
    let y = 0;
	
    ctx.clearRect(0, 0, w, h);
    ctx.moveTo(x, y);
    ctx.beginPath();
	ctx.strokeStyle = PATH_COLOR;
    ctx.lineWidth = 10;

    for (let i = 0; i <= counter; i++) {
      x += path[i][0] * (w / MAZE_DIMENSIONS);
      y += path[i][1] * (h / MAZE_DIMENSIONS);
      ctx.lineTo(x, y)
    }
    ctx.stroke();
    counter++;
  }

  function animateObject () {
    if (counter >= path.length) return;

    let x = 0;
    let y = 0;

    ctx.clearRect(0, 0, w, h);
    ctx.moveTo(x, y);
    ctx.beginPath();

    for (let i = 0; i <= counter; i++) {
      x += path[i][0] * (w / MAZE_DIMENSIONS);
      y += path[i][1] * (h / MAZE_DIMENSIONS);
      ctx.moveTo(x, y);
      if (i === counter - 1) {
        let objectWidth;
        let objectHeight;
        if (path[i][0] === 0) {
          objectWidth = w / MAZE_DIMENSIONS / 3;
        } else {
          objectWidth = w / MAZE_DIMENSIONS / 2;
        }
        if (path[i][1] === 0) {
          objectHeight = w / MAZE_DIMENSIONS / 3;
        } else {
          objectHeight = w / MAZE_DIMENSIONS / 2;
        }
        ctx.fillRect(x - objectWidth / 2, y - objectHeight / 2, objectWidth, objectHeight);
      }
    }

    ctx.stroke();
    counter++;
  }
}