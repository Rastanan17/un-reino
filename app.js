const missions=[
    {text:"🛏️ Haz la cama para preparar el castillo.",stars:10,coins:5},
    {text:"🪥 Cepíllate los dientes.",stars:10,coins:5},
    {text:"🍎 Come una fruta.",stars:20,coins:10},
    {text:"🍽️ Ayuda a poner la mesa.",stars:15,coins:10}
    {text:"🍽️ Ayudar a levantar la mesa.",stars:15,coins:10}
    {text:" .",stars:0,coins:0}
    {text:" .",stars:0,coins:0}
    {text:" .",stars:0,coins:0}
];

let i=0,stars=0,coins=0;

const t=document.getElementById('missionText');
const sb=document.getElementById('startBtn');
const db=document.getElementById('doneBtn');

function load(){
    if(i>=missions.length){
        t.textContent='¡Misiones completas por hoy!';sb.disabled=db.disabled=true;return;
    }
    t.textContent=missions[i].text;sb.disabled=false;db.disabled=true;
}
    sb.onclick=()=>{
        sb.disabled=true;setTimeout(()=>db.disabled=false,5000);
    }
    db.onclick=()=>{
        stars+=missions[i].stars;coins+=missions[i].coins;
        document.getElementById('stars').textContent=stars;
        document.getElementById('coins').textContent=coins;
        alert('¡Misión cumplida! +' + missions[i].stars+'⭐ +' + missions[i].coins+'🪙');
        i++;load();
    }
    load();
    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('service-worker.js');
    }