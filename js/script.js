// const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_elements = document.querySelector('.date-picker .dates');
const month_element = document.querySelector('.date-picker .dates .month .mth');
const next_month_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_month_element = document.querySelector('.date-picker .dates .month .prev-mth');

const days_element = document.querySelector('.date-picker .dates .days');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

month_element.textContent = months[month] + ' ' + year;

selected_date_element.textContent = formatDate(date);
selected_date_element.dataset.value = selectedDate;

populateDate();

// EVENT LISTENERS
// date_picker_element.addEventListener('click', toggleDatePicker);
next_month_element.addEventListener('click', goToNextMonth);
prev_month_element.addEventListener('click', goToPrevMonth);

// FUNCTIONS
// function toggleDatePicker(e){
//     console.log(e.path);
//     if (!checkEventPathForClass(e.path, 'dates')){
//         dates_elements.classList.toggle('active');
//     }
// }

function goToNextMonth(e){
    month++;
    if(month > 11){
        month = 0;
        year++;
    }
    month_element.textContent = months[month] + ' ' + year;
    populateDate();
}

function goToPrevMonth(e){
    month--;
    if(month < 0){
        month = 11;
        year--;
    }
    month_element.textContent = months[month] + ' ' + year;
    populateDate();
}

function populateDate(e){
    days_element.innerHTML = "";
    let amountOfDays = 31;

    //assign correct number of days depending on month
    if(month == 0){
        amountOfDays = 31;
    }else if(month == 1){
        amountOfDays = 28;
    }else if(month == 2){
        amountOfDays = 31;
    }else if(month == 3){
        amountOfDays = 30;
    }else if(month == 4){
        amountOfDays = 31;
    }else if(month == 5){
        amountOfDays = 30;
    }else if(month == 6){
        amountOfDays = 31;
    }else if(month == 7){
        amountOfDays = 31;
    }else if(month == 8){
        amountOfDays = 30;
    }else if(month == 9){
        amountOfDays = 31;
    }else if(month == 10){
        amountOfDays = 30;
    }else if(month == 11){
        amountOfDays = 31;
    };

    for (let i = 0; i < amountOfDays; i++){
        const day_element = document.createElement('div');
        day_element.classList.add('day');
        day_element.textContent = i + 1;

        if(selectedDay == (i + 1) && selectedMonth == month && selectedYear == year){
            day_element.classList.add('selected');
        }

        day_element.addEventListener('click', function(){
            selectedDate = new Date(year + '-' + (month+1) + '-' + (i+1));
            selectedDay = i + 1;
            selectedMonth = month;
            selectedYear = year;
            selected_date_element.textContent = formatDate(selectedDate);
            selected_date_element.dataset.value = selectedDate;

            populateDate();
        });

        days_element.appendChild(day_element);
    }
}

// HELPER FUNCTIONS
function checkEventPathForClass(path, selector) {
    for (let i = 0; i < path.length; i++){
        if(path[i].classList && path[i].classList.contains(selector)){
            return true;
        }
    }
    return false;
}

function formatDate(d){
    let day = d.getDate();
    if (day < 10){
        day = '0' + day;
    }
    let month = d.getMonth() + 1;
    if (month < 10){
        month = '0' + month;
    }
    let year = d.getFullYear();

    return month + ' / '  + day + ' / '+ year;
}