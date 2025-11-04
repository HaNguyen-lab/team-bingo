// 共通のアイテムプール
const items = [...Array(70).keys().map(i => i + 1), 'ワード1', 'ワード2', 'ワード3', 'ワード4', 'ワード5'];

// === SINGLE PERSISTENT CLICK LISTENER (ATTACHED ONCE) ===
document.addEventListener('click', (event) => {
    const td = event.target.closest('#bingo-card td');
    if (td && !td.classList.contains('free')) {
        console.log('Cell clicked:', td.textContent);
        td.classList.toggle('marked');
    }
}, { once: false }); // Persistent listener

// プレイヤーシート生成関数
function generatePlayerCard() {
    try {
        const shuffled = [...items].sort(() => Math.random() - 0.5).slice(0, 24);
        const grid = Array(5).fill().map(() => Array(5).fill(null));
        grid[2][2] = 'フリー gift';
        let idx = 0;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (i === 2 && j === 2) continue;
                grid[i][j] = shuffled[idx++];
            }
        }

        const table = document.getElementById('bingo-card');
        if (!table) throw new Error('Table not found');
        table.innerHTML = '';

        grid.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                if (cell === 'フリー gift') td.classList.add('free');
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });

        // === DECORATIVE ICONS (RE-ADDED ON REGENERATE) ===
        const container = document.querySelector('.container-decorated');
        if (!container) throw new Error('Container not found');
        container.querySelectorAll('.icon-balloon, .icon-confetti, .icon-dog, .icon-cat, .icon-rabbit')
               .forEach(el => el.remove());

        const icons = [
            { class: 'icon-balloon', content: 'balloon' },
            { class: 'icon-confetti', content: 'party popper' },
            { class: 'icon-dog', content: 'dog face' },
            { class: 'icon-cat', content: 'cat face' },
            { class: 'icon-rabbit', content: 'rabbit face' }
        ];
        icons.forEach(ic => {
            const span = document.createElement('span');
            span.className = ic.class;
            span.textContent = ic.content;
            container.appendChild(span);
        });

    } catch (error) {
        console.error('Error in generatePlayerCard:', error);
    }
}

// === HOST FUNCTIONS (unchanged) ===
function loadHostState() {
    try {
        window.remaining = JSON.parse(localStorage.getItem('remaining')) || [...items];
        window.called = JSON.parse(localStorage.getItem('called')) || [];
        updateCalledList();
    } catch (e) { console.error(e); }
}

function callNextItem() {
    if (window.remaining.length === 0) return alert('終了！');
    const idx = Math.floor(Math.random() * window.remaining.length);
    const item = window.remaining.splice(idx, 1)[0];
    window.called.push(item);
    saveHostState();
    updateCalledList();
}

function updateCalledList() {
    const list = document.getElementById('called-list');
    if (!list) return;
    list.innerHTML = '';
    window.called.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
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
