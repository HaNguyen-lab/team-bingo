@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Pacifico&display=swap');

body {
    font-family: 'Noto Sans JP', sans-serif;
    background: linear-gradient(to bottom, #f0f8ff, #ffe4e1);
    text-align: center;
    padding: 20px;
    min-height: 100vh;
    margin: 0;
}

.container {
    max-width: 600px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    position: relative;
    margin-bottom: 40px;
}

/* REAL EMOJIS in CSS */
.container-decorated::before  { content: 'star'; top: -20px; left: -20px; }
.container-decorated::after   { content: 'fireworks'; bottom: -20px; right: -20px; }

.container-decorated::before,
.container-decorated::after,
.icon-balloon,
.icon-confetti,
.icon-dog,
.icon-cat,
.icon-rabbit {
    position: absolute;
    font-size: 32px;
    opacity: 0.6;
    font-family: 'Noto Sans JP', 'Segoe UI Emoji', 'Apple Color Emoji', sans-serif;
}

.icon-balloon   { top: 50%; left: -30px; }
.icon-confetti  { top: 50%; right: -30px; }
.icon-dog       { top: -20px; right: -20px; }
.icon-cat       { bottom: -20px; left: -20px; }
.icon-rabbit    { top: 30%; right: -30px; }

h1 { font-family: 'Pacifico', cursive; color: #ff69b4; font-size: 2.5em; margin-bottom: 10px; }

table { border-collapse: separate; border-spacing: 5px; margin: 20px auto; }

td {
    border: 2px solid #add8e6;
    border-radius: 10px;
    width: 80px; height: 80px;
    text-align: center; vertical-align: middle;
    font-size: 22px; background: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    transition: background .3s; cursor: pointer;
}

td.free { background: #ffd700; font-weight: bold; font-size: 20px; cursor: default; }
td.marked { background: #90ee90; position: relative; }
td.marked::after {
    content: ''; position: absolute;
    top: 50%; left: 50%; transform: translate(-50%,-50%);
    width: 40px; height: 40px;
    border: 2px solid #228b22; border-radius: 50%;
}

button {
    background:#4caf50; color:#fff; border:none;
    padding:12px 24px; margin:10px;
    cursor:pointer; font-size:16px;
    border-radius:25px;
    box-shadow:0 2px 5px rgba(0,0,0,0.1);
    transition:background .3s;
}
button:hover { background:#45a049; }

ul { list-style:none; padding:0; }
li { background:#f0f8ff; margin:5px; padding:10px; border-radius:10px; box-shadow:0 1px 3px rgba(0,0,0,0.05); }

@media (max-width:600px){
    td { width:60px; height:60px; font-size:16px; }
    td.marked::after { width:30px; height:30px; border-width:1px; }
    .container-decorated::before,
    .container-decorated::after,
    .icon-balloon,.icon-confetti,.icon-dog,.icon-cat,.icon-rabbit { font-size:24px; }
}
