function onReady(callback) {
    var intervalId = window.setInterval(function () {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
        }
    }, 3000);
}

document.getElementById("loadButton").addEventListener("click", function () {
    setVisible('body', true);
    setVisible('#loading', false);
});

document.getElementById("loadButton").addEventListener("touchstart", function () {
    setVisible('body', true);
    setVisible('#loading', false);
});

function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? 'block' : 'none';
}
