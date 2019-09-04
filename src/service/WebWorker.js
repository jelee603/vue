// 메시지 수신
self.onmessage = function (e) {
    loop()
}

// 호출한 페이지에 전달한다.
function loop () {
    // Random 값 전달
    postMessage(Math.floor(Math.random() * 50, 0))

    // 5초뒤에 다시 실행
    setTimeout(function () {
        loop()
    }, 5000)
}
