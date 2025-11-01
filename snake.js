const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const grid = 20;
let count = 0;
let snake = [{x: 160, y: 160}];
let dx = grid;
let dy = 0;
let food = randomFood();

function randomFood() {
    return {
        x: Math.floor(Math.random() * 20) * grid,
        y: Math.floor(Math.random() * 20) * grid
    };
}

function loop() {
    requestAnimationFrame(loop);
    if (++count < 4) return; // ralentir la vitesse
    count = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Déplacement du serpent
    let head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    // Vérification collision avec nourriture
    if (head.x === food.x && head.y === food.y) {
        food = randomFood();
    } else {
        snake.pop();
    }

    // Vérification collision avec mur ou corps
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height
        || snake.slice(1).some(seg => seg.x === head.x && seg.y === head.y)) {
        snake = [{x: 160, y: 160}];
        dx = grid;
        dy = 0;
    }

    // Dessiner nourriture
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, grid-1, grid-1);

    // Dessiner serpent
    ctx.fillStyle = 'lime';
    snake.forEach(seg => ctx.fillRect(seg.x, seg.y, grid-1, grid-1));
}

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' && dx === 0) { dx = -grid; dy = 0; }
    if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -grid; }
    if (e.key === 'ArrowRight' && dx === 0) { dx = grid; dy = 0; }
    if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = grid; }
});

requestAnimationFrame(loop);
