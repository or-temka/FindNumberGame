
class numberOneNumbersGame {

  level = 1;
  bonusPoints = 0;
  bonusLevel = 1;
  btnsColors = ['#f28e37', '#fc73b0', '#8e3dcb', '#94c94d', '#4db8ec'];
  timerValue = 9;
  trueLevels = 0;
  onlyLevels = 0;

  audioTimerStart = new Audio('audio/5a74133cdb3fbcbfa129fd8f3c297efb.mp3');
  audioTimerCounter = new Audio('audio/bc5ef7f2c1b10e4296181a1361f8be52.mp3');

  // Начинает игру заного
  startAgain(){
    document.querySelector('.results').style.display = 'none';
    document.querySelector('.training_container').style.display = 'block';
    document.querySelector('.level-points :last-child').innerHTML = '0';
    document.querySelector('.game-level_container').style.backgroundColor = 'rgb(77, 184, 236)';
      document.querySelector('.game-level_container .tutorial_task').style.backgroundColor = 'rgb(77, 184, 236)';
    this.level = 1;
    this.bonusPoints = 0;
    this.bonusLevel = 1;
    this.timerValue = 9;
    this.trueLevels = 0;
    this.onlyLevels = 0;
    this.createBtnsAndFindNumber();
    this.setNewLevel(false);
  }

  // close the training and start the tutorial by pressing the button `ДАЛЕЕ`
  startTutorial(){
    document.querySelector('.training_container').style.display = 'none';
    document.querySelector('.tutorial_container').style.display = 'flex';
    document.querySelector('.game-container').style.display = 'flex';
    game.createBtnsAndFindNumber();
  };
  
  // close the tutorial and start game by pressing on screen
  endTutorial(){
    document.querySelector('.timer-counter').innerHTML = '3';
    document.querySelector('.tutorial_container').style.display = 'none';
    document.querySelector('.start-game-timer_container').style.display = 'flex';
    let counterTimer = 2;
    let timerValue = document.querySelector('.timer-counter');
    this.audioTimerCounter.play();
    let timerInterval = setInterval(() => {
      this.audioTimerCounter.currentTime = 0;
      if (counterTimer != 0){
        timerValue.innerHTML = counterTimer;
        counterTimer--;
        this.audioTimerCounter.play();
      } else {
        this.audioTimerStart.play();
        clearInterval(timerInterval);
        this.closeTimerAndStartGame();
      }
    }, 1000);
  };

  closeTimerAndStartGame(){
    document.querySelector('.start-game-timer_container').style.display = 'none';
    document.querySelector('.game-level_container').style.display = 'flex';
    this.setTimer();
  }

  setTimer(){
    let timeSpan = document.querySelector('.timer-game :last-child');
    timeSpan.innerHTML = '01:00';
    let gameTimerInterval = setInterval(() => {
      if (this.timerValue == 0) {
        timeSpan.innerHTML = '00:00';
        clearInterval(gameTimerInterval);
        return;
      }
      else if (this.timerValue < 10){
        timeSpan.innerHTML = '00:0' + this.timerValue;
      } else {
        timeSpan.innerHTML = '00:' + this.timerValue;
      }
      this.timerValue--;
      
    }, 1000);
  };

  //Обработка правильного и неправильного ответов
  trueWrongAswer(trueAnswer = false){
    this.onlyLevels++;
    let btnWrapper = document.querySelector('.game-level_container .tutorial_numbers');
    btnWrapper.style.marginRight = '2000px';
    let findNumberSpan = document.querySelector('.game-level_container .tutorial_task .game-btn_item-inner');
    findNumberSpan.style.right = '2000px';
    setTimeout(() => {
      if (trueAnswer){
        this.trueLevels++;
        this.audioTimerStart.currentTime = 0;
        this.audioTimerStart.play();
        document.querySelector('.answer-result__true-result').style.display = 'block';
        hideAndVisibleAnswers(this);
        this.setNewLevel(true);
      } else {
        this.audioTimerCounter.currentTime = 0;
        this.audioTimerCounter.play();
        document.querySelector('.answer-result__wrong-result').style.display = 'block';
        hideAndVisibleAnswers(this);
        this.setNewLevel(false);
      }
      //Конец игры по истечении таймера
      if (this.timerValue == 0){
        setTimeout(() => {
          document.getElementById('current-result').innerHTML = this.bonusPoints;
          document.getElementById('true-answer').innerHTML = this.trueLevels + ' из ' + this.onlyLevels;
          document.getElementById('accuracy-answer').innerHTML = Math.floor(100/this.onlyLevels * this.trueLevels) + '%';
          document.querySelector('.results').style.display = 'block';
          document.querySelector('.game-level_container').style.display = 'none';
          document.querySelector('.game-container').style.display = 'block';
          return;
        }, 300);
      }

      function hideAndVisibleAnswers(thisClass){
        setTimeout(() => {
          btnWrapper.style.transition = '0s';
          findNumberSpan.style.transition = '0s';
          btnWrapper.style.marginRight = '0px';
          btnWrapper.style.marginLeft = '2000px';
          findNumberSpan.style.right = '-2000px';

          // Изменение уровня
          function editBtnSize(width = 145, height = 80, textSize = 40){
            const btnContainer = document.querySelectorAll('.game-level_container .tutorial_numbers .game-btn_item');
            btnContainer.forEach(btn => {
              btn.style.width = width + 'px';
              const btnSpan = btn.querySelector('.game-btn_item-inner');
              btnSpan.style.fontSize = textSize + 'px';
              btnSpan.style.lineHeight = height + 'px';
            });
          }
          
          switch (thisClass.level) {
            case 1:
              thisClass.createBtnsAndFindNumber();
              editBtnSize();
              break;
              
            case 2:
              thisClass.createBtnsAndFindNumber(6, 99);
              editBtnSize();
              break;
      
            case 3:
              thisClass.createBtnsAndFindNumber(6, 999, true);
              editBtnSize();
              break;
      
            case 4:
              thisClass.createBtnsAndFindNumber(12, 999, true);
              
              editBtnSize(110, 60, 30);
              break;
      
            case 5:
              thisClass.createBtnsAndFindNumber(12, 999, true);
              editBtnSize(110, 60, 30);
              break;
              
            case 6:
              thisClass.createBtnsAndFindNumber(16, 999, true);
              editBtnSize(110, 52, 24);
              break;
      
            case 7:
              thisClass.createBtnsAndFindNumber(16, 9999, true);
              editBtnSize(110, 52, 24);
              break;
      
            case 8:
              thisClass.createBtnsAndFindNumber(25, 9999, true);
              editBtnSize(87, 41, 18);
              break;
      
            case 9:
              thisClass.createBtnsAndFindNumber(25, 9999, true);
              editBtnSize(87, 41, 18);
              break;
          }

          setTimeout(() => {
            btnWrapper.style.transition = 'all 0.3s linear 0s';
            findNumberSpan.style.transition = 'all 0.3s linear 0s';
            btnWrapper.style.marginLeft = '0px';
            findNumberSpan.style.right = '20px';
            document.querySelector('.answer-result__true-result').style.display = 'none';
            document.querySelector('.answer-result__wrong-result').style.display = 'none';
          }, 10);
        }, 300);
      }
    }, 40);
    
  }

  // Устанавливает новый уровень в зависимости от правильности ответа
  setNewLevel(trueAnswer = false){
    if (trueAnswer){
      let randomBgColorNum = Math.floor(Math.random() * this.btnsColors.length);
      document.querySelector('.game-level_container').style.backgroundColor = this.btnsColors[randomBgColorNum];
      document.querySelector('.game-level_container .tutorial_task').style.backgroundColor = this.btnsColors[randomBgColorNum];
      this.setPoints();
      if (this.level != 9){
        this.level++;
      }
    } else {
      if (this.level != 1){
        this.level--;
      }
    }

    // Изменение множителя бонусов
    const pointsWrapper = document.querySelector('.level-points-bonus_value-container');
    let pointsDivs = pointsWrapper.querySelectorAll('.lavel-points-bonus_point');
    pointsDivs.forEach(element => {
      element.style.backgroundColor = 'initial';
    });
    const bonusMultSpan = document.querySelector('.level-points-bonus_value-container :last-child');
    if (this.level == 1){
      this.bonusLevel = 1;
      pointsWrapper.querySelector(':nth-child(1)').style.backgroundColor = 'black';
      bonusMultSpan.innerHTML = 'x1';
    } else if (this.level == 2){
      this.bonusLevel = 2;
      pointsWrapper.querySelector(':nth-child(1)').style.backgroundColor = 'black';
      pointsWrapper.querySelector(':nth-child(2)').style.backgroundColor = 'black';
      bonusMultSpan.innerHTML = 'x2';
    } else if (this.level == 3){
      this.bonusLevel = 3;
      for (let i = 1; i <= 3; i++){
        pointsWrapper.querySelector(':nth-child(' + i + ')').style.backgroundColor = 'black';
      }
      bonusMultSpan.innerHTML = 'x3';
    } else if (this.level == 4){
      this.bonusLevel = 4;
      for (let i = 1; i <= 4; i++){
        pointsWrapper.querySelector(':nth-child(' + i + ')').style.backgroundColor = 'black';
      }
      bonusMultSpan.innerHTML = 'x4';
    } else if (this.level >= 5){
      this.bonusLevel = 5;
      for (let i = 1; i <= 5; i++){
        pointsWrapper.querySelector(':nth-child(' + i + ')').style.backgroundColor = 'black';
      }
      bonusMultSpan.innerHTML = 'x5';
    }
    document.querySelector('.level-label :last-child').innerHTML = this.level + '-9';
  }

  // Отвечает за получение очков 
  setPoints(){
    this.bonusPoints += this.bonusLevel * 50;
    document.querySelector('.level-points :last-child').innerHTML = this.bonusPoints;
  }

  createBtnsAndFindNumber(btnCount = 6, btnMaxValue = 10, animation = false){
    let btnWrapper = document.querySelector('.game-level_container .tutorial_numbers');
    btnWrapper.innerHTML = '';
    let btn;
    let spanForBtn;
    for (let i = 0; i < btnCount; i++){
      btn = document.createElement('button');
      btn.classList = 'game-btn_item';
      spanForBtn = document.createElement('span');
      spanForBtn.classList = 'game-btn_item-inner';
      btn.append(spanForBtn);
      btnWrapper.append(btn);
      setRandomBtnColor(btn, this.btnsColors)
      if (animation){
        setRandomAnimation(btn);
      }

      // Проверка правильности выбранного ответа
      btn.addEventListener('click', (e) => {
        if (e.target.textContent == document.querySelector('.game-level_container .tutorial_task .game-btn_item-inner').textContent){
          this.trueWrongAswer(true);
        } else {
          this.trueWrongAswer(false);
        }
      });
      
    }
    setRandomBtnValue(btnMaxValue);
    setFindNumber();

    // Устанавливаем рандомные числа на кнопки
    function setRandomBtnValue(maxNumbersInBtn = 10){
      let btnBox = document.querySelectorAll('.game-level_container .game-btn_item .game-btn_item-inner');
      let btnNumMass = [];
      btnBox.forEach((btn) => {
        let numForBtn = Math.floor(Math.random() * maxNumbersInBtn);
        while (btnNumMass.indexOf(numForBtn) != -1){
          numForBtn = Math.floor(Math.random() * 10) + 1;
        }
        btnNumMass.push(numForBtn);
        btn.innerHTML = numForBtn;
      });
      setTimeout(() => {
        document.querySelector('.game-level_container .tutorial_numbers').style.transition = 'all .3s linear';
        document.querySelector('.game-level_container .tutorial_numbers').style.marginLeft = '0px';
      }, 10);
    };

    function setRandomBtnColor(btn, colorsArray){
      let randomColorNum = Math.floor(Math.random() * colorsArray.length);
      btn.style.backgroundColor = colorsArray[randomColorNum];
    }

    function setRandomAnimation(btn){
      let randomAnimationNum = Math.floor(Math.random() * 3);
      if (randomAnimationNum == 0){
        btn.classList = btn.classList + ' animate-blinker';
      } else if (randomAnimationNum == 1){
        btn.querySelector('span').classList = btn.querySelector('span').classList + ' animate-rotate';
      } else {
        btn.classList = btn.classList + ' animate-scale';
      }
    }

    // Устанавливаем число для поиска
    function setFindNumber(){
      let btnBox = document.querySelectorAll('.game-level_container .game-btn_item .game-btn_item-inner');
      let enterBtnNum = Math.floor(Math.random() * btnBox.length) + 1;
      let nowBtnInForEach = 1;
      btnBox.forEach((btn) => {
        if (nowBtnInForEach == enterBtnNum){
          document.querySelector('.game-level_container .tutorial_task .game-btn_item-inner').innerHTML = btn.innerHTML;
        }
        nowBtnInForEach++;
      });
      setTimeout(() => {
      document.querySelector('.game-level_container .tutorial_task .game-btn_item-inner').style.transition = 'all .3s linear';
      document.querySelector('.game-level_container .tutorial_task .game-btn_item-inner').style.right = '20px';
      }, 10);
    };
  }

}

let game = new numberOneNumbersGame();