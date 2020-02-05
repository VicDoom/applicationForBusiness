document.addEventListener('DOMContentLoaded', function(){
    let start = document.getElementById('start');

    let budgetValue = document.getElementsByClassName('budget-value')[0];
    let dayBudgetValue = document.getElementsByClassName('daybudget-value')[0];
    let levelValue = document.getElementsByClassName('level-value')[0];
    let expensesValue = document.getElementsByClassName('expenses-value')[0];
    let optionalExpensesValue = 
        document.getElementsByClassName('optionalexpenses-value')[0];
    let incomeValue = document.getElementsByClassName('income-value')[0];
    let monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0];
    let yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0];

    let expensesItem = document.getElementsByClassName('expenses-item');

    let expensesBtn = document.getElementsByTagName('button')[0];
    let optionalExpensesBtn = document.getElementsByTagName('button')[1];
    let countBudgetBtn = document.getElementsByTagName('button')[2];

    let optionalExpensesItems = 
        document.querySelectorAll('.optionalexpenses-item');

    let incomeItem = document.querySelector('.choose-income');
    let checkSavings = document.querySelector('#savings');
    let sumValue = document.querySelector('#sum');
    let percentValue = document.querySelector('#percent');
    let yearValue = document.querySelector('.year-value');
    let monthValue = document.querySelector('.month-value');
    let dayValue = document.querySelector('.day-value');

    let money, time;

    expensesBtn.disabled = true;
    optionalExpensesBtn.disabled = true;
    countBudgetBtn.disabled = true;

    expensesBtn.addEventListener('click', function(){
        let sum = 0;
        for (let i = 0; i < expensesItem.length; i++) {
            let a = expensesItem[i].value,
                b = expensesItem[++i].value;
        
            if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
        
                console.log ("done");
        
                appData.expenses[a] = b;
                sum += +b;
            } else {
                console.log ("bad result");
                i -= 2;
            }
            expensesValue.textContent = sum;
            console.log(appData);
        
        }
    });

    start.addEventListener('click', function(){

        expensesBtn.disabled = false;
        optionalExpensesBtn.disabled = false;
        countBudgetBtn.disabled = false ;

        time = prompt ("Введите дату в формате YYYY-MM-DD", "");
        money = +prompt ("Ваш бюджет на месяц?", "");

        while (isNaN(money) || money == "" || money == null) {
            money = +prompt ("Ваш бюджет на месяц?", ""); 
        }

        appData.budget = money;
        appData.timeData = time;
        budgetValue.textContent = money.toFixed();
        yearValue.value = new Date(Date.parse(time)).getFullYear();
        monthValue.value = new Date(Date.parse(time)).getMonth()+1;
        dayValue.value = new Date(Date.parse(time)).getDate();
    });

    optionalExpensesBtn.addEventListener('click', function(){
        for (let i = 0; i < optionalExpensesItems.length; i++) {
            let a = optionalExpensesItems[i].value;
            appData.optionalExpenses[i] = a;
            optionalExpensesValue.textContent += a + ' ';
        }
    });

    countBudgetBtn.addEventListener('click', function() {

        if (appData.budget != undefined) {
            if (appData.expenses == undefined) {
                appData.moneyPerDay = (appData.budget / 30).toFixed(1);
            } else {
                appData.moneyPerDay = ((appData.budget 
                   - +expensesValue.textContent) / 30).toFixed(1);
            }
            
            dayBudgetValue.textContent = appData.moneyPerDay;

            if (appData.moneyPerDay < 100) {
                levelValue.textContent = "Это минимальный уровень достатка!";
            } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                levelValue.textContent = "Это средний уровень достатка!";
            } else if (appData.moneyPerDay > 2000) {
                levelValue.textContent = "Это высокий уровень достатка!";
            } else {
                levelValue.textContent = "Ошибочка...!";
            }
        } else {
            dayBudgetValue.textContent = 'Произошла ошибка';
        }
        
    });

    checkSavings.addEventListener('click', function(){
        appData.savings = !appData.savings;
    });

    sumValue.addEventListener('input', function(){

        if (appData.savings) {
            let sum = +sumValue.value;
            let percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);    
        }

    });

    percentValue.addEventListener('input', function(){

        if (appData.savings) {
            let sum = +sumValue.value;
            let percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);    
        }

    })

    incomeItem.addEventListener('input', function(){
        let income =incomeItem.value; 
        appData.income = income.split(", ");
        incomeValue.textContent = appData.income;
    });
        
    let appData = {
        budget: money,
        timeData: time,
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings: true
    }

    });