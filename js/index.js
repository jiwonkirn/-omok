const whoseTurn = document.querySelector('.player-turn')

document.addEventListener('DOMContentLoaded', () => {
    
    // 어떤 돌을 둘 차례인지 기억하는 저장소를 만든다.
    let playerMemory = '흑돌'

    // 한칸한칸 순회 중..
    document.querySelectorAll('.col').forEach(el => {

        // 그 중 어떤 요소에 클릭 이벤트가 났을 때,
        el.addEventListener('click', e => {

            // 지금 흑돌의 차례라면
            if (playerMemory === '흑돌') {

                // 흑돌을 두고
                el.classList.add('black')

                // 다음 턴을 백돌의 차례로 만든 뒤
                playerMemory = '백돌'

                // 다음 차례가 누구의 차례인지를 브라우저에도 표시해준다.
                whoseTurn.classList.remove('black-stone')
                whoseTurn.classList.add('white-stone')
                whoseTurn.textContent = '백돌'

            } else if (playerMemory === '백돌') {
                el.classList.add('white')
                playerMemory = '흑돌'
                whoseTurn.classList.remove('white-stone')
                whoseTurn.classList.add('black-stone')
                whoseTurn.textContent = '흑돌'
            }
        })

        
    })
})