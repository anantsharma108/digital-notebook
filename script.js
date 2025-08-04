let menu_icons=document.querySelectorAll('.menu-icon');
let menu_bar=document.querySelector('.menu');
let options=document.querySelectorAll('.option')
let pages=document.querySelectorAll('.page')
let url="https://api.adviceslip.com/advice"
let advice=document.querySelector('.advice p')
let main=document.querySelectorAll('.main')

let buttons=document.querySelectorAll('.button')
    buttons.forEach((button)=>{
            button.style.visibility='hidden'
            })

main.forEach((element)=>{
    element.lastElementChild.style.visibility='hidden'
})
window.addEventListener('DOMContentLoaded',async ()=>{
    const res=await fetch('https://backend-website-tsga.onrender.com/api/notes')
    const notes=await res.json()
    notes.forEach((note)=>{
        let main=document.querySelectorAll('.main')
        let div=document.createElement('div')
        div.classList.add(note.class,'box')
        div.innerHTML=note.content
        div.setAttribute('data-id',note._id)
        main.forEach((ele)=>{
            if(ele.lastElementChild.classList[0]===div.classList[0]){
                ele.prepend(div)
                eventDelete()
                eventEdit()
            }
        })
    })
    let wait=document.querySelector('.wait')
    wait.style.visibility='hidden'

    let buttons=document.querySelectorAll('.button')
    buttons.forEach((button)=>{
            button.style.visibility='hidden'
            })
    const urlParams=new URLSearchParams(window.location.search);
    const isAuthenticated=urlParams.get('authenticated');
    if (isAuthenticated){
        buttons.forEach((button)=>{
            button.style.visibility='visible'
            main.forEach((element)=>{
                element.lastElementChild.style.visibility='visible'
            })
        })
    }
})

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

async function read(){
    let response= await fetch(url);
    let data= await response.json()
    return data.slip.advice
}

options.forEach((option)=>{
    option.addEventListener('click',()=>{
        pages.forEach((page)=>{
            if(option.classList[1]===page.classList[1]){
                page.scrollIntoView({behavior:"smooth",block:'start'})
            }
        })
    })
})

function eventDelete(){
    let delet=document.querySelectorAll('.delete')
    delet.forEach((element)=>{
        element.addEventListener('click',async ()=>{
            let delBox=element.closest('.box-heading').closest('.box')
            console.log(delBox)
            const res =await fetch(`https://backend-website-tsga.onrender.com/api/notes/${delBox.getAttribute('data-id')}`,
            {method:"DELETE"})
            delBox.remove()
        })
    })
}

function eventEdit(){
    let edit=document.querySelectorAll('.edit')
    edit.forEach((element)=>{
        count=0
        element.addEventListener('click',()=>{
            if (count==1){
                return
            }
            let form=document.querySelector('.form-edit')
            form.style.visibility='visible'
            form.children[0].value=element.closest('.box-heading').closest('.box').innerHTML
            let editBox=element.closest('.box-heading').closest('.box')
            let btn=document.querySelector('.btn')
            btn.replaceWith(btn.cloneNode(true)); // removes all old listeners
            btn = document.querySelector('.btn'); // reselect after clone
            count=1
            btn.addEventListener('click',async (event)=>{
                let newHTML=form.children[0].value
                event.preventDefault()
                const res =await fetch(`https://backend-website-tsga.onrender.com/api/notes/${editBox.getAttribute('data-id')}`,
                    {method:"PUT",headers:{'Content-Type':'application/json'},body:JSON.stringify({content:newHTML})})
                element.closest('.box-heading').closest('.box').innerHTML=form.children[0].value
                eventDelete()
                eventEdit()
                form.style.visibility='hidden'
            })
        })
    })
}

let add=document.querySelectorAll('.add')
add.forEach((element)=>{
    element.addEventListener('click',async ()=>{
        let main=element.closest('.page').querySelector('.main')
        let newEle=document.createElement('div')
        newEle.classList=element.closest('.page').querySelector('.main').lastElementChild.classList
        newEle.innerHTML=element.closest('.page').querySelector('.main').lastElementChild.innerHTML
        const res =await fetch('https://backend-website-tsga.onrender.com/api/notes',
            {method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify({content:newEle.innerHTML,class:newEle.classList[0]})})
        const note=await res.json()
        newEle.setAttribute('data-id',note._id)
        main.prepend(newEle)
        eventDelete()
        eventEdit()
    })
})
eventDelete()
eventEdit()