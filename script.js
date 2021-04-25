function CreazioneElemento(contenuto,div){
    const new_h3 = document.createElement('h3');
    new_h3.textContent = contenuto.titolo;
    const img_prefer = document.createElement('img');
    img_prefer.src = "images/preferiti-vuota.png";
    img_prefer.addEventListener('click',aggiungiPreferiti);
    new_h3.appendChild(img_prefer); 
    const new_img = document.createElement('img');
    new_img.src = contenuto.immagine;
    const new_button = document.createElement('button');
    new_button.textContent = 'Maggiori Informazioni';
    new_button.addEventListener('click',aggiungiDettagli);

    div.appendChild(new_h3);
    div.appendChild(new_img);
    div.appendChild(new_button);
}

function inizializzazione(){
    const section = document.querySelector('section');

    let new_section = document.createElement('section');
    new_section.classList.add('paragrafo');

    let new_div = document.createElement('div');
    new_div.setAttribute('id','preferiti');
    new_section.appendChild(new_div);

    let new_h1 = document.createElement('h1');
    new_h1.textContent = 'I tuoi preferiti';
    let new_p = document.createElement('p');
    new_p.textContent = 'Non hai selezionato nessun elemento';
    new_div.appendChild(new_h1);
    new_div.appendChild(new_p);

    section.appendChild(new_section);

    let grid_div = document.createElement('div');
    grid_div.classList.add('grid');
    grid_div.setAttribute('id','risultatiPreferiti');

    new_section.appendChild(grid_div);

    //////////////////////////////////////////////////
    new_section = document.createElement('section');
    new_section.classList.add('paragrafo');
    
    new_div= document.createElement('div');
    new_div.setAttribute('id','elementi');
    new_section.appendChild(new_div);

    new_h1 = document.createElement('h1');
    new_h1.textContent = 'Tutti gli elementi';
    new_p = document.createElement('p');
    new_p.textContent = 'Cerca';
    const new_input = document.createElement('input');
    new_input.setAttribute('type','text');
    new_p.appendChild(new_input);

    new_div.appendChild(new_h1);
    new_div.appendChild(new_p);

    section.appendChild(new_section);

    grid_div = document.createElement('div');
    grid_div.classList.add('grid');
    new_section.appendChild(grid_div);

    for(contenuto of contenuti){
        new_div = document.createElement('div');
        CreazioneElemento(contenuto,new_div);
        grid_div.appendChild(new_div);
    }

    grid_div = document.createElement('div');
    grid_div.classList.add('grid');
    grid_div.classList.add('hidden');
    grid_div.setAttribute('id','risulatiRicerca')
    new_section.appendChild(grid_div);
}

inizializzazione();

function aggiungiDettagli(event){
    const button = event.currentTarget;
    const div = button.parentNode;
    //console.log(div);
    const childNodes = div.childNodes;
    //console.log(childNodes);
    
    const description = document.createElement('p');
    const new_button = document.createElement('button');
    new_button.textContent = 'Meno informazioni';
    const new_em = document.createElement('em');

    for(contenuto of contenuti){
        if(contenuto.titolo === childNodes[0].textContent ){
            if(contenuto.descrizione === '' || contenuto.descrizione === null){
                description.textContent = 'non abbiamo nessuna informazione al momento';
            }else{
                description.textContent = contenuto.descrizione;
            }
            if(contenuto.nutrizione === true){
                new_em.textContent = 'Prezzo: ' + contenuto.prezzo + ' €/kg';
            }else{
                new_em.textContent = 'Prezzo: ' + contenuto.prezzo + ' Euro';
                /*new_em.textContent = 'Prezzo: ' + contenuto.prezzo + ' €';*/
            }
            
            button.remove();
            div.appendChild(description);
            div.appendChild(new_em);
            div.appendChild(new_button);
        
            new_button.removeEventListener('click',aggiungiDettagli);
            new_button.addEventListener('click',togliDettagli);
        }
    }
    
    button.removeEventListener('click',aggiungiDettagli);
    button.addEventListener('click',togliDettagli);
}

function togliDettagli(event){
    const button = event.currentTarget;
    const div = button.parentNode;
    const childNodes = div.childNodes;
    //console.log(childNodes);

    
    childNodes[2].remove();
    childNodes[2].remove();

    //console.log(childNodes);
    button.textContent = 'Maggiori informazioni';

    button.removeEventListener('click',togliDettagli);
    button.addEventListener('click',aggiungiDettagli);
}
const buttons = document.querySelectorAll('.grid div button');
for(button of buttons){
    button.addEventListener('click',aggiungiDettagli);
}

function aggiungiPreferiti(event){
    const img = event.currentTarget;
    const div = img.parentNode.parentNode;
    const grid = document.querySelector('.grid');
    //console.log(div);
    
    const preferiti = document.querySelector('#preferiti');
    //console.log(preferiti.childNodes.length);
    if(preferiti.childNodes.length > 1){
        preferiti.childNodes[1].remove();
    }

    img.src = "images/preferiti-piena.png";
    const new_div = document.createElement('div');
    new_div.innerHTML = div.innerHTML;
    
    new_div.childNodes[0].childNodes[1].src = "images/preferiti-piena.png";
    new_div.childNodes[0].childNodes[1].addEventListener('click',togliPreferiti);
    
    for(let i = new_div.childNodes.length - 1; i >= 2 ; i-- ){
        new_div.childNodes[i].remove();
    }
    
    grid.appendChild(new_div);

    img.removeEventListener('click',aggiungiPreferiti);
}

function togliPreferiti(event){
    const img = event.currentTarget;
    const div = img.parentNode.parentNode;
    const grid = document.querySelector('.grid');

    img.removeEventListener('click',togliPreferiti);
    
    const grids = document.querySelectorAll('.grid');
    const h3 = img.parentNode;
    const grid_elements = grids[1];
    //console.log(h3.childNodes[0].textContent);
    for(let i = 0; i< grid_elements.childNodes.length; i++){
        if(grid_elements.childNodes[i].childNodes[0].childNodes[0].textContent === h3.childNodes[0].textContent){
            grid_elements.childNodes[i].childNodes[0].childNodes[1].src = "images/preferiti-vuota.png";
            grid_elements.childNodes[i].childNodes[0].childNodes[1].addEventListener('click',aggiungiPreferiti);
        }
    }
    grid.removeChild(div);
    
    const preferiti = document.querySelector('#preferiti');
    if(grid.childNodes.length === 0){
        const new_p = document.createElement('p');
        new_p.textContent = "Non hai selezionato nessun elemento"
        preferiti.appendChild(new_p);
    }
}
const img_prefer = document.querySelectorAll('.grid div h3 img');
for(img of img_prefer){
    img.addEventListener('click',aggiungiPreferiti);
}

function ricerca(event){
    const barra = event.currentTarget;
    const testo = barra.value;
    const grid_elements = document.querySelectorAll('.grid')[1];
    const grid_ricerca = document.querySelector('#risulatiRicerca');

    //console.log(grid_ricerca.childNodes);
    while(grid_ricerca.childNodes.length){
        grid_ricerca.removeChild(grid_ricerca.firstChild);
    }

    if(testo!==''){
        grid_elements.classList.add('hidden');
        grid_ricerca.classList.remove('hidden');
        
        for(contenuto of contenuti){
            if(contenuto.titolo.toLowerCase().indexOf(testo.toLowerCase())!==-1){
                let div_aux = document.createElement('div');
                CreazioneElemento(contenuto,div_aux);
                grid_ricerca.appendChild(div_aux);
            }
        }

    }else{
        grid_ricerca.classList.add('hidden');
        grid_elements.classList.remove('hidden');
    }   
}
const barraRicerca = document.querySelector('input');
barraRicerca.addEventListener('keyup',ricerca);

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