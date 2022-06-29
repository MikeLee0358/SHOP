const main = document.querySelector('main')
// stepper
const stepOne = document.querySelector('.step')
const stepTwo = document.querySelector('.step-two')
const stepThree = document.querySelector('.step-three')

// form
const basicInfo = document.querySelector('.basic-info')
const deliveryInfo = document.querySelector('.delivery-info')
const cardInfo = document.querySelector('.card-info')

// btn
const btnGroup = document.querySelector('.btn-group')
const nextBtn = document.querySelector('.next')
const preBtn = document.querySelector('.previous')

//order
const orderPanel = document.querySelector('.order-panel')
const wrapperTop = document.querySelector('.delivery-wrapper-top')

const wrapperBottom = document.querySelector('.delivery-wrapper-bottom')
const deliveryFee = document.querySelector('.delivery-fee')
const total = document.querySelector('.total')
let numTop = document.querySelector('.num.top')
let numBottom = document.querySelector('.num.bottom')

//currency
const numberFormat = new Intl.NumberFormat('en-US', { style: "currency", currency: "USD" })

let shoppingMoneyBox = 0
let defaultMoney = 5298
let box = 1

const STEPPER_STATE = {
  StepOne: 1,
  StepTwo: 2,
  StepThree: 3,
}






function changStepperState(event) {
  const target = event.target

  if (target.matches('.next')) {
    box++
    if (box > 3) return
  }
  if (target.matches('.previous')) {
    box--
    if (box < 1) return
  }

  nextBtn.innerHTML = '下一步'

  switch (box) {
    case STEPPER_STATE.StepOne:
      stepTwo.classList.remove('active')
      stepTwo.classList.remove('checked')

      basicInfo.classList.remove('d-none')
      deliveryInfo.classList.add('d-none')
      cardInfo.classList.add('d-none')

      preBtn.classList.add('d-none')
      nextBtn.classList.remove('w-4')
      console.log(nextBtn.classList)
      break;

    case STEPPER_STATE.StepTwo:
      stepOne.classList.remove('active')
      stepOne.classList.add('checked')
      stepTwo.classList.add('active')
      stepThree.classList.remove('active')

      basicInfo.classList.add('d-none')
      deliveryInfo.classList.remove('d-none')
      cardInfo.classList.add('d-none')

      preBtn.classList.remove('d-none')
      preBtn.classList.add('w-4')
      nextBtn.classList.add('w-4')
      break;

    case STEPPER_STATE.StepThree:
      stepTwo.classList.remove('active')
      stepTwo.classList.add('checked')
      stepThree.classList.add('active')

      basicInfo.classList.add('d-none')
      deliveryInfo.classList.add('d-none')
      cardInfo.classList.remove('d-none')

      nextBtn.innerHTML = '確認下單'
      break;
  }
}

function pureNumber(domStr) {
  // 過濾字元
  let pattern = /[$,免費]/g
  return Number(domStr.textContent.replace(pattern, ''))
}


function deliveryFeeChange(event) {
  wrapperTop.classList.remove('border')
  wrapperBottom.classList.remove('border')
  event.target.parentElement.classList.add('border')

  if (event.target.matches('.free')) {
    deliveryFee.innerHTML = '免費'
  } else {
    deliveryFee.innerHTML = `$500`
  }

}

main.addEventListener('click', function clickedOnMain(event) {
  const target = event.target
  const price = event.target.parentElement.nextElementSibling


  if (event.target.matches('LABEL')) {
    deliveryFeeChange(event)
  }
  // 上半部的購物欄
  if (target.matches('.top')) {
    if (target.matches('.plus')) {
      target.previousElementSibling.textContent = pureNumber(numTop) + 1
      shoppingMoneyBox = shoppingMoneyBox + pureNumber(price)
    } else if (target.matches('.minus')) {
      if (pureNumber(numTop) === 0) return
      target.nextElementSibling.textContent = pureNumber(numTop) - 1
      shoppingMoneyBox = shoppingMoneyBox - pureNumber(price)
    }
  }
  // 下半部購物欄
  if (target.matches('.bottom')) {
    if (target.matches('.plus')) {
      target.previousElementSibling.textContent = pureNumber(numBottom) + 1
      shoppingMoneyBox = shoppingMoneyBox + pureNumber(price)
    } else if (target.matches('.minus')) {
      if (pureNumber(numBottom) === 0) return
      target.nextElementSibling.textContent = pureNumber(numBottom) - 1
      shoppingMoneyBox = shoppingMoneyBox - pureNumber(price)
    }
  }

  total.textContent = (shoppingMoneyBox + pureNumber(deliveryFee) + defaultMoney).toLocaleString('TWD')
})




btnGroup.addEventListener('click', function ClickOnBtnGroup(event) {
  changStepperState(event)
})