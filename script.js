let menu_icons=document.querySelectorAll('.menu-icon');
let menu_bar=document.querySelector('.menu');
let options=document.querySelectorAll('.option')
let pages=document.querySelectorAll('.page')
let url="https://api.adviceslip.com/advice"
let advice=document.querySelector('.advice p')

async function thought(){
    let response= await fetch(url);
    let data= await response.json()
    return data.slip.advice
}



menu_bar.style.visibility='hidden'
menu_icons.forEach((menu_icon)=>{
    menu_icon.addEventListener('click',async ()=>{
    if(menu_bar.style.visibility==='hidden'){
        menu_bar.style.visibility='visible'
        text=await thought()
        advice.innerText=text
    }else{
        menu_bar.style.visibility='hidden'
    }
    })
})

options.forEach((option)=>{
    option.addEventListener('click',()=>{
        pages.forEach((page)=>{
            if(option.classList[1]===page.classList[1]){
                page.scrollIntoView({behavior:"smooth",block:'start'})
            }
        })
    })
})