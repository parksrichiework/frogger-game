const timeLeftDisplay= document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton= document.querySelector('#start-pause-button')
const squares= document.querySelectorAll('.grid div')
const logsLeft= document.querySelectorAll('.log-left')
const logsRight= document.querySelectorAll('.log-right')
const carsLeft= document.querySelectorAll('.car-left')
const carsRight= document.querySelectorAll('.car-right')

const leftButton = document.querySelector('.left-button')
const rightButton = document.querySelector('.right-button')
const upButton = document.querySelector('.up-button')
const downButton = document.querySelector('.down-button')



let currentIndex = 76
const width= 9
let currentTime = 20
let timerId
let outcomeTimerId

// ---------------------MOVE THE FROG 

// move fog with arrow keys
document.addEventListener('keyup', moveFrog)

function moveFrog(e){

    squares[currentIndex].classList.remove('frog')
    
      
    switch(e.key){
        case 'ArrowLeft':
            console.log('move left')
            if (currentIndex % width !== 0){
                currentIndex -= 1
            } 
            break
        case 'ArrowRight':
             console.log('move right')
            if (currentIndex % width < width -1){
                currentIndex += 1 
            } 
            break            
        case 'ArrowUp':
            console.log('move up')
            if(currentIndex - width >= 0){
                currentIndex -= width
            } 
             break                         
        case 'ArrowDown':
            console.log('move down')
            if(currentIndex + width < width * width){
                currentIndex += width
            } 
            break               
         }


    squares[currentIndex].classList.add('frog')
    
}
// move frog with buttons

// document.addEventListener('click', moveFrogMobile)

// function moveFrogMobile(e){

//     squares[currentIndex].classList.remove('frog')

//     if(e.target == leftButton){
//         console.log=('moved left')
//     }

//     squares[currentIndex].classList.add('frog')   
// }
    

    







// -------------------------------MOVE LOGS AND CARS
function autoMoveElements(){
    currentTime --
    timeLeftDisplay.textContent= currentTime
    logsLeft.forEach( logLeft => moveLogLeft(logLeft))
    logsRight.forEach( logRight => moveLogRight(logRight))
    carsLeft.forEach( carLeft => moveCarLeft(carLeft))
    carsRight.forEach( carRight => moveCarRight(carRight))
    
}

function checkOutcomes(){
    lose()
    win()
}

// --------------------------------MOVE logs LEFT 
function moveLogLeft(logLeft){
    switch(true){
    case logLeft.classList.contains('l1'):
        logLeft.classList.remove('l1')
        logLeft.classList.add('l2')
        break
    case logLeft.classList.contains('l2'):
        logLeft.classList.remove('l2')
        logLeft.classList.add('l3')
        break
    case logLeft.classList.contains('l3'):
        logLeft.classList.remove('l3')
        logLeft.classList.add('l4')
        break     
    case logLeft.classList.contains('l4'):
        logLeft.classList.remove('l4')
        logLeft.classList.add('l5')
        break
    case logLeft.classList.contains('l5'):
        logLeft.classList.remove('l5')
        logLeft.classList.add('l1')
        break
    }
}
// -----------------------------------MOVE LOGs RIGHT 
function moveLogRight(logRight){
    switch(true){
    case logRight.classList.contains('l1'):
        logRight.classList.remove('l1')
        logRight.classList.add('l5')
        break
    case logRight.classList.contains('l2'):
        logRight.classList.remove('l2')
        logRight.classList.add('l1')
        break
    case logRight.classList.contains('l3'):
        logRight.classList.remove('l3')
        logRight.classList.add('l2')
        break     
    case logRight.classList.contains('l4'):
        logRight.classList.remove('l4')
        logRight.classList.add('l3')
        break
    case logRight.classList.contains('l5'):
        logRight.classList.remove('l5')
        logRight.classList.add('l4')
        break
    }
}

// --------------------------------MOVE CAR LEFT 
function moveCarLeft(carLeft){
    switch(true){
    case carLeft.classList.contains('c1'):
        carLeft.classList.remove('c1')
        carLeft.classList.add('c2')
        break
    case carLeft.classList.contains('c2'):
        carLeft.classList.remove('c2')
        carLeft.classList.add('c3')
        break
    case carLeft.classList.contains('c3'):
        carLeft.classList.remove('c3')
        carLeft.classList.add('c1')
        break         
    }
}
// -----------------------------------MOVE CAR RIGHT 
function moveCarRight(carRight){
    switch(true){
    case carRight.classList.contains('c1'):
        carRight.classList.remove('c1')
        carRight.classList.add('c3')
        break
    case carRight.classList.contains('c2'):
        carRight.classList.remove('c2')
        carRight.classList.add('c1')
        break
    case carRight.classList.contains('c3'):
        carRight.classList.remove('c3')
        carRight.classList.add('c2')
        break     
    
    }
}
// ------------------------------ check to see if you lose
function lose(){
    if(
        squares[currentIndex].classList.contains('c1') ||
        squares[currentIndex].classList.contains('l4') ||
        squares[currentIndex].classList.contains('l5') ||
        currentTime <= 0
    ){
        resultDisplay.textContent= 'You Lose!'
        clearInterval(timerId)
        squares[currentIndex].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog)
        clearInterval(outcomeTimerId)
        startPauseButton.textContent= "T__T"
    }
}

// ----------------------- check to see if you win
function win(){
    if(
        squares[currentIndex].classList.contains('ending-block')
    ){
        resultDisplay.textContent= "You Win!"
        clearInterval(timerId)
        document.removeEventListener('keyup', moveFrog)
        clearInterval(outcomeTimerId)
        startPauseButton.textContent= "^__^"
    }

}


startPauseButton.addEventListener('click', ()=> {
    if(timerId){
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        timerId= null
        document.removeEventListener('keyup', moveFrog)
        startPauseButton.classList.remove('paused')
        startPauseButton.classList.add('not-paused')
        startPauseButton.textContent= 'Start'
    } else{
    timerId = setInterval(autoMoveElements, 1000)
    document.addEventListener('keyup', moveFrog)
    outcomeTimerId = setInterval(checkOutcomes, 50)
    startPauseButton.classList.remove('notpaused')
    startPauseButton.classList.add('paused')
    startPauseButton.textContent= 'Pause'
    }

})
// timerId= setInterval(autoMoveElements, 1000)