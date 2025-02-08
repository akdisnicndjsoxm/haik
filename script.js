const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
const popup = document.getElementById('hackerPopup');
const terminal = document.getElementById('terminal');
const output = document.getElementById('output');
const input = document.getElementById('input');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}:"<>?[];\',./`~';
const charactersArray = characters.split('');
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = charactersArray[Math.floor(Math.random() * charactersArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

// 显示弹窗并播放语音
function showPopup() {
    popup.style.display = 'block';
    speak("你被黑客入侵了, 哈哈哈");
}

// 关闭弹窗
function closePopup() {
    popup.style.display = 'none';
}

// 文本转语音功能
function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN'; // 设置为中文
        utterance.rate = 1; // 语速
        utterance.pitch = 1; // 音调
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("您的浏览器不支持文本转语音功能。");
    }
}

// 显示/隐藏终端
function toggleTerminal() {
    if (terminal.style.display === 'none' || terminal.style.display === '') {
        terminal.style.display = 'block';
        input.focus(); // 自动聚焦到输入框
    } else {
        terminal.style.display = 'none';
    }
}

// 处理终端输入
function handleCommand(command) {
    const response = executeCommand(command); // 执行命令
    output.innerHTML += `<div><span style="color: #0F0;">$ ${command}</span></div>`;
    output.innerHTML += `<div>${response}</div>`;
    output.scrollTop = output.scrollHeight; // 滚动到底部
}

// 模拟执行命令
function executeCommand(command) {
    switch (command.trim()) {
        case 'help':
            return '可用命令: help, clear, echo [text], date, neofetch, hacker, ls, pwd, cd [path]';
        case 'clear':
            output.innerHTML = ''; // 清空输出
            return '';
        case 'date':
            return new Date().toString();
        case 'neofetch':
            return 'neofetch 1.0 (Ubuntu 24.04.1 LTS)';
        case 'hacker':
            return '已显示弹窗';
        case 'ls':
            return 'bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  snap  srv  sys  tmp  usr  var';
        case 'dir':
            return 'bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  snap  srv  sys  tmp  usr  var';
        case 'pwd':
            return '/home/user';
        case 'cd':
            return '未指定路径';
        case 'top':
            return 'top - 17:55:10 up 1 day, 18:34,  1 user,  load average: 0.00, 0.00, 0.00';
            
        default:
            if (command.startsWith('echo ')) {
                return command.slice(5); // 返回 echo 后的内容
            };
            if (command.startsWith('cd ')) {
                return '已切换路径';
            }
            if (command.startsWith('cowsay')) {
                let message = command.slice(7); // 获取 cowsay 后的内容
                let i = 1; // 设置变量 i
                if (i === 1) { // 检查 i 是否等于 1
                    return `
                    __________
                   < ${message} >
                    ——————————
                      \\
                       \\
                        \\
                         \\   ^__^
                          \\  (oo)\\_______
                             (__)\\       )\\/\\
                                 ||----w |
                                 ||     ||
                    `;
                }
                // 如果 i 不等于 1 或者有其他逻辑，可以在这里处理
                return command.slice(7); // 默认返回 cowsay 后的内容
            }
            return `命令未找到: ${command}`;
    }
}

// 监听输入框的键盘事件
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleCommand(input.value);
        input.value = ''; // 清空输入框
    }
});

// 监听键盘事件以实现 Ctrl + S 显示/隐藏终端
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault(); // 阻止默认行为（如保存页面）
        toggleTerminal();
    }
});


// 每隔50毫秒绘制一次代码雨
setInterval(draw, 50);

// 页面加载3秒后显示弹窗并播放语音
setTimeout(showPopup, 3000);

// 监听窗口大小变化
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});