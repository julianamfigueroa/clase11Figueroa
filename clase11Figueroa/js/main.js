let l_id; 
let l_index;
let btn_cont_img;
let l_nrocd;
let l_p;
let l_nro;
let l_bd = []; 
let l_titulo;
let xy; 
let div;
let btn_fav;
let btn_favs;
let btn_favn;
let l_album;
let l_tema;

// CONTENEDOR DE LAS TAPAS DE DISCOS
let l_container = document.getElementById("contenedor-img");

// OCULTO EL DIV DE DISCOS/TEMAS
let l_divtemas; 
let l_divalbum = document.getElementById("album");
l_divalbum.classList.add("div_hide");

// Hago un array con los divs para identificar en cual estoy parado
let arr_idcd = ["cd01", "cd02", "cd03", "cd04", "cd05", "cd06", "cd07", "cd08", "cd09", "cd10"];


// -------------------------------- FUNCIONES --------------------------------
// Armado del Album elegido
function fn_armaalbum(_album){
    l_nro = _album;
    l_bd = localStorage.getItem("albums");
    l_bd = JSON.parse(l_bd);
    // Titulo
    l_titulo = l_bd[l_nro].nombre;
    l_titulo.innerText = "Nombre del Album";
    document.getElementById("album-titulo").innerText = l_titulo;
    document.getElementById("listado").innerHTML = "";
    for (let i = 0; i < l_bd[l_nro].temas.length; i++) {  
        // Por cada tema creo el div de la fila
        l_divtemas = document.createElement("div");
        l_divtemas.id = "contenedor-tema";
        l_divtemas.className = "style-tema";
        document.getElementById("listado").append(l_divtemas); 
        //Nro tema
        xy = i + 1;
        div = document.createElement("div");
        div.innerText = xy; 
        div.className = "tema-nro";
        l_divtemas.append(div); 
        //Nombre
        xy = l_bd[l_nro].temas[i].nombre; 
        div = document.createElement("div");
        div.innerText = xy; 
        div.className = "tema-nombre";
        l_divtemas.append(div); 
        //Puntaje
        xy = l_bd[l_nro].temas[i].puntaje; 
        div = document.createElement("div");
        div.innerText = xy; 
        div.className = "tema-puntos";
        l_divtemas.append(div);   
        //Favorito
        xy = l_bd[l_nro].temas[i].favorito; 
        btn_fav = document.createElement("button");
        btn_fav.classList = "tema-fav";
        btn_fav.style.backgroundColor = "transparent";
        // if (xy == "S"){
        //     background-image;}
        // else{
        //     background-image;}
        // }
        btn_fav.innerHTML = `${xy}`;
        l_divtemas.append(btn_fav);
    }
    fn_temas();
}


// Funciones sobre el Album elegido
function fn_temas(){

    // Favorito o No Favorito
    btn_fav = document.querySelectorAll(".tema-fav");
    for (let x of btn_fav){
        x.addEventListener("click",function(e){
            if (e.target.innerHTML == "N"){
                let div_padre = e.target.parentNode;
                nro_fav = div_padre.querySelector(".tema-nro").textContent;
                x.innerHTML = "S";
                //background-image;}
                l_bd[l_nro].temas[(nro_fav - 1)].favorito = "S";
                l_bd = JSON.stringify(l_bd);
                localStorage.setItem("albums", l_bd);

            }
            else{
                let div_padre = e.target.parentNode;
                nro_fav = div_padre.querySelector(".tema-nro").textContent;
                x.innerHTML = "N";
                //background-image;}
                l_bd[l_nro].temas[(nro_fav - 1)].favorito = "N";
                l_bd = JSON.stringify(l_bd);
                localStorage.setItem("albums", l_bd);
            }
        });
    }
}


// Funciones Over y Out Album (Color / ByN)
function fn_overalbum(){
    document.getElementById(l_album).style.backgroundImage = `url('./img/albums/ts${l_nrocd}.jpg')`;
    document.getElementById(l_album).style.transitionDuration = "0.3s";
    l_p  = document.getElementById(`p${l_nrocd}`);
    l_p.style.color = "#f7f6f8"; 
}
function fn_outalbum(){
    document.getElementById(l_album).style.backgroundImage = `url('./img/albums/ts${l_nrocd}b.jpg')`;
    document.getElementById(l_album).style.transitionDuration = "0.3s";
    l_p.style.color = "#d6d2e2";
}



// -------------------------------- EVENTOS --------------------------------
// SI ELIGE UN DISCO, SE MUESTRA EL CLICEKADO Y LO ARMO
l_container.addEventListener("mousedown", function(e){
    l_divalbum.classList.add("div_hide");  
    // Si clickeó en un disco, habilito el div
    if (e.target.className == "cont-img"){
        l_divalbum.classList.remove("div_hide"); 
    };
    // Lo relleno con los datos del disco
    l_id = e.target.id; 
    if ( (arr_idcd.includes)(l_id) ){
        l_index = arr_idcd.indexOf(l_id);
        l_album = arr_idcd[l_index];
        document.getElementById(l_album).addEventListener("click", fn_armaalbum(l_index));
    };
})


// MOUSEOVER SOBRE LAS IMG (Color / ByN)
btn_cont_img = document.querySelectorAll(".cont-img");
for (let x of btn_cont_img){
    x.addEventListener("mouseover", function(e){
    // Si se paró con el mouse sobre un disco, muestro la imagen que corresponde
    l_nrocd = "";
    l_cd = e.target.id; 
    l_nrocd = arr_idcd.indexOf(l_cd);
    l_album = arr_idcd[l_nrocd];
    l_nrocd = l_nrocd + 1; 
    document.getElementById(l_album).addEventListener("mouseover", fn_overalbum());
    //
    x.addEventListener("mouseout", function(e){
        l_nrocd = "";
        l_cd = e.target.id; 
        l_nrocd = arr_idcd.indexOf(l_cd);
        l_album = arr_idcd[l_nrocd];
        l_nrocd = l_nrocd + 1; 
        if (l_album != null){ document.getElementById(l_album).addEventListener("mouseout", fn_outalbum());}
    })
})
}
