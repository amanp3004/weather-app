
const search = document.querySelector('input');
const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#messOne');
const messageTwo = document.querySelector('#messTwo');

            
weatherForm.addEventListener('submit',(e)=>{
    messageOne.textContent="Loading...";
            messageTwo.textContent=""; 

e.preventDefault();

fetch('/weather?address='+search.value).then((res)=>{
    res.json().then((data)=>{
        if(data.error)
        {
            messageOne.textContent=data.error;
        }
        else{
            messageOne.textContent=data.location;
            messageTwo.textContent=data.forecast; 
        }
    })
});

console.log('testing');
});