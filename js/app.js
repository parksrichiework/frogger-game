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
let gameOver= document.querySelector('#game-over-message')
const playAgain= document.querySelector('.play-again-box')
const playAgainDirections= document.querySelector('.play-again-directions')


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

document.addEventListener('mousedown', moveFrogMobile)

function moveFrogMobile(e){
   
    squares[currentIndex].classList.remove('frog')

    if(e.target.classList.contains('left-button') &&
        currentIndex % width !== 0){       
            currentIndex -= 1
    }
    if(e.target.classList.contains('right-button') &&
        currentIndex % width < width -1){
        currentIndex += 1 
    } 
    
    if(e.target.classList.contains('up-button') &&
        currentIndex - width >= 0){
        currentIndex -= width
    }
    if(e.target.classList.contains('down-button') &&
    currentIndex + width < width * width){
        currentIndex += width
    }
   

    squares[currentIndex].classList.add('frog')
}
    

    







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
    // frogOnLog()
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
        squares[currentIndex].classList.remove('c1')
        squares[currentIndex].classList.add('frog-lose')
        document.removeEventListener('keyup', moveFrog)
        document.removeEventListener('mousedown', moveFrogMobile)
        clearInterval(outcomeTimerId)
        startPauseButton.textContent= "T__T"
        gameOver.textContent= "Oops! Watch out for cars and water!"
        playAgain.style.display= 'flex'
        playAgainModal.style.display= 'flex'
        
    }

    
}

// ----------------------- check to see if you win
function win(){
    if(
        squares[currentIndex].classList.contains('ending-block')
    ){
        resultDisplay.textContent= "You Win!"
        squares[currentIndex].classList.remove('frog')
        squares[currentIndex].classList.remove('ending-block')
        squares[currentIndex].classList.add('frog-win')
        clearInterval(timerId)
        document.removeEventListener('keyup', moveFrog)
        document.removeEventListener('keyup', moveFrogMobile)
        clearInterval(outcomeTimerId)
        startPauseButton.textContent= "^__^"
        gameOver.textContent= "Nice Job!"
        playAgain.style.display= 'flex'
        playAgainModal.style.display= 'flex'
    }

}

//--------------------------- start/pasue button function
startPauseButton.addEventListener('click', ()=> {
    if(timerId){
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        timerId= null
        document.removeEventListener('keyup', moveFrog)
        document.removeEventListener('mousedown', moveFrogMobile)
        startPauseButton.classList.remove('paused')
        startPauseButton.classList.add('not-paused')
        startPauseButton.textContent= 'Start'
    } else{
    timerId = setInterval(autoMoveElements, 1000)
    document.addEventListener('keyup', moveFrog)
    document.addEventListener('mousedown', moveFrogMobile)
    outcomeTimerId = setInterval(checkOutcomes, 50)
    startPauseButton.classList.remove('notpaused')
    startPauseButton.classList.add('paused')
    startPauseButton.textContent= 'Pause'
    }

})

//check to see if frog is on log
// function frogOnLog(){
//     if((squares[currentIndex].classList.contains('l1') && squares[currentIndex].classList.contains('frog')) ||
//        (squares[currentIndex].classList.contains('l2') && squares[currentIndex].classList.contains('frog')) ||
//        (squares[currentIndex].classList.contains('l3') && squares[currentIndex].classList.contains('frog'))){        
        
//         squares[currentIndex].classList.toggle('frog-on-log')
//     } 
        
    
// }



document.removeEventListener('keyup', moveFrog)
document.removeEventListener('keyup', moveFrogMobile)
// timerId= setInterval(autoMoveElements, 1000)

alert('Let\'s get jumping!');

//------------------------------------- close directions modal 

let closeDirections = document.querySelector('#close-button');
let directions = document.querySelector('#game-directions');
let directionsModal = document.querySelector('#game-directions-modal')
let playAgainModal= document.querySelector('#play-again-modal')

closeDirections.addEventListener('click', closeBox);

function closeBox(){
         directions.classList.add('closed');
         directionsModal.classList.add('closed')
         playAgainModal.classList.add('closed')
         console.log('closed the directions');
                             
   }