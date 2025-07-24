let menu_icons=document.querySelectorAll('.menu-icon');
let menu_bar=document.querySelector('.menu');
let options=document.querySelectorAll('.option')
let pages=document.querySelectorAll('.page')
let url="https://api.adviceslip.com/advice"
let advice=document.querySelector('.advice p')

async function read(){
    let response= await fetch(url);
    let data= await response.json()
    return data.slip.advice
}

function modify(){
    const urlParams=new URLSearchParams(window.location.search);
    const isAuthenticated=urlParams.get('authenticated');
    if (isAuthenticated){
        page2=document.querySelector('.page2')
        page2.innerText='Welcome dosto'
    }
}

menu_bar.style.visibility='hidden'
menu_icons.forEach((menu_icon)=>{
    menu_icon.addEventListener('click',async ()=>{
    if(menu_bar.style.visibility==='hidden'){
        menu_bar.style.visibility='visible'
        advice.innerText=await read()
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

modify()