const quantity = document.querySelectorAll('.quantity')
const reduce = document.querySelectorAll('.reduce')
const increase = document.querySelectorAll('.increase')

//disable reduce quantity button if quantity is equal to 1
Array.from(quantity).forEach( el => {
    if (el.innerText == 1) {
        const toReduce = el.parentNode.childNodes[3].childNodes[1]
        console.log(toReduce)
        toReduce.setAttribute('disabled', 'disabled')
    }
})

Array.from(quantity).forEach( el => {
    
})

Array.from(quantity).forEach( el => {
    
})