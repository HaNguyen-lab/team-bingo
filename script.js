// 共通のアイテムプール: 1-70の数字 + 5つのワード（あなたのワードに置き換え）
const items = [...Array(70).keys().map(i => i + 1), 'ワード1', 'ワード2', 'ワード3', 'ワード4', 'ワード5'];

// プレイヤーシート生成関数
function generatePlayerCard() {
    // アイテムをシャッフルして24個選ぶ
    const shuffled = [...items].sort(() => Math.random() - 0.5).slice(0, 24);
    
    // 5x5グリッド作成（中央フリー）
    const grid = Array(5).fill().map(() => Array(5).fill(null));
    grid[2][2] = 'フリー 🎁'; // Japanese 'Free' with gift emoji
    let idx = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (i === 2 && j === 2) continue;
            grid[i][j] = shuffled[idx++];
        }
    }
    
    // テーブル表示
    const table = document.getElementById('bingo-card');
    table.innerHTML = '';
    grid.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            if (cell === 'フリー 🎁') td.classList.add('free');
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    // Add event listener to table for delegated clicks
    table.addEventListener('click', (event) => {
        const td = event.target.closest('td');
        if (td && !td.classList.contains('free')) { // Prevent marking free cell
            console.log(`Clicked cell with content: ${td.textContent}`); // Debug log
            td.classList.toggle('marked');
        }
    });

    // Add spans for balloon and confetti icons
    const container = document.querySelector('.container-decorated');
    container.innerHTML += '<span class="icon-balloon">🎈</span><span class="icon-confetti">🎉</span>';
}

// ホスト状態ロード（localStorage使用）
function loadHostState() {
    const savedRemaining = JSON.parse(localStorage.getItem('remaining')) || [...items];
    const savedCalled = JSON.parse(localStorage.getItem('called')) || [];
    window.remaining = savedRemaining;
    window.called = savedCalled;
    updateCalledList();
}

// 次を呼び出す関数
function callNextItem() {
    if (window.remaining.length === 0) {
        alert('すべての項目が呼ばれました！');
        return;
    }
    // ランダムに選んで削除
    const idx = Math.floor(Math.random() * window.remaining.length);
    const item = window.remaining.splice(idx, 1)[0];
    window.called.push(item);
    saveHostState();
    updateCalledList();
}

// 呼ばれたリスト更新
function updateCalledList() {
    const list = document.getElementById('called-list');
    list.innerHTML = '';
    window.called.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
}

// 状態保存
function saveHostState() {
    localStorage.setItem('remaining', JSON.stringify(window.remaining));
    localStorage.setItem('called', JSON.stringify(window.called));
}

// リセット関数
function resetGame() {
    window.remaining = [...items];
    window.called = [];
    // localStorageを完全にクリア
    localStorage.removeItem('remaining');
    localStorage.removeItem('called');
    updateCalledList();
}
