// Item pool: 1 to 75 only
const items = Array.from({ length: 75 }, (_, i) => i + 1);

// SINGLE PERSISTENT CLICK LISTENER (document level)
document.addEventListener('click', (e) => {
    const td = e.target.closest('#bingo-card td');
    if (td && !td.classList.contains('free')) {
        console.log('Cell clicked:', td.textContent);
        td.classList.toggle('marked');
    }
});

// プレイヤーシート生成
function generatePlayerCard() {
    try {
        // Shuffle and pick 24 numbers
        const shuffled = [...items].sort(() => Math.random() - 0.5).slice(0, 24);
        
        // 5x5 grid with FREE in center
        const grid = Array(5).fill().map(() => Array(5).fill(null));
        grid[2][2] = 'FREE gift';
        let idx = 0;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (i === 2 && j === 2) continue;
                grid[i][j] = shuffled[idx++];
            }
        }

        const table = document.getElementById('bingo-card');
        if (!table) throw new Error('Table missing');
        table.innerHTML = '';

        grid.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                if (cell === 'FREE gift') td.classList.add('free');
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });

        // Decorative icons (real emojis)
        const container = document.querySelector('.container-decorated');
        if (!container) throw new Error('Container missing');
        container.querySelectorAll('.icon-balloon,.icon-confetti,.icon-dog,.icon-cat,.icon-rabbit')
                 .forEach(el => el.remove());

        const icons = [
            { cls: 'icon-balloon',   emoji: 'balloon' },
            { cls: 'icon-confetti',  emoji: 'party popper' },
            { cls: 'icon-dog',       emoji: 'dog face' },
            { cls: 'icon-cat',       emoji: 'cat face' },
            { cls: 'icon-rabbit',    emoji: 'rabbit face' }
        ];
        icons.forEach(ic => {
            const s = document.createElement('span');
            s.className = ic.cls;
            s.textContent = ic.emoji;
            container.appendChild(s);
        });

    } catch (err) {
        console.error('generatePlayerCard error:', err);
    }
}

// Host functions (unchanged)
function loadHostState() {
    try {
        window.remaining = JSON.parse(localStorage.getItem('remaining')) || [...items];
        window.called    = JSON.parse(localStorage.getItem('called')) || [];
        updateCalledList();
    } catch (e) { console.error(e); }
}
function callNextItem() {
    if (!window.remaining.length) return alert('終了！');
    const i = Math.floor(Math.random() * window.remaining.length);
    const item = window.remaining.splice(i, 1)[0];
    window.called.push(item);
    saveHostState();
    updateCalledList();
}
function updateCalledList() {
    const ul = document.getElementById('called-list');
    if (!ul) return;
    ul.innerHTML = '';
    window.called.forEach(v => {
        const li = document.createElement('li');
        li.textContent = v;
        ul.appendChild(li);
    });
}
function saveHostState() {
    localStorage.setItem('remaining', JSON.stringify(window.remaining));
    localStorage.setItem('called', JSON.stringify(window.called));
}
function resetGame() {
    window.remaining = [...items];
    window.called = [];
    localStorage.clear();
    updateCalledList();
}
