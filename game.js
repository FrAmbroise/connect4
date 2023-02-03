let rows = document.querySelector('tr')
rows.classList.add('test')
// console.log(rows.children[2])
let current_col = rows.children[2]
current_col.style.border = "2px inset #f405ff"
let col = 2

function foo() {

    fetch("http://localhost:3000/side", {
        method: "GET",
    }).then(d => {
        return d.json()
    }).then(dd => {
        console.log(dd.data)
        if(dd.data.Pressed == 'yes'){
            console.log('click')
            current_col.click()
            rows = document.querySelector('tr')
            current_col = rows.children[2]
            col = 2
            current_col.style.border = "2px inset #f405ff"
        }
        if(dd.data.side == 'right') {
            if(col != 6){
                current_col.style.border = "2px blue inset"
                col++
                current_col = rows.children[col]
                current_col.style.border = "2px inset #f405ff"
            }
        }else if(dd.data.side == 'left') {
            console.log('left')
            if(col != 0){
                current_col.style.border = "2px blue inset"
                col--
                current_col = rows.children[col]
                current_col.style.border = "2px inset #f405ff"
            }
        }
        
    })

    setTimeout(foo, 1000);
}

foo()






