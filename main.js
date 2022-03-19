const PokeCont= document.querySelector('.pokemon-container');
const spinner= document.querySelector('#spinner');
const previuos= document.querySelector('#previuos');
const next= document.querySelector('#next');

let offset= 1;
let limit=8;

previuos.addEventListener("click",()=>{
    if(offset !=1){
        offset -=9;
        removeChildNodes(PokeCont);
        Pokemons(offset,limit);
    }
});

next.addEventListener("click",()=>{
offset +=9;
removeChildNodes(PokeCont);
Pokemons(offset,limit);

});

function getPokemon(id){
fetch( `https://pokeapi.co/api/v2/pokemon/${id}/`)
.then((res)=>res.json())
.then((data)=>createPokemons(data));
spinner.style.display="none";
}

function Pokemons(offset,limit){
    spinner.style.display="block";
    for(let i =offset; i<= offset + limit; i++){
        getPokemon(i);
    }

}

function createPokemons(pokemon){

    const flipCard=document.createElement('div');
    flipCard.classList.add('flip-card');

    const cardContainer= document.createElement('div');
    cardContainer.classList.add('card-container');

    flipCard.appendChild(cardContainer);

    const card= document.createElement('div');
    card.classList.add('pokemon-block');

    const sprintContainer=document.createElement('div');
    sprintContainer.classList.add('img-container');

    const sprint= document.createElement('img');
    sprint.src=pokemon.sprites.front_default;
    sprintContainer.appendChild(sprint);


    const name= document.createElement('p');
    name.classList.add('name')
    name.textContent= pokemon.name;
    card.appendChild(name);
    card.appendChild(sprintContainer);


    const cardBack= document.createElement('div');
    cardBack.classList.add("pokemon-block-back");
    cardBack.appendChild(progressBars(pokemon.stats));

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    PokeCont.appendChild(flipCard);

}



function progressBars(stats){
const statsContainer= document.createElement('div');
statsContainer.classList.add('stats-container');
 
for(let i=0; i<3;i++){
    const stat= stats[i];
    const statPercent= stat.base_state /2 + "%";

    const statContainer=document.createElement("div");
    statContainer.classList.add("stat-container");

    const statName=document.createElement("div");
    statName.textContent=stat.stat.name;

    const progress=document.createElement("div");
    progress.classList.add("progress");

    const progressBar=document.createElement("div");
    progress.classList.add("progress-bar");

    progressBar.setAttribute("aria-valuenow", stat.base_stat);
    progressBar.setAttribute("aria-valuemin",0);
    progressBar.setAttribute("aria-valuemax",200);
    progressBar.style.width= statPercent;

    progressBar.textContent=stat.base_stat;

    progress.appendChild(progressBar);
    statsContainer.appendChild(statName);
    statsContainer.appendChild(progress);
    statsContainer.appendChild(statContainer);
}

return statsContainer;

}




function removeChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}


Pokemons(offset,limit);