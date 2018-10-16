const whoseTurn = document.querySelector('.player-turn')
const omokRowSelectors = document.querySelectorAll('.row')
// const omokColSelectors = document.querySelectorAll('.col')
const omokRowArr = Array.from(omokRowSelectors)
const omokColArr = []
for (let item of omokRowArr) {
    omokColArr.push(Array.from(item.childNodes))
}

const omokArr = []
for (let item of omokColArr) {
    omokArr.push(item.filter(item2 => item2.nodeName !== "#text"))

}


function omok(arr) {
    // 가로오목 ====================
    for (let i = 0; i < 15; i++) {
      let memory1 = 0;
      let memory2 = 0;
      for (let j = 0; j < 15; j++) {
        // 흑돌승리
        if (memory1 === 5) {
          return 1
        } else if (arr[i][j].classList.contains('black') === true) {
          memory1++
        } else {
          memory1 = 0
        }
        // 백돌승리
        if (memory2 === 10) {
          return 2
        } else if (arr[i][j].classList.contains('white')) {
          memory2 += 2
        } else {
          memory2 = 0
        }
      }
    }
  
    // 세로오목 ====================
    // 세로오목의 원리는 [모든 바깥 배열 인덱스]의 [안쪽 배열 i번째 인덱스]에서
    // 돌 5개가 연속해서 흑돌 또는 백돌이어야 한다.
    for (let i = 0; i < 9; i++) {
      let memory1 = 0; // 이 메모리값이 5가 되면 흑돌아 이기고
      let memory2 = 0; // 이 메모리값이 10이 되면 백돌이 이긴다.
      for (let j = 0; j < 9; j++) {
        // 흑돌승리
        if (memory1 === 5) { // 흑돌을 연속으로 5개 봤으면 흑돌이 승리한다.
          return 1 // 승리한다면 함수의 결과값 1을 반환한다.
        } else if (arr[j][i] === 1) { // 모든 바깥배열 j번째 인덱스의 안쪽 배열 i번째 인덱스가 1이면
          memory1++ // memory1 에 1씩 더한다.
        } else if (arr[j][i] === 0) { // 만약 바깥배열 j번째 인덱스의 안쪽 배열 i번째 인덱스가 0이면
          memory1 = 0 // memory1은 0으로 초기화한다.
        }
        // 백돌승리
        if (memory2 === 10) { 
          return 2 // 백돌 또한 흑돌의 승리 조건과 같지만 승리할 시 2를 반환한다.
        } else if (arr[j][i] === 2) {
          memory2 += 2
        } else if (arr[j][i] === 0) {
          memory2 = 0
        }
      }
    }
  
    // 대각선오목 ====================
    // 대각선오목의 원리는 [바깥 배열의 i, i+1, i+2, i+3, i+4 번째 인덱스]가
    // [안쪽 배열의 j, j+1, j+2, j+3, j+4 번째 인덱스]가 모두 흑돌이거나 백돌이어야 한다.
    for (let i = 0; i < 5; i++) {
      let memory1 = 0;
      let memory2 = 0;
      for (let j = 0; j < 5; j++) { // 인덱스 10번까지 순회하면 안된다.
        // 흑돌승리
        if (memory1 === 1) { // 연속되는 것을 한번에 체크하기 때문에 메모리가 한번만 추가돼도 승리한다.
          return 1 
        } else if (
          arr[i][j] === 1 &&
          arr[i+1][j+1] === 1 &&
          arr[i+2][j+2] === 1 &&
          arr[i+3][j+3] === 1 &&
          arr[i+4][j+4] === 1
          ) {
          memory1++ // 상단의 대각선의 오목의 원리를 그대로 적용한다.
        }
        // 백돌승리
        if (memory2 === 2) {
          return 2
        } else if (
          arr[i][j] === 2 &&
          arr[i+1][j+1] === 2 &&
          arr[i+2][j+2] === 2 &&
          arr[i+3][j+3] === 2 &&
          arr[i+4][j+4] === 2
        ) {
          memory2 += 2 // 상단의 대각선의 오목의 원리를 그대로 적용한다.
        }
      }
    }
  
    // 반대방향 대각선 오목
    // 반대 방향 대각선의 원리는 대각선의 원리와 같으나,
    // 방향이 오른쪽에서 왼쪽으로 흘러가기 때문에 
    // 안쪽 인덱스가 큰 숫자부터 작은 숫자로 흘러가야 한다.
    for (let i = 0; i <= 4; i++) {
      let memory1 = 0;
      let memory2 = 0;
      for (let j = 8; j >= 4; j--) { // 오른쪽에서 왼쪽으로 흘러가야 하기 때문에 j의 값을 끝에서부터 빼나간다.
        // 흑돌승리
        if (memory1 === 1) {
          return 1
        } else if (
          arr[i][j] === 1 &&
          arr[i+1][j-1] === 1 &&
          arr[i+2][j-2] === 1 &&
          arr[i+3][j-3] === 1 &&
          arr[i+4][j-4] === 1
          ) {
          memory1++
        }
        // 백돌승리
        if (memory2 === 2) {
          return 2
        } else if (
          arr[i][j] === 2 &&
          arr[i+1][j-1] === 2 &&
          arr[i+2][j-2] === 2 &&
          arr[i+3][j-3] === 2 &&
          arr[i+4][j-4] === 2
        ) {
          memory2 += 2
        }
      }
    }
  
    console.log('실행')
    return 0
  }


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

            if (omok(omokArr) === 1) {
                console.log('승리')
            }
        })

    })
})