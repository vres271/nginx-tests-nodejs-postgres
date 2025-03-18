const main = document.getElementById('main');

function createTable(resData) {
    if (resData.length !== 0) {
        const table = document.createElement('table');
        main.appendChild(table);
        const tHead = document.createElement('thead');
        table.appendChild(tHead);
        const tBody = document.createElement('tbody');
        table.appendChild(tBody);

        Object.keys(resData[0]).forEach(key => {
            const th = document.createElement('th');
            th.innerHTML = key;
            tHead.appendChild(th);
        })

        resData.forEach(el => {
            const tr = document.createElement('tr');
            tBody.appendChild(tr);
            Object.values(el).forEach(val => {
                const td = document.createElement('td');
                td.innerHTML = val;
                tr.appendChild(td);
            })
        })
    }
}


fetch('http://127.0.0.1:8080/users')
    .then(res => res.json())
    .then(resData => createTable(resData));