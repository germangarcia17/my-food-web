import { menuArray } from '/data.js'


let allPrices = []
let cart = []
let invoiceText = document.getElementById('invoice-data')
let totalPrices = 0
const userName = document.getElementById('name').value
//render food

const foodSectionText = menuArray.map(function(food) {
   return `
   <div class="food-data-container">
        <div class="food-emoji-data">
            <div class="food-emoji">
                ${food.emoji}
            </div>
            <div class="food-data">
                    <p class="food-name">${food.name}</p>
                    <p class="food-ingredients">${food.ingredients.join(', ')}</p>
            </div>
        </div>
        <div class="food-price-add">
                <p class="food-price">$${food.price}</p>
                <button class="add-btn" id="add-btn" data-add="${food.id}">+</button>
        </div>
    </div>
   `
}).join('')

//event listener
document.addEventListener('click', function(e){
    if (e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
        document.getElementById('invoice').classList.remove('hidden')
        document.getElementById('order-message').classList.toggle('hidden')
    } else if (e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    } else if (e.target.dataset.complete){
        document.getElementById('form-container').classList.remove('hidden')
    } else if (e.target.dataset.closeForm){
        document.getElementById('form-container').classList.add('hidden')
    } 
})

document.getElementById('form').addEventListener('submit', function(e){
        e.preventDefault()
        const userName = document.getElementById('form').name.value
        document.getElementById('form-container').classList.add('hidden')
       document.getElementById('invoice').classList.add('hidden')
       document.getElementById('order-message').classList.remove('hidden')
       document.getElementById('order-message').innerHTML = `Hi! ${userName}, your order is in the way!`
       cart = []
       allPrices = []
})

//render invoice when added
function renderInvoice(){
    invoiceText.innerHTML = ''
    cart.forEach(item=>
        invoiceText.innerHTML += `
            <div class="invoice-food" id="${item.id}" data-remove="${item.id}">
                <div class="invoice-food-data">
                    <p class="food-name">x${item.qty}  ${item.name}</p>
                    <button class="invoice-remove-btn" data-remove="${item.id}">remove</button>
                </div>
                <div class="invoice-food-price">
                    <p>$${item.price * item.qty}</p>
                </div>
            </div>`
        
    ) 
    
}

//boton de añadir

function handleAddClick(foodId){
    const foodObjSelected = menuArray.filter(function(food){
        return food.id === Number(foodId)
    })[0]
    const existing = cart.find(item => item.id === foodObjSelected.id)
    if (existing){
        existing.qty += 1
    } else {
        cart.push({...foodObjSelected, qty: 1})
    }

    renderInvoice()
    allPrices.push(foodObjSelected.price)
    totalPrices = allPrices.reduce( (total, currentElement)=> total + currentElement, 0)
    document.getElementById('total-price-data').textContent = `$${totalPrices}`

}



//boton de remover

function handleRemoveClick(foodId){
    const foodObjSelected = menuArray.filter(function(food){
        return food.id === Number(foodId)
    })[0]
    const existing = cart.find(item => item.id === foodObjSelected.id)
    
    if (existing.qty > 1){
        existing.qty -= 1
        
    } else if (existing.qty === 1) {
        existing.qty -= 1
        const index = cart.findIndex(item => item.id === foodObjSelected.id)
        if (index !== -1) {
            cart.splice(index, 1)
            
    }}
    renderInvoice()
    allPrices.pop(foodObjSelected.price)
   totalPrices =  totalPrices - foodObjSelected.price
   document.getElementById('total-price-data').textContent = `$${totalPrices}`
   if (totalPrices === 0){
    document.getElementById('invoice').classList.add('hidden')
   }
   
}

document.getElementById('food-section').innerHTML = foodSectionText
