'use strict'

let today = new Date();
const itemHolder = document.querySelector("#more");
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");
const modal = document.querySelector("#modal");
const formplan = document.querySelector("[data-form='plan']#form.form")

let plans = [], id = 1

formplan.addEventListener('submit', function (e) {
    e.preventDefault();
    //console.log(e.target.start_date)
    const { start_date, end_date, budget, list } = e.target
    if (!start_date.value && !end_date.value && !budget.value && !list.value) {
        console.log('one or more field(s) are empty!!')
    } else {
        plans.unshift({
            id: id++,
            start_date: start_date.value,
            end_date: end_date.value,
            budget: budget.value,
            list: list.value,
        })
    }

    console.log(plans)
})


const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const showlist = document.createElement('button');
showlist.innerHTML = `<i class="material-icons">list</i>`
showlist.classList.add('addBtn');
document.querySelector(".wrapper").appendChild(showlist)

showlist.addEventListener('click', function () {

    if (modal.classList.contains("show")) {
        modal.classList.remove("show");
    }
    modal.classList.add("show");
})

document.querySelector("[data-dismiss='modal']").addEventListener('click', function () {
    if (modal.classList.contains("show")) {
        modal.classList.remove("show");
    }
})


init(months, currentYear);






// function next() {
//     currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
//     currentMonth = (currentMonth + 1) % 12;
//     console.log(currentMonth, currentYear)
//     init(months, currentYear)
// }

// function previous() {
//     currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
//     currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
//     showCalendar(currentMonth, currentYear);
// }

function next() {
    currentYear = (currentYear === currentYear) ? currentYear + 1 : currentYear;
    //currentMonth = (currentMonth + 1) % 12;
    console.log(currentMonth, currentYear)
    itemHolder.innerHTML = "";
    init(months, currentYear)
}

function previous() {
    currentYear = (currentYear === currentYear) ? currentYear - 1 : currentYear;
    //currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    itemHolder.innerHTML = "";
    init(months, currentYear)
}

function init(months, year) {
    for (let i = 0; i < months.length; i++) {
        let month;
        (function (cur) {
            month = new Date(null, cur).getMonth()
            const yD = document.querySelector('#yearDate');
            yD.innerText = year
            showCalendar(month, year);
        })(i)
    }
}

// function jump() {
//     currentYear = parseInt(selectYear.value);
//     currentMonth = parseInt(selectMonth.value);
//     showCalendar(currentMonth, currentYear);
// }

function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let tbl = document.createElement("table");

    let Thead = tbl.createTHead()
    let Tbody = tbl.createTBody()

    Thead.insertAdjacentHTML('beforeend', `
        <tr><th class="mtitle">${months[month]} ${year}</th></tr>
        <tr>
            <td>Sun</td>
            <td>Mon</td>
            <td>Tue</td>
            <td>Wed</td>
            <td>Thu</td>
            <td>Fri</td>
            <td>Sat</td>
        </tr>
    `)

    // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";



    // selectYear.value = year;
    // selectMonth.value = month;


    // creating all cells
    let date = 1, cell, cellText;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");
        row.setAttribute("id", "itemrows")
        row.setAttribute("data-rows", "rows")


        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
                Tbody.appendChild(row)
            }
            else if (date > daysInMonth(month, year)) {
                break;
            }

            else {
                cell = document.createElement("td");
                cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date



                cell.appendChild(cellText);
                row.appendChild(cell);
                Tbody.appendChild(row)
                date++;


            }

        }
        tbl.appendChild(Thead);
        tbl.appendChild(Tbody); // appending each row into calendar body.

    }
    itemHolder.appendChild(tbl)
    const trows = Tbody.querySelectorAll("[data-rows='rows']")
    trows.forEach((_row) => {
        const tds = _row.querySelectorAll("td");
        tds.forEach((td) => {
            if (td.innerText == "") {
                //td.remove();
            } else {
                td.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    if(modal.classList.contains("show")) {
                        modal.classList.remove("show");
                    }
                    modal.classList.add("show");
                    formplan.start_date.value = `${year}-${month+1}-${e.target.innerText}`;
                    console.log(modal.querySelector("#form"))
                })
            }
        })
    })
}



// function showCalendar(month, year) {

//     let firstDay = (new Date(year, month)).getDay();

//     let tbl = document.querySelector("#calendar"); // body of the calendar

//     // clearing all previous cells
//     tbl.innerHTML = "";

//     // filing data about month and in the page via DOM.
//     monthAndYear.innerHTML = months[month] + " " + year;
//     // selectYear.value = year;
//     // selectMonth.value = month;

//     // creating all cells
//     let date = 1;
//     for (let i = 0; i < 6; i++) {
//         // creates a table row
//         let row = document.createElement("tr");

//         //creating individual cells, filing them up with data.
//         for (let j = 0; j < 7; j++) {
//             if (i === 0 && j < firstDay) {
//                 cell = document.createElement("td");
//                 cellText = document.createTextNode("");
//                 cell.appendChild(cellText);
//                 row.appendChild(cell);
//             }
//             else if (date > daysInMonth(month, year)) {
//                 break;
//             }

//             else {
//                 cell = document.createElement("td");
//                 cellText = document.createTextNode(date);
//                 if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
//                     cell.classList.add("bg-info");
//                 } // color today's date
//                 cell.appendChild(cellText);
//                 row.appendChild(cell);
//                 date++;
//             }


//         }

//         tbl.appendChild(row); // appending each row into calendar body.
//     }

// }


// check how many days in a month code from https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}