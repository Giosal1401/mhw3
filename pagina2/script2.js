function onResponse(response){
    return response.json();
}

function onJsonGroup(json){
    console.log(json);
    const section = document.querySelector('#group');

    for(let i=0; i<json.data.length; i++){
        const new_h3 = document.createElement('h3');
        new_h3.textContent = json.data[i].attributes.name;
        
        new_h3.setAttribute('id',json.data[i].id.toString());                //serve per andare a fare richiesta su una specifica categoria
        new_h3.addEventListener('click',searchTeamSport);                    //
        section.appendChild(new_h3);
    }
}

function initializeGroupSport(event){
    const url = "https://sports.api.decathlon.com/groups";                    //sezione categorie sport 
    fetch(url).then(onResponse).then(onJsonGroup);
}
initializeGroupSport();


//////////////////////////////////////////////////////////////////////////////////////////////
function onJson(json){
    console.log(json);
    const section = document.querySelector('#sport');
    section.innerHTML = "";

    console.log(json.length);
    
    if(json.length === 0){
        const new_p = document.createElement('p');
        new_p.textContent = "Nessun risultato trovato";

        section.appendChild(new_p);
    }else{
        for(let i = 0, max = 0 ; i < json.length, max < 10; i++){
            //console.log(json[i].relationships.images.data);
            /*if(json[i].relationships.images.data.length !== 0  && json[i].attributes.description !== null){
                const new_div = document.createElement('div');
                const new_img = document.createElement('img');
                const new_h3 = document.createElement('h3');
                const new_p = document.createElement('p');
            
                new_h3.textContent = json[i].attributes.name;
                new_img.src = json[i].relationships.images.data[0].url;
                new_p.textContent = json[i].attributes.description;
    
                new_div.appendChild(new_h3);
                new_div.appendChild(new_img);
                new_div.appendChild(new_p);
        
                section.appendChild(new_div);
                max++;
            }*/

            if(json[i].relationships.images.data.length != 0){
                const new_div = document.createElement('div');
                const new_img = document.createElement('img');
                const new_h3 = document.createElement('h3');
                const new_p = document.createElement('p');
            
                new_h3.textContent = json[i].attributes.name;
                new_img.src = json[i].relationships.images.data[0].url;
                if(json[i].attributes.description === null){
                    new_p.textContent = "Al momento non abbiamo nessuna informazione";
                }else{
                    new_p.textContent = json[i].attributes.description;
                }
                new_div.appendChild(new_h3);
                new_div.appendChild(new_img);
                new_div.appendChild(new_p);
        
                section.appendChild(new_div);
                max++;
            }
            
        }
    }

}

function search(event){
    event.preventDefault();

    const input = document.querySelector('#nameSport');
    const testo = encodeURIComponent(input.value.toLowerCase());
    
    if(!testo){
        return;
    }else{
        const url = "https://sports.api.decathlon.com/sports/search/" + testo + "?coordinates=-73.5826985,45.5119864";         //ricerca sport
        console.log(url);
        fetch(url).then(onResponse).then(onJson);
    }
}

function clean(event){
    const button = event.target;
    if(button.value === ""){
        document.querySelector('#sport').innerHTML = "";
    }
}
const form = document.querySelector('form');
form.addEventListener('submit',search);
form.addEventListener('keyup',clean);

///////////////////////////////////////////////////////////////////////////////
function showResultSport(json){
    console.log(json);
    const view = document.querySelector('#resultGroup');

    if(json.data.relationships.images.data.length === 0){
        return;
    }else{    
        const new_div = document.createElement('div');
        const new_img = document.createElement('img');
        const new_h3 = document.createElement('h3');
        const new_p = document.createElement('p');
                
        new_h3.textContent = json.data.attributes.name;
        new_img.src = json.data.relationships.images.data[0].url;
        if(json.data.attributes.description === null){
            new_p.textContent = "Al momento non abbiamo nessuna informazione";
        }else{
            new_p.textContent = json.data.attributes.description;
        }
        new_div.appendChild(new_h3);
        new_div.appendChild(new_img);
        new_div.appendChild(new_p);
            
        view.appendChild(new_div);
    }    
}

function resultSport(json){
    console.log(json);
    const view = document.querySelector('#group');
    view.classList.add('hidden');
    document.querySelector('#reset').classList.remove('hidden');

    if(json.data.relationships.sports.data.length === 0){
        const new_p = document.createElement('p');
        new_p.textContent = "Nessun elemento disponbile";

        document.querySelector('#resultGroup').appendChild(new_p);
    }else{
        for(let i = 0, max = 0; i< json.data.relationships.sports.data.length, max < 10; i++){
            const url = "https://sports.api.decathlon.com/sports/" + json.data.relationships.sports.data[i].id;    //ricerca sports appartenenti ad una categoria
            fetch(url).then(onResponse).then(showResultSport);
            max++;
        }
    }

}

function searchTeamSport(event){
    const h3 = event.currentTarget;
    const id_elemento = h3.getAttribute('id');

    const url = "https://sports.api.decathlon.com/groups/" + id_elemento;               
    console.log(url);
    fetch(url).then(onResponse).then(resultSport);
}
////////////////////////////////////////////////////////////////////
function reset(event){
    const group = document.querySelector('#group');
    const result = document.querySelector('#resultGroup');

    event.currentTarget.classList.add('hidden');
    group.classList.remove('hidden');
    result.innerHTML = "";

}
const reset_button = document.querySelector('#reset');
reset_button.addEventListener('click',reset);

///////////////////////////////////////////////////////////////////
function scopriMenu(event){
    const link = document.querySelector('#menuAperto');

    menu.removeEventListener('click',scopriMenu);
    menu.addEventListener('click',nascondiMenu);
    link.classList.remove('hidden');
}

function nascondiMenu(event){
    const link = document.querySelector('#menuAperto');

    menu.removeEventListener('click',nascondiMenu);
    menu.addEventListener('click',scopriMenu);
    link.classList.add('hidden');


}
const menu = document.querySelector('#menuChiuso');
menu.addEventListener('click',scopriMenu);