'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const eurToUsd = 1.1;

//#region [ #1 MOVEMENT DISPLAY ]
// A function to display movements in movements div
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  //   REMOVED EVERYTHING BEFORE ADDING

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    // Got movement type value
    const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">
                ${i + 1} ${type}
            </div>
            <div class="movements__value">${mov} EUR</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
    // Added html template in movements div
  });
};
//#endregion

//#region [ #2 Euro To USD - Map Method Example ]
// const eurToUsd = 1.1;
// const movementsUSD = account1.movements.map(function (mov) {
//   return mov * eurToUsd;
// });
// console.log(movementsUSD);
//#endregion

//#region [ #3 Computing Usernames }

//lowercase yaptik, bosluklardan bolduk map ile ilk elemenlari alip yeni dizi haline getirdik ve join ile diziyi( birlestirip string yaptik.
const createUsername = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(accounts);
console.log(accounts);

//#endregion

//#region [ #4 Filter Method - Deposit and Withdrawal Arrays ]

const deposits = account1.movements.filter(function (mov) {
  return mov > 0;
});
const withdrawal = account1.movements.filter(function (mov) {
  return mov < 0;
});
console.log(deposits);
console.log(withdrawal);
//#endregion

//#region [ #5 Reduce Method - Balance calculated and displayed ]

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  console.log(balance);
  currentAccount.balance = balance;
  labelBalance.textContent = `${balance} EUR`;
};
//#endregion

//#region [ CODING CHALLENGE #2 ]

// console.log('CODING CHALLENGE #2');
// const calcAverageHumanAge = function (ages) {
//   const ageArr = ages.map(function (age) {
//     if (age <= 2) {
//       return age * 2;
//     } else {
//       return 16 + age * 4;
//     }
//   });
//   console.log(ageArr);

//   const filteredAgeArr = ageArr.filter(function (age) {
//     return age > 18;
//   });
//   console.log(filteredAgeArr);

//   const averageHumanAgeOfDogs = ageArr.reduce(
//     (acc, mov) => acc + mov / filteredAgeArr.length,
//     0
//   );
//   console.log(averageHumanAgeOfDogs);
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

//#endregion

//#region [ #4 Chaining Methods - EurTOUSD - in and out calculated and displayed ]

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .map(mov => mov * eurToUsd)
    .reduce((acc, mov) => acc + mov, 0);
  const totalIncome = Math.round(incomes);
  labelSumIn.textContent = `${totalIncome} EUR`;

  const out = movements
    .filter(mov => mov < 0)
    .map(mov => mov * eurToUsd)
    .reduce((acc, mov) => acc + mov, 0);
  const totalOut = Math.round(out);
  labelSumOut.textContent = `${Math.abs(totalOut)} EUR`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * currentAccount.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} EUR`;
};

//#endregion

//#region [ CODING CHALLENGE # 3 ]

// console.log('CODING CHALLENGE #3');
// const calcAverageHumanAge = function (ages) {
//   const ageArr = ages
//     .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
//     .filter(age => age > 18)
//     .reduce((acc, mov) => acc + mov / ages.length, 0);
//   console.log(ageArr);
// };
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

//#endregion

//#region [ #7 Find Method ]

//it is not like filter method. it is not return new array.
//it returns first element that can pass condition.
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);
//returns the object

//#endregion

//#region [ #8 Implementing Login ]

//Event handlers
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  console.log(currentAccount);
  //if current account exist and equal pins
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;
    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur(); //for losing focus = remove mouse inside field
    inputLoginPin.blur();
    updateUI();
  } else {
    console.log('WRONG PIN');
  }
});

function updateUI() {
  //display movements
  displayMovements(currentAccount.movements);
  //display balance
  calcDisplayBalance(currentAccount.movements);
  //display summary
  calcDisplaySummary(currentAccount.movements);
}
//#endregion

//#region [ #9 Implementing Transactions ]
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();

  if (
    amount > 0 &&
    receiverAccount &&
    amount <= currentAccount.balance &&
    receiverAccount?.username !== currentAccount.username
  ) {
    console.log('you can transfer');
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUI();
  } else {
    console.log('you cant transfer');
  }
});
//#endregion

//#region [ #10 Find Index - Account closing ]

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
  inputCloseUsername.blur();
  inputClosePin.blur();
});

//#endregion

//#region [ #11 Loan with some-every functions ]

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 && //ITS COMING FROM FLOW CHART
    currentAccount.movements.some(mov => mov >= loanAmount * 0.1)
  ) {
    currentAccount.movements.push(loanAmount);
    updateUI();
  } else {
    console.log('You cant loan that much');
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

//#endregion

//#region [ #12 Movements Sorting ]

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//#endregion
