// 共通のアイテムプール: 1-70の数字 + 5つのワード（あなたのワードに置き換え）
const items = [...Array(70).keys().map(i => i + 1), 'My way', 'Happiness Day', 'NEC Way', 'ワード4', 'ワード5'];

// プレイヤーシート生成関数
function generatePlayerCard() {
    try {
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
        if (!table) throw new Error('Bingo card table not found');
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
            if (td && !td.classList.contains('free')) {
                console.log(`Clicked cell with content: ${td.textContent}`);
                td.classList.toggle('marked');
            } else {
                console.log('Click ignored: not a valid cell or free cell');
            }
        });

        // Add spans for decorative icons
        const container = document.querySelector('.container-decorated');
        if (!container) throw new Error('Container not found');
        // Remove existing icons to prevent duplicates
        const existingIcons = container.querySelectorAll('.icon-balloon, .icon-confetti, .icon-dog, .icon-cat, .icon-rabbit');
        existingIcons.forEach(icon => icon.remove());
        // Add new icons
        const icons = [
            { class: 'icon-balloon', content: '🎈', },
            { class: 'icon-confetti', content: '🎉', },
            { class: 'icon-dog', content: '🐶', },
            { class: 'icon-cat', content: '😺', },
            { class: 'icon-rabbit', content: '🐰', },
        ];
        icons.forEach(icon => {
            const span = document.createElement('span');
            span.className = icon.class;
            span.textContent = icon.content;
            container.appendChild(span);
        });
    } catch (error) {
        console.error('Error generating player card:', error);
    }
}

// ホスト状態ロード（localStorage使用）
function loadHostState() {
    try {
        const savedRemaining = JSON.parse(localStorage.getItem('remaining')) || [...items];
        const savedCalled = JSON.parse(localStorage.getItem('called')) || [];
        window.remaining = savedRemaining;
        window.called = savedCalled;
        updateCalledList();
    } catch (error) {
        console.error('Error loading host state:', error);
    }
}

// 次を呼び出す関数
function callNextItem() {
    try {
        if (window.remaining.length === 0) {
            alert('すべての項目が呼ばれました！');
            return;
        }
        const idx = Math.floor(Math.random() * window.remaining.length);
        const item = window.remaining.splice(idx, 1)[0];
        window.called.push(item);
        saveHostState();
        updateCalledList();
    } catch (error) {
        console.error('Error calling next item:', error);
    }
}

// 呼ばれたリスト更新
function updateCalledList() {
    try {
        const list = document.getElementById('called-list');
        if (!list) throw new Error('Called list not found');
        list.innerHTML = '';
        window.called.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
        });
    } catch (error) {
        console.error('Error updating called list:', error);
    }
}

// 状態保存
function saveHostState() {
    try {
        localStorage.setItem('remaining', JSON.stringify(window.remaining));
        localStorage.setItem('called', JSON.stringify(window.called));
    } catch (error) {
        console.error('Error saving host state:', error);
    }
}

// リセット関数
function resetGame() {
    try {
        window.remaining = [...items];
        window.called = [];
        localStorage.removeItem('remaining');
        localStorage.removeItem('called');
        updateCalledList();
    } catch (error) {
        console.error('Error resetting game:', error);
    }
}
