let copyText = document.querySelector(".copy-text")
copyText.querySelector(".copy-btn").addEventListener("click", function () {
    let input = copyText.querySelector('p.text')
    input.select()
    document.execCommand('copy')
    copyText.classList.add('active')
    window.getSelection().removeAllRanges()
    setTimeout(function() {
        copyText.classList.remove('active')
    }, 1500);
})