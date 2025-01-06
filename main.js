const hammer = document.querySelector('.cursor');
const all = [...document.querySelectorAll('.hole')];
const scoreElement = document.querySelector('.score span');
let score = 0
let missCount = 0
const maxMisses = 3

const sound = new Audio("assets/smash.mp3");
function run() {
    if (missCount >= maxMisses) {
        alert("Game Over! You missed 3 moles.")
        return
    }

    const i = Math.floor(Math.random() * all.length)
    const hole = all[i]
    let timer = null

    const img = document.createElement('img')
    img.classList.add('mole')
    img.src = 'assets/mole.png'

    img.addEventListener('click', function(){
        score += 10
        sound.play()
        scoreElement.textContent = score
        img.src = 'assets/mole-whacked.png'
        clearTimeout(timer)
        setTimeout(function(){
            hole.removeChild(img)
            run()
        }, 500)
    })
    hole.appendChild(img)

    timer = setTimeout(function(){
        if (hole.contains(img)) {
            hole.removeChild(img);
            missCount++
            if (missCount >= maxMisses) {
                alert("Game Over! You missed 3 moles.")
                return
            }
            run()
        }
    }, 1500)
}
run()
window.addEventListener('mousemove', function(e){
    hammer.style.top = e.pageY + 'px'
    hammer.style.left = e.pageX + 'px'
})
window.addEventListener('mousedown', function(){
    hammer.classList.add('active')
})
window.addEventListener('mouseup', function(){
    hammer.classList.remove('active')
})