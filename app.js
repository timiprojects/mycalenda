
today = new Date();
const itemHolder = document.querySelector("#more");
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const addbtn = document.createElement('button');
addbtn.innerText = "+"
addbtn.classList.add('addBtn');
document.querySelector(".wrapper").appendChild(addbtn)


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
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");


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