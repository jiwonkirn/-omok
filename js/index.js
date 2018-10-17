/* =====================
    쿼리 셀렉터를 담은 변수
======================== */

const blackWin = document.querySelector('.black-win')
const whiteWin = document.querySelector('.white-win')
const whoseTurn = document.querySelector('.player-turn')
const restartButton = document.querySelectorAll('.restart-btn')

const omokRowSelectors = document.querySelectorAll('.row')



/* ==============================
    오목판을 구현하기 위한 배열 만들기
================================= */

const omokRowArr = Array.from(omokRowSelectors)
const omokColArr = []
for (let item of omokRowArr) {
    omokColArr.push(Array.from(item.childNodes))
}

// 오목 함수에 인수로 넘겨줄 [오목판 배열]을 만든다.
const omokArr = []
for (let item of omokColArr) {
    omokArr.push(item.filter(item2 => item2.nodeName !== "#text"))
}



/* ==================================
    오목을 하기 위한 알고리즘을 담은 함수
===================================== */

// 게임 재시작을 위한 함수
function restart() {
    for (let item of omokArr) {
        for (let innerItem of item) {
            innerItem.classList.remove('black')
            innerItem.classList.remove('white')
        }
    }
}

// 오목의 승패를 판단하기 위한 함수
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
        } else if (arr[i][j].classList.contains('white') === true) {
          memory2 += 2
        } else {
          memory2 = 0
        }
      }
    }
  

    // 세로오목 ====================

    // 세로오목의 원리는 [모든 바깥 배열 인덱스]의 [안쪽 배열 i번째 인덱스]에서
    // 돌 5개가 연속해서 흑돌 또는 백돌이어야 한다.
    for (let i = 0; i < 15; i++) {
      let memory1 = 0; // 이 메모리값이 5가 되면 흑돌아 이기고
      let memory2 = 0; // 이 메모리값이 10이 되면 백돌이 이긴다.
      for (let j = 0; j < 15; j++) {
        // 흑돌승리
        if (memory1 === 5) { // 흑돌을 연속으로 5개 봤으면 흑돌이 승리한다.
          return 1 // 승리한다면 함수의 결과값 1을 반환한다.
        } else if (arr[j][i].classList.contains('black') === true) { // 모든 바깥배열 j번째 인덱스의 안쪽 배열 i번째 인덱스가 1이면
          memory1++ // memory1 에 1씩 더한다.
        } else if (arr[j][i].classList.contains('black') === false) { // 만약 바깥배열 j번째 인덱스의 안쪽 배열 i번째 인덱스가 0이면
          memory1 = 0 // memory1은 0으로 초기화한다.
        }
        // 백돌승리
        if (memory2 === 10) { 
          return 2 // 백돌 또한 흑돌의 승리 조건과 같지만 승리할 시 2를 반환한다.
        } else if (arr[j][i].classList.contains('white') === true) {
          memory2 += 2
        } else if (arr[j][i].classList.contains('white') === false) {
          memory2 = 0
        }
      }
    }
  

    // 대각선오목 ====================

    // 대각선오목의 원리는 [바깥 배열의 i, i+1, i+2, i+3, i+4 번째 인덱스]가
    // [안쪽 배열의 j, j+1, j+2, j+3, j+4 번째 인덱스]가 모두 흑돌이거나 백돌이어야 한다.
    for (let i = 0; i < 11; i++) {
      let memory1 = 0;
      let memory2 = 0;
      for (let j = 0; j < 11; j++) { // 인덱스 10번까지 순회하면 안된다.
        // 흑돌승리
        if (memory1 === 1) { // 연속되는 것을 한번에 체크하기 때문에 메모리가 한번만 추가돼도 승리한다.
          return 1 
        } else if (
          arr[i][j].classList.contains('black') === true &&
          arr[i+1][j+1].classList.contains('black') === true &&
          arr[i+2][j+2].classList.contains('black') === true &&
          arr[i+3][j+3].classList.contains('black') === true &&
          arr[i+4][j+4].classList.contains('black') === true
          ) {
          memory1++ // 상단의 대각선의 오목의 원리를 그대로 적용한다.
        }
        // 백돌승리
        if (memory2 === 2) {
          return 2
        } else if (
          arr[i][j].classList.contains('white') === true &&
          arr[i+1][j+1].classList.contains('white') === true &&
          arr[i+2][j+2].classList.contains('white') === true &&
          arr[i+3][j+3].classList.contains('white') === true &&
          arr[i+4][j+4].classList.contains('white') === true
        ) {
          memory2 += 2 // 상단의 대각선의 오목의 원리를 그대로 적용한다.
        }
      }
    }
  

    // 반대방향 대각선 오목 ====================

    // 반대 방향 대각선의 원리는 대각선의 원리와 같으나, 방향이 오른쪽에서 왼쪽으로 흘러가기 때문에 
    // 안쪽 인덱스가 큰 숫자부터 작은 숫자로 흘러가야 한다.
    for (let i = 0; i <= 10; i++) {
      let memory1 = 0;
      let memory2 = 0;
      for (let j = 14; j >= 4; j--) { // 오른쪽에서 왼쪽으로 흘러가야 하기 때문에 j의 값을 끝에서부터 빼나간다.
        // 흑돌승리
        if (memory1 === 1) {
          return 1
        } else if (
          arr[i][j].classList.contains('black') === true &&
          arr[i+1][j-1].classList.contains('black') === true &&
          arr[i+2][j-2].classList.contains('black') === true &&
          arr[i+3][j-3].classList.contains('black') === true &&
          arr[i+4][j-4].classList.contains('black') === true
          ) {
          memory1++
        }
        // 백돌승리
        if (memory2 === 2) {
          return 2
        } else if (
          arr[i][j].classList.contains('white') === true &&
          arr[i+1][j-1].classList.contains('white') === true &&
          arr[i+2][j-2].classList.contains('white') === true &&
          arr[i+3][j-3].classList.contains('white') === true &&
          arr[i+4][j-4].classList.contains('white') === true
        ) {
          memory2 += 2
        }
      }
    }

    // 바둑알을 둘 때 마다 문자열을 출력한다.
    console.log('바둑알을 두었습니다.')
    
    // return 0
  }



/* ===============================
    HTML을 컨트롤하기 위한 DOM API
================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 어떤 돌을 둘 차례인지 기억하는 저장소를 만든다.
    let playerMemory = '흑돌'

    // 한칸한칸 순회 중..
    document.querySelectorAll('.col').forEach(el => {

        // 그 중 어떤 요소에 클릭 이벤트가 났을 때,
        el.addEventListener('click', e => {

            // 지금 흑돌의 차례라면
            if (playerMemory === '흑돌') {

              // 만약 돌이 놓아져 있지 않다면 흑돌을 놓는다.
              if(!(el.classList.contains('black')) && !(el.classList.contains('white'))) {
                el.classList.add('black')
                // 다음 턴을 백돌의 차례로 만든 뒤
                playerMemory = '백돌'

                // 다음 차례가 누구의 차례인지를 브라우저에도 표시해준다.
                whoseTurn.classList.remove('black-stone')
                whoseTurn.classList.add('white-stone')
                whoseTurn.textContent = '백돌'
              } else {
                alert('이미 돌이 놓아져 있습니다.')  // 돌이 놓아져 있다면 경고창을 출력한다.
              }

            // 백돌의 차례로 똑같은 방식으로 동작한다.
            } else if (playerMemory === '백돌') {

              // 만약 돌이 놓아져있지 않다면 백돌을 놓는다.
              if(!(el.classList.contains('black')) && !(el.classList.contains('white'))) {
                el.classList.add('white')
                // 다음 턴을 흑돌의 차례로 만든 뒤
                playerMemory = '흑돌'

                // 다음 차례가 누구의 차례인지를 브라우저에도 표시해준다.
                whoseTurn.classList.remove('white-stone')
                whoseTurn.classList.add('black-stone')
                whoseTurn.textContent = '흑돌'
              } else {
                alert('이미 돌이 놓아져 있습니다.') // 돌이 놓아져 있다면 경고창을 출력한다.
              }
            }

            // 오목 함수의 결과값이 1(흑돌)이라면 흑돌이 이기는 화면을 띄운다.
            if (omok(omokArr) === 1) {
                blackWin.classList.add('show-win')
            // 오목 함수의 결과값이 2(백돌)이라면 백돌이 이기는 화면을 띄운다.
            } else if (omok(omokArr) === 2) {
                whiteWin.classList.add('show-win')
            }
        })
    })

    // 재시작 버튼을 누르면 게임이 재시작된다.
    restartButton.forEach(btnEl => {
        btnEl.addEventListener('click', el => {
          whiteWin.classList.remove('show-win')
          blackWin.classList.remove('show-win')
          restart()
        }) 
    })
})