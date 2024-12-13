function showKeyCode(e) {
    const keyCode = e.keyCode;
    const div = document.getElementById('h1');
    div.innerHTML = '';
    const h1 = document.createElement('h1');
    const h1Text = document.createTextNode(keyCode);
    h1.appendChild(h1Text);
    div.appendChild(h1);
}

window.addEventListener('keydown', showKeyCode);

function showKeyCodes(e) {
    const insert = document.getElementById('insert')
    insert.innerHTML = '';
    const keyCodes = {
        'event.Key': e.key === ' ' ? 'Space' : e.key,
        'event.keyCode': e.keyCode,
        'event.Code': e.code,
    };

    for (let key in keyCodes) {
        const div = document.createElement('div');
        div.className = 'key';
        const small = document.createElement('small');
        const keyText = document.createTextNode(key);
        const valueText = document.createTextNode(keyCodes[key]);
       
        small.appendChild(keyText);
        div.appendChild(valueText);
        div.appendChild(small);
        insert.appendChild(div);
    }
}

window.addEventListener('keydown', showKeyCodes);

document.getElementById('insert').addEventListener('click', function(e) {
    if (e.target.classList.contains('key')) {
        const textToCopy = e.target.textContent;
        copyToClipboard(textToCopy);

        const notification = document.getElementById('copyNotification');
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }
});

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand('copy');

    document.body.removeChild(textarea);
}
