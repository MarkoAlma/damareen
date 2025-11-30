function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    // Véletlenszerű index generálása
    const j = Math.floor(Math.random() * (i + 1));
    // Elem csere
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const audioTrackss = [
    document.getElementById('gameMusic1'),
    document.getElementById('gameMusic2'),
    document.getElementById('gameMusic3'),
    document.getElementById('gameMusic4'),
    document.getElementById('gameMusic5')
];
let normalCurrentAudio = null;
let battleCurrentAudio = null;

const normalAudioss = []
for (let i = 1; i <= 10; i++) {
  normalAudioss.push("zenek/normal/normal"+i+".mp3");
}
const battleAudioss = []
for (let i = 1; i <= 10; i++) {
  battleAudioss.push("zenek/battle/battle"+i+".mp3");
}

let normalAudios = shuffleArray(normalAudioss);
let battleAudios = shuffleArray(battleAudioss);
let audioTracks = shuffleArray(audioTrackss);

let zeneIndex = -1;
function playNextTrack() {
  zeneIndex++;
  const currentTrack = audioTracks[zeneIndex];
  currentTrack.currentTime = 0;
  currentTrack.volume = 0.5;
  currentTrack.play();
  currentTrack.onended = () => {
      if (zeneIndex < audioTracks.length) {
          playNextTrack();  // Következő zene lejátszása
      }
  }
  if (zeneIndex >= audioTracks.length-1) {
        zeneIndex = -1;
        audioTracks = shuffleArray(audioTrackss);
  }
}

let zeneIndexNormal = -1;
function playNormalTrack() {
  zeneIndexNormal++;
  const currentTrack = new Audio(normalAudios[zeneIndexNormal]);
  normalCurrentAudio = currentTrack;
  currentTrack.currentTime = 0;
  currentTrack.volume = 0.5;
  currentTrack.play();
  currentTrack.onended = () => {
      if (zeneIndexNormal < normalAudios.length) {
          playNormalTrack();  // Következő zene lejátszása
      }
  };
  if (zeneIndexNormal >= normalAudios.length-1) {
    zeneIndexNormal = -1;
    normalAudios = shuffleArray(normalAudioss);
  }
}

let zeneIndexBattle = -1;
function playBattleTrack() {
  zeneIndexBattle++;
  const currentTrack = new Audio(battleAudios[zeneIndexBattle]);
  battleCurrentAudio = currentTrack;
  currentTrack.currentTime = 0;
  currentTrack.volume = 0.5;
  currentTrack.play();
  currentTrack.onended = () => {
      if (zeneIndexBattle < battleAudios.length) {
          playBattleTrack();  // Következő zene lejátszása
      }
  };
  if (zeneIndexBattle >= battleAudios.length-1) {
      zeneIndexBattle = -1;
      battleAudios = shuffleArray(battleAudioss);
    }
}

// setTimeout(() => {
//   playNextTrack();
// }, 500);
setTimeout(() => {
  document.querySelector(".kezdo_scene").classList.add("scene_disappear")
  setTimeout(() => {
    loadAllImages(onImageLoaded)
    document.querySelector(".kezdo_scene").classList.add("kikapcsol")
    document.querySelector(".sugo").classList.add("low-opacity");
  }, 1000);
  playNextTrack();
}, 3000);

const myDiv = document.querySelector(".sugo");
const mypopup = document.getElementById("simplePopup");

myDiv.onclick = () => {
    mypopup.style.display = "flex"; // megnyitás
};

// kattintás a háttéren → bezárás
mypopup.onclick = (e) => {
    if (e.target === mypopup) { // csak ha a háttérre kattint
        mypopup.style.display = "none";
    }
};

// let zeneAktiv = false;
// let melyikZene = 2;
// mainScreenZene1.volume = 0.01;
function zeneAllj(audiotrack) {
audiotrack.forEach(track => {
  if (!track.paused){
    let currentVolume = track.volume;
    
    // Fokozatos hangerő csökkentés
    let fadeInterval = setInterval(() => {
        if (currentVolume > 0.01) {
            currentVolume -= 0.01;  // Csökkentjük a hangerőt 1%-kal
            track.volume = currentVolume;  // Beállítjuk az új hangerőt
        } else {
            clearInterval(fadeInterval);  // Ha elértük a 0-t, megállítjuk az intervallumot
            track.pause();  // Megállítjuk a zenét
        }
    }, 25);  // 25 ms-ként csökkentjük a hangerőt
  }
});
}

function zeneAllj2(audio) {
    if (audio) {
    let currentVolume = audio.volume;
    
    // Fokozatos hangerő csökkentés
    let fadeInterval = setInterval(() => {
        if (currentVolume > 0.01) {
            currentVolume -= 0.01;  // Csökkentjük a hangerőt 1%-kal
            audio.volume = currentVolume;  // Beállítjuk az új hangerőt
        } else {
            clearInterval(fadeInterval);  // Ha elértük a 0-t, megállítjuk az intervallumot
            audio.pause();  // Megállítjuk a zenét
        }
    }, 25);  // 25 ms-ként csökkentjük a hangerőt
    }
}


function ExitApp(){
  window.pywebview.api.ExitApp();
}

let egyszerfusson = true;
let vilag_vezer_kartyak = []
let normal_kartyak_hossza = 0;

    let currentgyujtemeny = []

    let currentKazamatak = []
    let currentKazamataKartyak = []

let mentesnev_lista = []
let harcba_indul_kartyak_nevei = []
let selected_ids = []

const screenWidth = screen.width; // kezdő bal alsó sarok
const screenHeight = screen.height;
const arany = screenWidth/screenHeight;
let canvas2 = document.getElementById("characterCanvas2");
let ctx2 = canvas2.getContext("2d");
let kivalasztottElem = "tuz";
let mod = "alap"; // atlagos vagy ajanlott
let palya_elem = "normal";

let kivalasztott_normal_kartyak = [];
let kivalasztott_normal_kartyak_normal = [];
let kivalasztott_normal_kartyak_vezer = [];

let currentIndex2 = 0;
let mentesTomb = []

let vilagTomb = []
let currentIndex = 0;

function betoltVilag(vilag_neve){
  document.querySelector(".jatekok").innerHTML = "kutyuska"
  window.pywebview.api.jatekvilag_neve_beallitas(vilag_neve).then(() => {
    window.pywebview.api.load_data_from_in()
  })
  //document.querySelector('.gombok').innerHTML = 'jbhuasdsdafyughbj';
  // window.pywebview.api.load_data_from_in()
}

function betoltMentes(mentes_neve){
  window.pywebview.api.mentesi_fajl_neve_beallitas(mentes_neve).then(() => {
    window.pywebview.api.load_data_from_in()
  })
  //document.querySelector('.gombok').innerHTML = 'jbhuasdsdafyughbj';
  // window.pywebview.api.load_data_from_in()
}

let jatekos_gyujtemeny = []
let kazamata_adatok = []

function skinConverter(skinString) {
  let visszaa = []
  skinString.split(",").map(obj => {
    visszaa.push(obj.replaceAll("'",'').replaceAll("[",'').replaceAll("]",'').trim())
  })
  return visszaa
}

function setPythonData(gyujtemeny, kazamatak, letezo_kartyak, vezer_kartyak, win, loss, modPy) {
  mod = modPy;
  kazamata_adatok = kazamatak
  document.querySelector(".my_scene").classList.add("nelatszon")
  jatekos_gyujtemeny = gyujtemeny
  document.querySelector(".kartyak").innerHTML = ""
  document.querySelector(".statok").innerHTML = `<div >${win} <span class="winStat">W</span></div> <div >${loss} <span class="lossStat">L</span></div>`

        gyujtemeny.map((kartya, ind) => {

          let irt_elem = kartya.elem
          if (irt_elem == "tuz") {
            irt_elem = "tuzi"
          }
    document.querySelector(".kartyak").innerHTML +=`
          <section class="fade card felsokoz nagycard hoverelheto valamiglowolasilehetosegamikoraportalbolkijonakartya"  onclick="kartya_harcba(this)" id="kartya-${ind}">
            <span class='szamSzinez'></span>
             <div class="corner top left"></div>
             <div class="corner top right"></div>
             <div class="corner bottom left"></div>
             <div class="corner bottom right"></div>
    <figure class="figure figure-leshen ${irt_elem}">
      <div class="canvas3igazitas"> <canvas id="mainkanvas${ind}" width="500" height="600"></canvas> </div>
    </figure>
    <div class="">
      <div class="content">
        <div class="nevBerak">${kartya.nev}</div>
      </div>
    </div>
    <footer class="footer footer-leshen">
      <div class="details">
        <p class="kartyaSzoveg">${kartya.sebzes}⚔️</p>
      </div>
            <div class="details elsoDetail">
        <img class="elem-icon" src="${kartya.elem}.png" alt="">
      </div>
      <div class="details">
        <p class="kartyaSzoveg jobboldal">${kartya.eletero}❤️</p>
      </div>
    </footer>
  </section>
          `; 
          let kartya_skin = skinConverter(kartya.skin)
        setTimeout(() => {
          drawCharacter2(kartya_skin[3], kartya_skin[0], kartya_skin[1], kartya_skin[2], true, `mainkanvas${ind}`)
        }, 100);
        } );

  document.querySelector(".carousel").style.setProperty('--slides', kazamatak.length);
    let legutobbi = "egyszeru"
  if (egyszerfusson){
    
  kazamatak.map((kazamata, ind) => {

    // document.querySelector(".kartyak").innerHTML = "LAKJDIKHADKIHD"
    adathalmaz = kazamata_kivalaszt(JSON.stringify(kazamata), JSON.stringify(kazamata.ellenfelek), JSON.stringify(letezo_kartyak), JSON.stringify(vezer_kartyak))

    document.querySelector(".carousel").innerHTML += `
                <div class="carousel-item" >
            <div class="page-container">
                <div class="page left-page">
                <div class="meghivo">
                      ${kazamata.tipus=="egyszeru" ? "Egyszerű" : kazamata.tipus=="kis" ? "Kis" : "Nagy"} Kazamata </br>
                      Név: ${kazamata.nev} </br>
                    <button style="cursor:pointer;" class="harc-button" onclick="harc(${ind})">HARC</button>
                </div>
                </div>
                <div class="page right-page">
                <div class="paradicsomos">

                  ${adathalmaz}
                  
  
                </div>
                </div>
            </div>
            </div>
    `


    let carousel_items = document.querySelector(".carousel").querySelectorAll(".carousel-item");
    if (kazamata.tipus != legutobbi) {
      if (kazamata.tipus == "kis") {
        document.querySelector(".carousel").querySelectorAll(".carousel-item")[carousel_items.length - 2].style.setProperty('--border-szine', "orange 3px solid");
      }else {
        document.querySelector(".carousel").querySelectorAll(".carousel-item")[carousel_items.length - 2].style.setProperty('--border-szine', "red 3px solid");
      }
      legutobbi = kazamata.tipus
    }
// Az eseménykezelőt csak egyszer adjuk hozzá a .carousel szülőelemhez

//     document.querySelector(".carousel").addEventListener("click", function(event) {
//     if (event.target && event.target.matches(".harc-button")) {
//         harc();
//     }
// });
  });
//   const harcButtons = document.querySelectorAll(".harc-button");
// harcButtons.forEach(button => {
//     button.addEventListener("click", function() {
//       let kazamataIndex = parseInt(button.getAttribute("data-kazamata"));
//       document.querySelector(".statok").innerHTML = kazamataIndex
//         let kazamata = [];
//         if (kazamataIndex != kazamatak.length){
//           kazamata = kazamatak[kazamataIndex-1];
//         }else {
//           kazamata = kazamatak[kazamataIndex];
//         }
//         harcba_indul_kartyak_nevei = selected_ids.map(index => jatekos_gyujtemeny[index].nev)
//         harc(kazamata);
//     });
// });
const pages = document.querySelectorAll('.carousel-item');

// Létrehozzuk az IntersectionObserver-t, hogy figyeljük a látható elemeket

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        const page = entry.target; // Az aktuálisan látható oldal
        if (entry.isIntersecting) {
            const szopage = page.querySelector(".paradicsomos").querySelectorAll(".forditva")

            const szopage2 = page.querySelector(".paradicsomos").querySelectorAll(".content")
            let tudas = []
            Array.from(szopage2).forEach(elem => {
              let kartya = null
              kartya = kartya_adatai2(elem.querySelector("h3").innerHTML, letezo_kartyak)
              if (kartya == null){
                kartya = kartya_adatai2(elem.querySelector("h3").innerHTML, vezer_kartyak)
              }
              let kartya_skin = skinConverter(kartya.skin)
              tudas.push(kartya_skin)
            })


            Array.from(szopage).map((elem, barac) => {
              elem.innerHTML = ` <canvas id="konyvkanvas${barac}" width="500" height="600"></canvas> `
                                  //  document.querySelector(".statok").innerHTML = elem.innerHTML  
                // let kartya_skin = skinConverter(kartya.skin)
                setTimeout(() => {
                  drawCharacter2(tudas[barac][3],tudas[barac][0],tudas[barac][1],tudas[barac][2], true, `konyvkanvas${barac}`)
                }, 100);

            })
            page.style.zIndex = '500000000'; // Példa: z-index növelése
        }
        else {
          let tudas = []
                      const szopage = page.querySelector(".paradicsomos").querySelectorAll(".forditva")

            Array.from(szopage).map((elem, barac) => {
              elem.innerHTML = ''
                                  //  document.querySelector(".statok").innerHTML = elem.innerHTML  
                // let kartya_skin = skinConverter(kartya.skin)


            })
            
            page.style.zIndex = '0';
        }
    });
}, { threshold: 0.35 }); // Az oldal 50%-ának látszódnia kell a képernyőn

// Minden egyes oldalt hozzáadunk az observerhez
pages.forEach(page => {
    observer.observe(page);
});


    let carousel_items = document.querySelector(".carousel").querySelectorAll(".carousel-item");
    document.querySelector(".carousel").querySelectorAll(".carousel-item")[carousel_items.length - 1].style.setProperty('--border-szine', "green 0px solid");
    // document.querySelector(".kartyak").innerHTML = `document.querySelector(".carousel").querySelectorAll(".carousel-item")[0]`
  egyszerfusson = false;
}

//   kazmatak.forEach(kazamata => {
//     document.querySelector(`.${kazamata.tipus}`).innerHTML +=
//     `
//   <div class="bodi">
//     <div class="konyv tarolo">
//     <div class="sprite-wrapper">
//         <div class="book">
//         <!--  Carousel container -->
//         <div class="carousel" style=" --slides: ${kazmatak.length};">
//             <!--  Bg sprite -->
//             <div class="sprite"></div>
//             <!--  Carousel items -->

//             <div class="carousel-item">
//             <div class="page-container">
//                 <div class="page left-page">
//                 <div>
          
//                 </div>
//                 </div>
//                 <div class="page right-page">
//                 <div>
          
//                 </div>
//                 </div>
//             </div>
//             </div>
//             <div class="carousel-item">
//             <div class="page-container">
//                 <div class="page left-page">
//                 <div>
//                     ${kazamata.nev}
//                 </div>
//                 </div>
//                 <div class="page right-page">
//                 <div>
//                     ${kazamata.jutalom=="sebzes" ? "⚔️" : kazamata.jutalom=="eletero" ? "❤️" : "🃏"}
//                 </div>
//                 </div>
//             </div>
//             </div>
//         </div>
//         </div>
//         </div>
//   </div>
//   </div>
//     `
// });
  document.querySelector(".main").classList.remove("nelatszon")
  document.querySelector(".main").classList.remove("scene_disappear")
}

let ellenfelek_kazamata = []
function kazamata_kivalaszt(ellenfelek_kazamata_adat, ellenfelek_adat, letezo_kartyak_adat, vezer_kartyak_adat) {
  ellenfelek_kazamata = JSON.parse(ellenfelek_kazamata_adat)
  ellenfelek = JSON.parse(ellenfelek_adat)
  letezo_kartyak = JSON.parse(letezo_kartyak_adat)
  vezer_kartyak = JSON.parse(vezer_kartyak_adat)
  vilag_vezer_kartyak = JSON.parse(vezer_kartyak_adat)

  //print("!!!!!!!!(-_-)!!!!!!!!!")
  let html = ""
  ellenfelek.map((ellen, kalk) => {
    kartya = kartya_adatai2(ellen, letezo_kartyak)
    if (kartya) {
                let irt_elem = kartya.elem
          if (irt_elem == "tuz") {
            irt_elem = "tuzi"
          }
      html += `<section class="fade card felsokoz kiscard hoverelheto" >

             <div class="corner top left"></div>
             <div class="corner top right"></div>
             <div class="corner bottom left"></div>
             <div class="corner bottom right"></div>
    <figure class="figure figure-leshen ${irt_elem}">
      <div class="canvas3igazitas forditva"></div>
    </figure>
    <div class="content">
      <h3>${kartya.nev}</h3>
    </div>
    <footer class="footer footer-leshen">
      <div class="details">
        <p class="kartyaSzoveg">${kartya.sebzes}⚔️</p>
      </div>
            <div class="details elsoDetail">
        <img class="elem-icon" src="${kartya.elem}.png" alt="">
      </div>
      <div class="details">
        <p class="kartyaSzoveg jobboldal">${kartya.eletero}❤️</p>
      </div>
    </footer>
  </section>`
        // let kartya_skin = skinConverter(kartya.skin)
        // setTimeout(() => {
        //   drawCharacter2(kartya_skin[3], kartya_skin[0], kartya_skin[1], kartya_skin[2], true, `konyvkanvas${kalk}`)
        // }, 100);
    }else {
      kartya = kartya_adatai2(ellen, vezer_kartyak)
      if (kartya) {
                let irt_elem = kartya.elem
          if (irt_elem == "tuz") {
            irt_elem = "tuzi"
          }
        html += `<section class="fade card felsokoz kiscard hoverelheto" >

             <div class="corner top left"></div>
             <div class="corner top right"></div>
             <div class="corner bottom left"></div>
             <div class="corner bottom right"></div>
    <figure class="figure figure-leshen ${irt_elem}">
      <div class="canvas3igazitas forditva"></div>
    </figure>
    <div class="content">
      <h3>${kartya.nev}</h3>
    </div>
    <footer class="footer footer-leshen">
      <div class="details">
        <p class="kartyaSzoveg">${kartya.sebzes}⚔️</p>
      </div>
            <div class="details elsoDetail">
        <img class="elem-icon" src="${kartya.elem}.png" alt="">
      </div>
      <div class="details">
        <p class="kartyaSzoveg jobboldal">${kartya.eletero}❤️</p>
      </div>
    </footer>
  </section>`
        //       let kartya_skin = skinConverter(kartya.skin)
        // setTimeout(() => {
        //   drawCharacter2(kartya_skin[3], kartya_skin[0], kartya_skin[1], kartya_skin[2], true, `konyvkanvas${kalk}`)
        // }, 100);
      }
    }
  })


  for (let i = 0; i < 6-ellenfelek.length; i++) {
            html += `<section class="fade card felsokoz kiscard hoverelheto eltunteto">

            
             <div class="corner top left"></div>
             <div class="corner top right"></div>
             <div class="corner bottom left"></div>
             <div class="corner bottom right"></div>
    <figure class="figure figure-leshen">
      
    </figure>
    <div class="contente">
      
    </div>

  </section>`
  }
  // document.querySelector(".statok").innerHTML = ellenfelek_kazamata.nev
  return html
}

function kartya_adatai2(kartya_nev,kartya_lista){
  for(let kartya of kartya_lista){
    if(kartya.nev == kartya_nev){
      return kartya
    }
  }
  return null
}

function kartya_harcba(adat){
  //document.querySelector(".ellenfelek").innerHTML = ""
  kartya_id = adat.id.split("-")[1]
  asd = adat.querySelector(".szamSzinez").innerHTML
  if (selected_ids.includes(kartya_id)){
    selected_ids.splice(selected_ids.indexOf(kartya_id), 1 )
    adat.querySelector(".szamSzinez").innerHTML = ""
    adat.querySelector(".szamSzinez").classList.remove("szamSzinez_igen")
    adat.classList.remove("nagyitas")
    for (let adat of document.querySelectorAll(".hoverelheto")){
      let szam = adat.querySelector(".szamSzinez").innerHTML
      if (Number.isInteger(parseInt(szam))) {
        if (parseInt(szam) > parseInt(asd)){
          adat.querySelector(".szamSzinez").innerHTML = parseInt(szam)-1
        }
      }
    }
  }else if ( selected_ids.length < Math.ceil(jatekos_gyujtemeny.length/2)){
    selected_ids.push(kartya_id)
    //for (let id of selected_ids){
    //  document.querySelector(".kartyak").querySelector("#kartya-"+id).querySelector(".szamSzinez").innerHTML = id
    //}
    adat.querySelector(".szamSzinez").innerHTML = selected_ids.length
    adat.querySelector(".szamSzinez").classList.add("szamSzinez_igen")
    adat.classList.add("nagyitas")
 
  //kartya_nev = adat.parentElement.querySelector("h1").innerText
  //window.pywebview.api.kartya_harcba(kartya_nev)
  }
  harcba_indul_kartyak_nevei = selected_ids.map(index => jatekos_gyujtemeny[index].nev)
  // document.querySelector(".tarolo").innerHTML = harcba_indul_kartyak_nevei
  //document.querySelector(".ellenfelek").innerHTML = selected_ids
  // document.querySelector(".ellenfelek").innerHTML = "alma"
}

let autoplay = "on"
// let kopos = 0

function harc(kapott_kaz) {
  harcba_indul_kartyak_nevei = selected_ids.map(index => jatekos_gyujtemeny[index].nev)
  zeneAllj2(normalCurrentAudio)
  setTimeout(() => {
    playBattleTrack()
  }, 500);
  kapott_kaz = kazamata_adatok[parseInt(kapott_kaz)]
  // kopos += 1
  // document.querySelector(".statok").innerHTML = kazamata_adatok[parseInt(kapott_kaz)].nev
  if (harcba_indul_kartyak_nevei.length == 0){
    document.querySelector(".hibaJelzo").style.display = "block";
    document.querySelector(".hibaJelzoSzoveg").innerHTML = "<h1>Nincs kiválasztva pakli!</h1>"
    return
  }
  if (kapott_kaz.length == 0){
    document.querySelector(".hibaJelzo").style.display = "block";
    document.querySelector(".hibaJelzoSzoveg").innerHTML = "<h1>Nincs kiválasztva kazamata!</h1>"
    return
  }
  if (kapott_kaz.tipus == "nagy" && letezo_kartyak.length <= jatekos_gyujtemeny.length && mod == "alap"){
    document.querySelector(".hibaJelzo").style.display = "block";
    document.querySelector(".hibaJelzoSzoveg").innerHTML = "<h1>Már minden kártya meg van, ezért nem indítható nagy kazamata!</h1>"
    return
  }
    
  for (ellen of kapott_kaz.ellenfelek){
    let ideigl_kartya = kartya_adatai2(ellen, vilag_vezer_kartyak)
    if (ideigl_kartya){
      palya_elem = `${ideigl_kartya.elem}`
    }
  }
  // document.querySelector(".tarolo").innerHTML = palya_elem


   // document.querySelector(".tarolo").innerHTML = harcba_indul_kartyak_nevei
     document.querySelector(".main").classList.add("nelatszon")
         document.querySelector(".harcmezo").innerHTML = `
         <div class="harcallas"></div>
       <div class="jutalom"></div>
       <div class="meccsVegeGomb" onclick="tovabb()">Tovább</div>
       <div class="mezofelso"></div>
       <div class="mezokozepso">
         <div class="kozepKisMezok" id="kozep1"></div>
         <div class="kozepKisMezok" id="kozep2"></div>
         <div class="kozepKisMezok" id="kozep3"></div>
         <div class="kozepKisMezok" id="kozep4"></div>
         <div class="kozepKisMezok" id="kozep5"></div>
         <div class="kozepKisMezok" id="kozep6"></div>
       </div>
       <div class="mezoalso"></div>`
    document.querySelector(".harcmezo").classList.add(`${palya_elem}-bg`)
     document.querySelector(".harcmezo").classList.remove("nelatszon")

     // document.querySelector(".statok").innerHTML = "SDFASHFIKASHFIK"
     window.pywebview.api.harc_meghivo(harcba_indul_kartyak_nevei, kapott_kaz)
}

function kirajzolas(nagy_jatekospakli, nagy_kazamatapakli) {
  let harci = -1

  nagy_jatekospakli.reverse().map((kartya, harci) => {
                let irt_elem = kartya.elem
          if (irt_elem == "tuz") {
            irt_elem = "tuzi"
          }
    document.querySelector(".mezoalso").innerHTML+= `
    <section class="card felsokoz nagycard kicsinyito">
            <span class='szamSzinez'></span>
             <div class="corner top left"></div>
             <div class="corner top right"></div>
             <div class="corner bottom left"></div>
             <div class="corner bottom right"></div>
    <figure class="figure figure-leshen ${irt_elem}">
      <div class="canvas3igazitas"> <canvas id="harcalsokanvas${harci}" width="500" height="600"></canvas> </div>
    </figure>
    <div class="content">
      <h3>${kartya.nev}</h3>
    </div>
    <footer class="footer footer-leshen">
      <div class="details">
        <p class="kartyaSzoveg">${kartya.sebzes}⚔️</p>
      </div>
            <div class="details elsoDetail">
        <img class="elem-icon" src="${kartya.elem}.png" alt="">
      </div>
      <div class="details">
        <p class="kartyaSzoveg jobboldal eletero">${kartya.eletero}❤️</p>
      </div>
    </footer>
    </section>
    `
                let kartya_skin = skinConverter(kartya.skin)
        setTimeout(() => {
          drawCharacter2(kartya_skin[3], kartya_skin[0], kartya_skin[1], kartya_skin[2], true, `harcalsokanvas${harci}`)
        }, 100);
  })

  nagy_kazamatapakli.map((kartya,ind)=> {

                let irt_elem = kartya.elem
          if (irt_elem == "tuz") {
            irt_elem = "tuzi"
          }
    document.querySelector(".mezofelso").innerHTML+= `
    <section class="card felsokoz nagycard kicsinyitoJobb" style="z-index:${nagy_kazamatapakli.length-ind}">
            <span class='szamSzinez'></span>
             <div class="corner top left"></div>
             <div class="corner top right"></div>
             <div class="corner bottom left"></div>
             <div class="corner bottom right"></div>
    <figure class="figure figure-leshen ${irt_elem}">
      <div class="canvas3igazitas forditva"> <canvas id="harcfelsokanvas${ind}" width="500" height="600"></canvas> </div>
    </figure>
    <div class="content">
      <h3>${kartya.nev}</h3>
    </div>
    <footer class="footer footer-leshen">
      <div class="details">
        <p class="kartyaSzoveg">${kartya.sebzes}⚔️</p>
      </div>
            <div class="details elsoDetail">
        <img class="elem-icon" src="${kartya.elem}.png" alt="">
      </div>
      <div class="details">
        <p class="kartyaSzoveg jobboldal eletero">${kartya.eletero}❤️</p>
      </div>
    </footer>
    </section>
    `
                let kartya_skin = skinConverter(kartya.skin)
        setTimeout(() => {
          drawCharacter2(kartya_skin[3], kartya_skin[0], kartya_skin[1], kartya_skin[2], true, `harcfelsokanvas${ind}`)
        }, 100);
  })
}

function kozepre_mozgatas(ki, adatka) {
  let elso = ""
  let skinn = skinConverter(adatka)
  if (ki == "jatekos") {
      let parent = document.querySelector(".mezoalso");
      elso = parent.lastElementChild
      elso.style.opacity = 1;
      setTimeout(() => {
        elso.style.opacity = 0;
        document.getElementById("kozep2").style.opacity = 0;
      }, 100);
      setTimeout(() => {

        document.getElementById("kozep1").innerHTML = elso.outerHTML;
        document.getElementById("kozep2").innerHTML += `
      <div class="canvas3igazitas"> <canvas id="kanvasbal" width="500" height="600"></canvas> </div>
        `;
        drawCharacter2(skinn[3], skinn[0], skinn[1], skinn[2], true, "kanvasbal")
        document.querySelector(".mezoalso").removeChild(elso);
        document.getElementById("kozep1").firstElementChild.style.margin = "0";
      }, 1200);
      setTimeout(() => {
        document.getElementById("kozep2").style.opacity = 1;
        document.getElementById("kozep1").firstElementChild.style.opacity = 1;
      }, 1500);
    }else if (ki == "kazamata") {
      let parent = document.querySelector(".mezofelso");
      elso = parent.firstElementChild
      elso.style.opacity = 1;
      setTimeout(() => {
        elso.style.opacity = 0;
        document.getElementById("kozep5").style.opacity = 0;
      }, 100);
      setTimeout(() => {
        document.getElementById("kozep6").innerHTML = elso.outerHTML;
        document.getElementById("kozep5").innerHTML += `
      <div class="canvas3igazitas forditva"> <canvas id="kanvasjobb" width="500" height="600"></canvas> </div>
        `;
        drawCharacter2(skinn[3], skinn[0], skinn[1], skinn[2], true, "kanvasjobb")
        document.querySelector(".mezofelso").removeChild(elso);
        document.getElementById("kozep6").firstElementChild.style.margin = "0";
      }, 1200);
      setTimeout(() => {
        document.getElementById("kozep5").style.opacity = 1;
        document.getElementById("kozep6").firstElementChild.style.opacity = 1;
      }, 1500);
  }
}

let operation_complete = false;

let gifMehetE = true
function tamadas(ki, sebzesErteke, sebzesSzine, gif, tamado_kartya_neve, uj_eletero, testreszek) {

document.querySelector(".harcallas").innerHTML="";
  let kanvasId
  let test = skinConverter(testreszek)

  let barackocska = true 
  if(ki == "jatekos"){
    kanvasId = document.querySelector('#kozep2').querySelector('canvas').id

  }else if (ki == "kazamata"){
    barackocska = false
    kanvasId = document.querySelector('#kozep5').querySelector('canvas').id
  }

  const meghivIndex = test[3] == 1 ? parseInt(test[1]) + 10  : test[1] 
  const animation = animations[meghivIndex-1]
     let seged = null
         if(animation && !animationActive){
         animationName = animation[0][0]
         let animationNamecop = animation[0][0]
         seged = animation[0][1]
         dimensions.segedWidth = seged.width
         dimensions.segedHeight = seged.height
         animRowss = animationNamecop.split('/')[animationNamecop.split('/').length-1].split('_')[1].split("x")[0]
         animColss= animationNamecop.split('/')[animationNamecop.split('/').length-1].split('_')[1].split("x")[1].split(".")[0]
    
         }

  playSpriteAnimation(animationName, test[3],test[0],test[1],test[2],true,kanvasId,barackocska,gif);



if (!animationActive) {
setTimeout(()=>{
  
  if (ki == "kazamata") {
      setTimeout(() => {
          document.getElementById("kozep1").querySelector(".eletero").innerHTML = uj_eletero + "❤️";
      }, 1000);

      if (uj_eletero <= 0) {
          setTimeout(() => {
              document.querySelector(".harcallas").innerHTML += `<br>${tamado_kartya_neve} legyőzte az ellenfelét! ☠️`;
              document.getElementById("kozep2").innerHTML = "";
              document.getElementById("kozep1").innerHTML = "";
              operation_complete = true; 
          }, 1500);
      } else {
          setTimeout(() => {
              
              operation_complete = true; 
          }, 1000);
          
      }
      
            const gifContainer = document.createElement('div');
            gifContainer.classList.add('gifContainerr');
            const gifImg = document.createElement('img');
            gifImg.classList.add('sebzodesGif', 'baloldaliGif');
            gifImg.src = `${gif}_kep.png`;
            gifImg.alt = 'tamadoGif';
            gifContainer.appendChild(gifImg);
            document.getElementById("kozep2").appendChild(gifContainer);
            document.getElementById("kozep2").appendChild(gifContainer);

// 2 másodperc múlva törlés
setTimeout(() => {
    gifContainer.remove();
}, 2300);

  } else {
      setTimeout(() => {
          document.getElementById("kozep6").querySelector(".eletero").innerHTML = uj_eletero + "❤️";
      }, 1000);

      if (uj_eletero <= 0) {
          setTimeout(() => {
              document.querySelector(".harcallas").innerHTML += `<br>${tamado_kartya_neve} legyőzte az ellenfelét! ☠️`;
              document.querySelectorAll("#kozep5 .forditva").forEach(elem => elem.remove());



              document.getElementById("kozep6").innerHTML = "";
              operation_complete = true; 
          }, 1500);
      } else {
          setTimeout(() => {
            
              operation_complete = true; 
          }, 1000);
      }
      
            const gifContainer = document.createElement('div');
            gifContainer.classList.add('gifContainerr');
            const gifImg = document.createElement('img');
            gifImg.classList.add('sebzodesGif', 'jobboldaliGif');
            gifImg.src = `${gif}_kep.png`;
            gifImg.alt = 'tamadoGif';
            gifContainer.appendChild(gifImg);
            document.getElementById("kozep5").appendChild(gifContainer);  // Csak a gif-et adjuk hozzá
document.getElementById("kozep5").appendChild(gifContainer);

// 2 másodperc múlva törlés
setTimeout(() => {
    gifContainer.remove();
}, 2300);

  }},500)
  
  }
}

function cleanString(str) {
  let cleanedStr = str.trim();
  cleanedStr = cleanedStr.replace(/^,/, '');
  return cleanedStr;
}

let kartya_jutalom_array = null;
function vege_a_harcnak(jutalom_szoveg, kartya_jutalom, kartya_skinn) {
  
  let items = jutalom_szoveg.split('|');
  if (kartya_jutalom != "") {
    kartya_jutalom_array = kartya_jutalom.split('|');
  }
    let irt_elem = kartya_jutalom_array ? kartya_jutalom_array[3] : "normal"
          if (irt_elem == "tuz") {
            irt_elem = "tuzi"
          }
  document.querySelector(".jutalom").innerHTML = ""
  document.querySelector(".jutalom").innerHTML = `
  <h2>A harc véget ért.</h2>
  <p>${items.map(item => 
    `<span>${cleanString(item)}</span><br>`
  ).join('')}</p>
  <p>
  ${kartya_jutalom_array ?
    `
    <section class="fade card felsokoz nagycard hoverelheto">
             <div class="corner top left"></div>
             <div class="corner top right"></div>
             <div class="corner bottom left"></div>
             <div class="corner bottom right"></div>
    <figure class="figure figure-leshen ${irt_elem}">
      <div class="canvas3igazitas"><canvas id="juti" width="500" height="600"></canvas> </div>
    </figure>
    <div class="">
      <div class="content">
        <div class="nevBerak">${kartya_jutalom_array[0]}</div>
      </div>
    </div>
    <footer class="footer footer-leshen">
      <div class="details">
        <p class="kartyaSzoveg">${kartya_jutalom_array[1]}⚔️</p>
      </div>
            <div class="details elsoDetail">
        <img class="elem-icon" src="${kartya_jutalom_array[3]}.png" alt="">
      </div>
      <div class="details">
        <p class="kartyaSzoveg jobboldal">${kartya_jutalom_array[2]}❤️</p>
      </div>
    </footer>
  </section>
    `
    : ''}
  </p>
  `
  if (kartya_skinn != undefined) {
      // let skine = skinConverter(kartya_skinn)
      setTimeout(() => {
          drawCharacter2(kartya_skinn[3], kartya_skinn[0], kartya_skinn[1], kartya_skinn[2], true, "juti")
        }, 100);
  }


  document.querySelector(".jutalom").style.display = "block";
  document.querySelector(".meccsVegeGomb").style.display = "block";
}

function reset_operation_complete() {
  operation_complete = false;  // Visszaállítjuk false-ra a változót
}

function tovabb() {
  zeneAllj2(battleCurrentAudio)
  setTimeout(() => {
    playNormalTrack()
  }, 500);
  window.pywebview.api.back_to_collection().then(() => {
    kartya_jutalom_array = null;
    ellenfelek_kazamata = []
    document.querySelector(".meccsVegeGomb").style.display = "none";
    document.querySelector(".jutalom").style.display = "none";
    document.querySelector(".harcmezo").classList.add("nelatszon")
    document.querySelector(".main").classList.remove("nelatszon")
    // document.querySelector(".ellenfelek").innerHTML = "";
    document.querySelector(".mezoalso").innerHTML = "";
    document.querySelector(".mezofelso").innerHTML = "";
    document.getElementById("kozep2").innerHTML = "";
    document.getElementById("kozep3").innerHTML = "";
    document.getElementById("kozep4").innerHTML = "";
    document.getElementById("kozep5").innerHTML = "";
    document.getElementById("kozep6").innerHTML = "";
    let hany = 0
    for (let id of selected_ids){
      hany += 1
      document.querySelector(".kartyak").querySelector("#kartya-"+id).querySelector(".szamSzinez").innerHTML = hany
      document.querySelector(".kartyak").querySelector("#kartya-"+id).querySelector(".szamSzinez").classList.add("szamSzinez_igen")
      document.querySelector(".kartyak").querySelector("#kartya-"+id).classList.add("nagyitas")
    }
    document.querySelector(".harcmezo").classList.remove(`${palya_elem}-bg`)
    palya_elem = "normal"
  });
}

function nehzesegi_szint_beallitas(szint) {
  // itt a szint egy 0-tól 10-ig terjedő egész szám (0 és 10 is beleértve)
  window.pywebview.api.set_nehezsegi_szint(szint)
}

function hibaJelzoEltunteto() {
  document.querySelector(".hibaJelzo").style.display = "none";
}

const fomenu_scene = document.querySelector('.fomenu_scene');
const jatekScene = document.querySelector('.ujjatek_scene');
const mentesScene = document.querySelector('.folytatas_scene');
const VilagScene = document.querySelector(".vilagselect_scene")
const VilagkartyaScene = document.querySelector(".Vilagkartya_scene")
const main_scene = document.querySelector(".main")

const zoom_sound = new Audio("./hangeffektek/zoom.mp3")
const zoom_out_sound = new Audio("./hangeffektek/zoom_out.mp3")
const magic_gomb_sound = new Audio("./hangeffektek/magic_gomb.mp3")
const fire_lightup_sound = new Audio("./hangeffektek/torch_lightup.mp3")
const fire_loop_sound = new Audio("./hangeffektek/torch_loop.mp3")
const portal_sound = new Audio("./hangeffektek/portal.mp3")

fire_lightup_sound.volume = 0.2;
portal_sound.volume = 0.5;


function Zoom(){
        zoom_sound.play();
        fomenu_scene.classList.remove("bg_unzoomed")
        fomenu_scene.classList.add('bg_zoomed');
    }

    function unZoom(){
        fomenu_scene.classList.remove('bg_zoomed');
        fomenu_scene.classList.add("bg_unzoomed")
    }


    function Vilagok(opcio) {
      zeneAllj(audioTracks);
      playNormalTrack();
      document.documentElement.style.setProperty("--nagyitasmerteke", `${1.2*(window.innerWidth/1920)}`)
        if (opcio == 'ujjatek') {
            window.pywebview.api.full_uj_jatek_beallitas(true)
            window.pywebview.api.mentesi_fajlok_neveinek_betoltese().then((resp)=>{
            // document.querySelector(".jatekok").innerHTML = "ALMALAMLMALMALM"
            let mentesek = resp;
            mentesek.forEach(mentes => {
                mentesnev_lista.push(mentes[0].mentesi_nev)
              });
            });
            vilagok_betoltese()
            Zoom()
            setTimeout(() => {
                fomenu_scene.classList.add("kikapcsol")
                jatekScene.classList.remove("scene_disappear")
                jatekScene.classList.remove("kikapcsol")
                jatekScene.classList.add('scene_reveal')
                fire_lightup_sound.play()
                fire_lightup_sound.currentTime = 0;
                fire_loop_sound.play()
                fire_loop_sound.currentTime = 0;
                fire_loop_sound.loop = true
                portal_sound.play()
                portal_sound.currentTime = 0;
                portal_sound.loop = true
            }, 1400);
        }
        else if (opcio == 'folytatas') {
          window.pywebview.api.full_uj_jatek_beallitas(false)
          mentesek_betoltese()
            Zoom()
            setTimeout(() => {
                fomenu_scene.classList.add("kikapcsol")
                mentesScene.classList.remove("scene_disappear")
                
                mentesScene.classList.remove("kikapcsol")
                mentesScene.classList.add('scene_reveal')
                fire_lightup_sound.play()
                fire_lightup_sound.currentTime = 0;
                fire_loop_sound.play()
                fire_loop_sound.currentTime = 0;
                fire_loop_sound.loop = true
                portal_sound.play()
                portal_sound.currentTime = 0;
                portal_sound.loop = true
            }, 1400);
        }else if (opcio == 'vilag') {
            karakterek_megkapasa()
            Zoom()
            setTimeout(() => {
                fomenu_scene.classList.add("kikapcsol")
                VilagScene.classList.remove("scene_disappear")
                
                VilagScene.classList.remove("kikapcsol")
                VilagScene.classList.add('scene_reveal')
                fire_lightup_sound.play()
                fire_lightup_sound.currentTime = 0;
                fire_loop_sound.play()
                fire_loop_sound.currentTime = 0;
                fire_loop_sound.loop = true
                portal_sound.play()
                portal_sound.currentTime = 0;
                portal_sound.loop = true
            }, 1400);
        }
    } 



    function VisszaLepes(opcio) {
      zeneAllj2(normalCurrentAudio);
      setTimeout(() => {
        playNextTrack();
      }, 500);
        portal_sound.loop = false;  
        portal_sound.pause();        
        portal_sound.currentTime = 0; 
        fire_loop_sound.loop = false;
        fire_loop_sound.pause();     
        fire_loop_sound.currentTime = 0;
        zoom_out_sound.play()
        if(opcio == 'ujjatek'){
            jatekScene.classList.remove("scene_reveal")
            jatekScene.classList.add("scene_disappear")
            setTimeout(() => {
                jatekScene.classList.add("kikapcsol")
                fomenu_scene.classList.remove("kikapcsol")
                setTimeout(() => {
                    unZoom()
                }, 200);    
            }, 500);
        }
        else if(opcio  == 'folytatas'){
            mentesScene.classList.remove("scene_reveal")
            mentesScene.classList.add("scene_disappear")
            setTimeout(() => {
                mentesScene.classList.add("kikapcsol")
                fomenu_scene.classList.remove("kikapcsol")
                setTimeout(() => {
                    unZoom()
                }, 200);    
            }, 500);
        }else if(opcio  == 'vilag'){
            VilagScene.classList.remove("scene_reveal")
            VilagScene.classList.add("scene_disappear")
            setTimeout(() => {
                VilagScene.classList.add("kikapcsol")
                fomenu_scene.classList.remove("kikapcsol")
                setTimeout(() => {
                    unZoom()
                }, 200);    
            }, 500);
        }
    }

    


    let alapmod = true;

    let alap = document.querySelector(".alapmod")
    let komoly = document.querySelector(".komolymod")
    function HandleJatekmodChange(){
        if(!alapmod){
            komoly.style.opacity = 0
            alap.style.opacity = 1
            alapmod = true
            mod = "alap"
        }else{
            komoly.style.opacity = 1
            alap.style.opacity = 0
            alapmod = false
            mod = "ajanlott"
        }
        window.pywebview.api.mod_beallitas(mod)
    }

let vilagnev = ""
function vilag_beallito(vilag) {
  vilagnev = vilag;
}

function VilagkartyakScene(){
        CreateWorld('vilag')
        VilagkartyaScene.classList.remove("scene_disappear")
        VilagkartyaScene.classList.remove("kikapcsol")
        VilagkartyaScene.classList.add("scene_reveal")
    }

    function VilagCreateScene(){
      karakterek_megkapasa(vilagnev)
      EllenfelekSlotok('egyszeru')
      document.getElementById("tipus_select").selectedIndex = 0
        VilagkartyaScene.classList.add("scene_disappear")
        setTimeout(() => {
            VilagkartyaScene.classList.add("kikapcsol")
            VilagkartyaScene.classList.remove("scene_reveal")
        }, 1000);
        BackToSelect('vilag')
    }

    function BackToSelect(opcio){
        zoom_out_sound.play()
        if(opcio == 'ujjatek'){
            jatekScene.classList.add("scene_reveal")
            jatekScene.classList.add("bg_unzoomed")
            jatekScene.classList.remove('bg_zoomed');
            jatekScene.classList.remove('scene_disappear');
            setTimeout(() => {
                jatekScene.classList.remove("kikapcsol")
            }, 2000);
        }else if(opcio == 'folytatas'){
            document.querySelector(".main").classList.add("scene_disappear")
            setTimeout(() => {
              document.querySelector(".main").classList.add("nelatszon")
              document.querySelector(".my_scene").classList.remove("nelatszon")
              mentesScene.classList.add("scene_reveal")
              mentesScene.classList.add("bg_unzoomed")
              mentesScene.classList.remove('bg_zoomed');
              mentesScene.classList.remove('scene_disappear');
              mentesScene.classList.remove("kikapcsol")
              window.pywebview.api.reloadpage()
            }, 1500);
        }else if(opcio == 'vilag'){
            VilagScene.classList.add("scene_reveal")
            VilagScene.classList.add("bg_unzoomed")
            VilagScene.classList.remove('bg_zoomed');
            VilagScene.classList.remove('scene_disappear');
            setTimeout(() => {
                VilagScene.classList.remove("kikapcsol")
            }, 2000);
        }
    }

    function EllenfelekSlotok(tipus){
        let kartyak = document.querySelector(".kartyakSelect")
        let jutalmak = document.querySelector(".jutalmak")
        let html = kivalasztott_normal_kartyak_normal.map(kartya => `<option value="${kartya[0]}">${kartya[1]}⚔️ ${kartya[0]} ${kartya[2]}❤️</option>`)
        let vezerhtml = kivalasztott_normal_kartyak_vezer.map(kartya => `<option value="${kartya[0]}">${kartya[1]}⚔️ ${kartya[0]} ${kartya[2]}❤️</option>`)
        if(tipus == 'egyszeru'){
            kartyak.innerHTML = `<p>Kártya kiválasztása: </p><select name="" class="kazamataKartya1">${html}</select>`
            jutalmak.innerHTML = '<label for="tipus_select">Jutalom: </label><select name="" id="tipus_select" class="jutalomSelect"><option value="sebzes">Sebzés</option><option value="eletero">Életerő</option></select>'
        }else if(tipus == 'kis'){
            kartyak.innerHTML = `
            <p>Kártyák kiválasztása: </p>
            <select name="" class="kazamataKartya1">${html}</select>
            <select name="" class="kazamataKartya2">${html}</select>
            <select name="" class="kazamataKartya3">${html}</select>
            <p>Vezér kártya kiválasztása: </p>
            <select name="" class="vezerkartya_select">${vezerhtml}</select>`
            jutalmak.innerHTML = '<label for="tipus_select">Jutalom: </label><select name="" id="tipus_select" class="jutalomSelect"><option value="sebzes">Sebzés</option><option value="eletero">Életerő</option></select>'
        }else if(tipus == 'nagy'){
            kartyak.innerHTML = `
            <p>Kártyák kiválasztása: </p>
            <select name="" class="kazamataKartya1">${html}</select>
            <select name="" class="kazamataKartya2">${html}</select>
            <select name="" class="kazamataKartya3">${html}</select>
            <select name="" class="kazamataKartya4">${html}</select>
            <select name="" class="kazamataKartya5">${html}</select>
            <p>Vezér kártya kiválasztása: </p>
            <select name="" class="vezerkartya_select">${vezerhtml}</select>`
            jutalmak.innerHTML = ""
        }
        
    }


    let nev = document.querySelector(".currentnev")
    let gyujtemeny = document.querySelector(".currentgyujtemeny")
    let kazamata = document.querySelector(".currentkazamatak")

    let nextId = 0

function HozzaadasVilag(mit){
        let status = document.querySelector(".status")

        if(mit == 'nev'){
            nev.innerHTML = `<span>${document.querySelector(".vilagnev").value}</span>`
        }else if(mit == 'gyujtemeny'){
            let select = document.querySelector('.gyujtemenySelect');
            let value = select.options[select.selectedIndex].innerHTML;
            let value2 = select.options[select.selectedIndex].value;
            let ujKartya = {
              nev:value2,
              html:value
            }
            const alreadyExists = currentgyujtemeny.some(k =>
                JSON.stringify(k) === JSON.stringify(ujKartya)
            );
            if(!alreadyExists){
                currentgyujtemeny.push(ujKartya)
                gyujtemeny.innerHTML = ""
                gyujtemeny.innerHTML += currentgyujtemeny.map(x => `<span class="kistegla gyujtemenytegla" onclick="TorolCurrentKartya('${x.nev}')">${x.html}</span>`).join("")
                
                status.innerHTML = "A Kártya hozzáadva a gyűjteményhez"
            }else{
                status.innerHTML = "A gyűjtemény részét nem alkothatja egy kártya többször"
            }
        }else if(mit == 'kazamata'){
            let nev = document.querySelector(".kazamatanev")

            let select2 = document.querySelector(".tipusSelect")
            let value2 = []
            value2.push(select2.options[select2.selectedIndex].value, select2.options[select2.selectedIndex].innerHTML);

            if(document.querySelector(".kazamataKartya1")){
                let kartya_select1 = document.querySelector(".kazamataKartya1")
                let kartya1 = []
                kartya1.push(kartya_select1.options[kartya_select1.selectedIndex].value, kartya_select1.options[kartya_select1.selectedIndex].innerHTML);
                if(!currentKazamataKartyak.some(k => k[0] === kartya1[0])){
                    currentKazamataKartyak.push(kartya1)
                }
            }

            if(document.querySelector(".kazamataKartya2")){
                let kartya_select2 = document.querySelector(".kazamataKartya2")
                let kartya2 = []
                kartya2.push(kartya_select2.options[kartya_select2.selectedIndex].value, kartya_select2.options[kartya_select2.selectedIndex].innerHTML);
                if(!currentKazamataKartyak.some(k => k[0] === kartya2[0])){
                    currentKazamataKartyak.push(kartya2)
                }
            }

            if(document.querySelector(".kazamataKartya3")){
                let kartya_select3 = document.querySelector(".kazamataKartya3")
                let kartya3 = []
                kartya3.push(kartya_select3.options[kartya_select3.selectedIndex].value, kartya_select3.options[kartya_select3.selectedIndex].innerHTML);
                if(!currentKazamataKartyak.some(k => k[0] === kartya3[0])){
                    currentKazamataKartyak.push(kartya3)
                }
            }

            if(document.querySelector(".kazamataKartya4")){
                let kartya_select4 = document.querySelector(".kazamataKartya4")
                let kartya4 = []
                kartya4.push(kartya_select4.options[kartya_select4.selectedIndex].value, kartya_select4.options[kartya_select4.selectedIndex].innerHTML);
                if(!currentKazamataKartyak.some(k => k[0] === kartya4[0])){
                    currentKazamataKartyak.push(kartya4)
                }
            }

            if(document.querySelector(".kazamataKartya5")){
                let kartya_select5 = document.querySelector(".kazamataKartya5")
                let kartya5 = []
                kartya5.push(kartya_select5.options[kartya_select5.selectedIndex].value, kartya_select5.options[kartya_select5.selectedIndex].innerHTML);
                if(!currentKazamataKartyak.some(k => k[0] === kartya5[0])){
                    currentKazamataKartyak.push(kartya5)
                }
            }

            let vezer = []
            if(document.querySelector(".vezerkartya_select")){
                let vezer_select = document.querySelector(".vezerkartya_select")
                vezer = ["<span>Vezér: " + vezer_select.options[vezer_select.selectedIndex].innerHTML + "</span>", vezer_select.options[vezer_select.selectedIndex].value];
            }else{
              vezer.push("", "")
            }

            let selected_jutalom = []
            if(document.querySelector(".jutalomSelect")){
                let select = document.querySelector(".jutalomSelect")
                selected_jutalom = ["<span>Jutalom: " + select.options[select.selectedIndex].innerHTML + "</span>", select.options[select.selectedIndex].value];
            }else{
              selected_jutalom.push("", "")
            }

            let kartyak = currentKazamataKartyak.map(x => x[1]).join(", ")
            let kartyak2 = currentKazamataKartyak.map(x => x[0])

            if((value2[1] == "Egyszerű" && currentKazamataKartyak.length == 1 || value2[1]  == "Kis" && currentKazamataKartyak.length == 3 || value2[1]  == "Nagy" && currentKazamataKartyak.length == 5) && nev.value != ""){
                let ujkazamata = {
                    id:nextId,
                    nev:nev.value,
                    tipus:value2[1],
                    kartyak:kartyak,
                    vezer:vezer[0],
                    jutalom:selected_jutalom[0],
                    tipus_value:value2[0],
                    kartyak_value:kartyak2,
                    vezer_value:vezer[1],
                    jutalom_value:selected_jutalom[1]
                }


                let ujNev = nev.value;

                let marVan = currentKazamatak.some(k => k.nev === ujNev);

                if (!marVan) {
                    nextId++;
                    currentKazamatak.push(ujkazamata);
                    kazamata.innerHTML = ""
                    kazamata.innerHTML += currentKazamatak.map(x => `<span class="kistegla" onclick="TorolCurrentKazamata('${x.id}')"><span>Név: ${x.nev}</span> <span>Tipus: ${x.tipus}</span> <span>Kártyák: ${x.kartyak}</span> ${x.vezer} ${x.jutalom}</span>`).join("")
                    status.innerHTML = "A kazamata hozzá lett adva"
                } else {
                    status.innerHTML = "Már létezik kazamata ezzel a névvel!";
                }
            }else if(nev.value == ""){
                status.innerHTML = "A kazamatának nincsen neve!"
            }else{
                status.innerHTML = "A kazamatában nem lehet két ugyanolyan kártya"
            }
            
            currentKazamataKartyak = []
        }
    }

    function TorolCurrentKartya(nev){
        let i = currentgyujtemeny.findIndex(x => x.nev == nev)
        if(i != -1){
            currentgyujtemeny.splice(i, 1)
            gyujtemeny.innerHTML = ""
            gyujtemeny.innerHTML += currentgyujtemeny.map(x => `<span class="kistegla gyujtemenytegla" onclick="TorolCurrentKartya('${x.nev}')">${x.html}</span>`).join("")
        }
    }

    function TorolCurrentKazamata(id){
        let i = currentKazamatak.findIndex(x => x.id == id)
        if(i != -1){
            currentKazamatak.splice(i, 1)
            kazamata.innerHTML = ""
            kazamata.innerHTML += currentKazamatak.map(x => `<span class="kistegla" onclick="TorolCurrentKazamata('${x.id}')"><span>Név: ${x.nev}</span> <span>Tipus: ${x.tipus}</span> <span>Kártyák: ${x.kartyak}</span> ${x.vezer} ${x.jutalom}</span>`).join("")
        }
    }


    function HandleNehezseg(value){
        document.querySelector(".nehezsegSzin").innerHTML = value
    }


    const openBtn = document.getElementById('openPopup');
    const closeBtn = document.getElementById('closePopup');
    const popup = document.getElementById('popup');

    openBtn.onclick = () => {
        popup.style.display = 'flex';
    };

    closeBtn.onclick = () => {
        popup.style.display = 'none';
    };

    /* kattintás a háttérre -> popup záródik */
    window.onclick = (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    };

function vilagok_betoltese(){
    window.pywebview.api.jatekvilagok_neveinek_betoltese().then((resp)=>{
        // document.querySelector(".jatekok").innerHTML = "ALMA"
        let vilagok = resp;
        vilagok.forEach(vilag => {
          let ujVilag = {
            nev:vilag[0],
            kartyak:vilag[1],
            vezerek:vilag[2],
            kazamatak:vilag[3],
            gyujtemeny:vilag[4]
          }
          vilagTomb.push(ujVilag)
        });
        handleVilagChange("semerre")
    });
}


function handleVilagChange(irany){
    if(irany == "jobb" && currentIndex < vilagTomb.length-1){
        currentIndex++;
        magic_gomb_sound.currentTime = 0; 
        magic_gomb_sound.play()
    }else if (irany == "bal" && currentIndex > 0){
        currentIndex--;
        magic_gomb_sound.currentTime = 0; 
        magic_gomb_sound.play()
    }
    document.querySelector(".jatekok").innerHTML = `<div class="vilag-gomb" style="cursor:pointer"><button class="openPopup" onclick="mentesmentesInfo('jatek')">Világ: ${vilagTomb[currentIndex].nev}</button></div>`;
    document.querySelector(".jatek-popup").innerHTML = `
                <p>Világnév: <span>${vilagTomb[currentIndex].nev}</span></p>
                <p>Világkártyák: <span>${vilagTomb[currentIndex].kartyak}</span></p>
                <p>Vezérkártyák: <span>${vilagTomb[currentIndex].vezerek}</span></p>
                <p>Kazamaták: <span>${vilagTomb[currentIndex].kazamatak}</span></p>
                <p>Gyüjtemény: <span>${vilagTomb[currentIndex].gyujtemeny}</span></p>`;
}




function mentesek_betoltese(){
    window.pywebview.api.mentesi_fajlok_neveinek_betoltese().then((resp)=>{
        // document.querySelector(".mentesek").innerHTML = resp
        let mentesek = resp;
        
        mentesek.forEach(mentes => {
          let legerosebb_kartya_adatai = JSON.parse(mentes[1][5]);
          let ujMentes = {
            fajl_nev:mentes[0].fajl_nev,
            nev:mentes[0].mentesi_nev,
            idopont:mentes[0].idopont,
            vilag_nev:mentes[1][0],
            win:mentes[1][1],
            lose:mentes[1][2],
            nehezsegi_szint:mentes[1][3],
            mod:mentes[1][4],
            legerosebb_nev:legerosebb_kartya_adatai.nev,
            legerosebb_sebzes:legerosebb_kartya_adatai.sebzes,
            legerosebb_eletero:legerosebb_kartya_adatai.eletero
          }
          mentesTomb.push(ujMentes)
        });
        handleMentesChange("semerre")
    });
}


function handleMentesChange(irany){
    if(irany == "jobb" && currentIndex2 < mentesTomb.length){
        magic_gomb_sound.currentTime = 0; 
        magic_gomb_sound.play()
        currentIndex2++;
    }else if (irany == "bal" && currentIndex2 > 0){
        magic_gomb_sound.currentTime = 0; 
        magic_gomb_sound.play()
        currentIndex2--;
    }
    if (mentesTomb.length == 0) {
        document.querySelector(".mentesek").innerHTML = `<h2>Nincs elérhető mentés!</h2>`
        return;
    }
    document.querySelector(".mentesek").innerHTML = `<div class="vilag-gomb" style="cursor:pointer"><button class="openPopup" onclick="mentesmentesInfo('mentes')">Mentés: ${mentesTomb[currentIndex2].nev}</button></div>`;
    document.querySelector(".mentes-popup").innerHTML = ` 
                <p>Mentés neve: <span>${mentesTomb[currentIndex2].nev}</span></p>
                <p>Mentés időpontja: <span>${mentesTomb[currentIndex2].idopont}</span></p>
                <p>Világ neve: <span>${mentesTomb[currentIndex2].vilag_nev}</span></p>
                <p>Győzelem: <span>${mentesTomb[currentIndex2].win}</span></p>
                <p>Vereség: <span>${mentesTomb[currentIndex2].lose}</span></p>
                <p>Nehézségi szint: <span>${mentesTomb[currentIndex2].nehezsegi_szint}</span></p>
                <p>Mod: <span>${mentesTomb[currentIndex2].mod}</span></p>
                <p>Legerősebb kártya: <span>${mentesTomb[currentIndex2].legerosebb_nev}</span></p>
                <p>Sebzés: <span>${mentesTomb[currentIndex2].legerosebb_sebzes}</span></p>
                <p>Életerő: <span>${mentesTomb[currentIndex2].legerosebb_eletero}</span></p>`;
}


let jatekpopup = false
let mentespopup = false

function mentesmentesInfo(opcio){
  
  if(opcio === "jatek"){
    jatekpopup = !jatekpopup;
    document.querySelector(".jatek-popup-overlay").style.display = jatekpopup ? "flex" : "none";
  }

  if(opcio === "mentes"){
    mentespopup = !mentespopup;
    document.querySelector(".mentes-popup-overlay").style.display = mentespopup ? "flex" : "none";
  }

}




function CreateWorld(opcio){
  zoom_sound.currentTime = 0
  zoom_sound.play();
  fire_loop_sound.pause();
  fire_lightup_sound.currentTime = 0
  fire_lightup_sound.loop = false
  portal_sound.pause();
  portal_sound.currentTime = 0
  portal_sound.loop = false
  if(opcio == 'ujjatek'){
      let difficultyLevel = document.getElementById("nehezseg").value;
      let mentesnev = document.getElementById("saveName").value;
      if (difficultyLevel < 0 || difficultyLevel > 10) {
          document.querySelector(".hibaJelzo").style.display = "block";
          document.querySelector(".hibaJelzoSzoveg").innerHTML = "<h1>A nehézségi szintnek 0 és 10 közötti értéknek kell lennie!</h1>"
          return;
      }
      if (difficultyLevel.trim() === "") {
          document.querySelector(".hibaJelzo").style.display = "block";
          document.querySelector(".hibaJelzoSzoveg").innerHTML = "<h1>Adj meg egy nehézségi szintet!</h1>"
          return;
      }
      if (mentesnev.trim() === "") {
          document.querySelector(".hibaJelzo").style.display = "block";
          document.querySelector(".hibaJelzoSzoveg").innerHTML = "<h1>Válassz mentési nevet!</h1>"
          return;
      }
      if (mentesnev_lista.includes(mentesnev.trim())) {
          document.querySelector(".hibaJelzo").style.display = "block";
          document.querySelector(".hibaJelzoSzoveg").innerHTML = "<h1>Ez a mentési név már létezik!</h1>"
          return;
      }

      nehzesegi_szint_beallitas(parseInt(difficultyLevel));
      jatekScene.classList.remove("bg_unzoomed")
      jatekScene.classList.remove("scene_reveal")
      jatekScene.classList.add('bg_zoomed');
      jatekScene.classList.add('scene_disappear');
      setTimeout(() => {
          jatekScene.classList.add('kikapcsol');
                window.pywebview.api.mentesi_fajl_neve_beallitas(mentesnev).then(() => {
        betoltVilag(vilagTomb[currentIndex].nev);
      });
      }, 1000);
  }else if(opcio == 'folytatas'){

      mentesScene.classList.remove("bg_unzoomed")
      mentesScene.classList.remove("scene_reveal")
      mentesScene.classList.add('bg_zoomed');
      mentesScene.classList.add('scene_disappear');

      setTimeout(() => {
          mentesScene.classList.add('kikapcsol');
            betoltMentes(`${mentesTomb[currentIndex2].fajl_nev}`)
      }, 1000);



  }else if(opcio == 'vilag'){
  fire_loop_sound.play()
          window.pywebview.api.karakterek_betoltese().then((resp)=>{
        let normal_kartyak_betolt = resp[0]; // nev, sebzes, eletero, elem, fej, torzs, lab, nem
        normal_kartyak_hossza = normal_kartyak_betolt.length;
        normal_kartyak_betolt = [...normal_kartyak_betolt, ...resp[1]]; // hozzáadjuk a vezérkártyákat is
        document.querySelector(".vilagkar").innerHTML = ""
        normal_kartyak_betolt.map((kartya, ind) => {

          let irt_elem = kartya[3]
          if (irt_elem == "tuz") {
            irt_elem = "tuzi"
          }
          document.querySelector(".vilagkar").innerHTML += `
          <section class="fade card felsokoz nagycard hoverelheto torol${ind} ${kivalasztott_normal_kartyak.includes(kartya[0]) ? "kivalasztva" : ""} ${ind>normal_kartyak_hossza-1 ? "vezerClassKartyaNagyonClass" : ""}" onclick="kartya_kivalasztas('${kartya[0]}', '${ind}')">
            <span class='szamSzinez'></span>
             <div class="corner top left"></div>
             <div class="corner top right"></div>
             <div class="corner bottom left"></div>
             <div class="corner bottom right"></div>
             <button onclick="karakter_torles('${kartya[0].toLowerCase()}', '${ind}')" class="vilagkartyacskatorlesecske">X</button>
    <figure class="figure figure-leshen ${irt_elem}">
      <div class="canvas3igazitas"><canvas id="kanvas${ind}" width="500" height="600"></canvas> </div>
    </figure>
    <div class="">
      <div class="content">
        <div class="nevBerak">${kartya[0]}</div>
      </div>
    </div>
    <footer class="footer footer-leshen">
      <div class="details">
        <p class="kartyaSzoveg">${kartya[1]}⚔️</p>
      </div>
            <div class="details elsoDetail">
        <img class="elem-icon" src="${kartya[3]}.png" alt="">
      </div>
      <div class="details">
        <p class="kartyaSzoveg jobboldal">${kartya[2]}❤️</p>
      </div>
    </footer>
  </section>
          `;
        setTimeout(() => {
          drawCharacter2(kartya[7], kartya[4], kartya[5], kartya[6], true, `kanvas${ind}`)
        }, 100);
        } );
        



      VilagScene.classList.remove("bg_unzoomed")
      VilagScene.classList.remove("scene_reveal")
      VilagScene.classList.add('bg_zoomed');
      VilagScene.classList.add('scene_disappear');
      setTimeout(() => {
          VilagScene.classList.add('kikapcsol');
      }, 1000);
      });
  }
}

        let images = [{}, {}]; // Képek tárolása egy objektumban
        let loadedImages = 0; // A sikeresen betöltött képek száma
        let animations = [];
        let headIndex = 1;
        let bodyIndex = 1;
        let legsIndex = 1;
        let selectedGender = "male"; // Kezdetben férfi
        let hairColor = "#FF0000"; // Kezdetben vörös haj
        let eyeColor = "#FFFF00"; // Kezdetben sárga szem
        let animationActive = false;
        let animationFrame = 0;
        let lastFrameTime = 0;
                    
        // sprite paraméterek
        let animRows = 0;
        let animCols = 0;
        let animFrameWidth = 0;
        let animFrameHeight = 0;
        let animTotalFrames = 0;
        let animImage = new Image();
        let animRowss = 0;  // Sorok száma
        let animColss = 0;  // Oszlopok száma
                
        let animationName = ""
        let animationImage = new Image();
        let animationGuideLine = new Image();
            // Dimension objektum a pozíciók és méretek kezelésé
        // Dimension objektum a pozíciók és méretek kezelésére
        let dimensions = {
            kozep: 750,
            kezdet: 450,
            headWidth: 0,
            headHeight: 0,
            hajWidth: 0,
            hajHeight: 0,
            bodyWidth: 0,
            bodyHeight: 0,
            kopenyWidth: 0,
            kopenyHeight: 0,
            legWidth: 0,
            legHeight: 0,
            fej_segedvonalWidth: 0,
            fej_segedvonalHeight: 0,
            fej2_segedvonalWidth: 0,
            fej2_segedvonalHeight: 0,
            haj_segedvonalWidth: 0,
            haj_segedvonalHeight: 0,
            torzs_segedvonalWidth: 0,
            torzs_segedvonalHeight: 0,
            kopeny_segedvonalWidth: 0,
            kopeny_segedvonalHeight: 0,
            lab_segedvonalWidth: 0,
            lab_segedvonalHeight: 0,
            derek_segedvonalWidth: 0,
            derek_segedvonalHeight: 0,
            
                segedWidth:0,
                segedHeight:0
        };

        // Kép betöltése
        function loadImage(hanyadik, src, imageKey, callback) {
            const image = new Image();
            image.src = src;
            image.onload = () => {
                images[hanyadik][imageKey] = image;
                
                loadedImages++;
                callback(true);
            };
            image.onerror = () => {
                images[hanyadik][imageKey] = null; // Ha nem találja a fájlt, akkor null értéket adunk neki
                loadedImages++;
                callback(false);
            };
        }

        let hanyKepetKellBetolteni = 0;
        // Minden kép betöltése egyszerre
        function loadAllImages(callback) {
          headIndex = 1;
          bodyIndex = 1;
          legsIndex = 1;
          loadedImages = 0;
          hanyKepetKellBetolteni = 0;
          images = [{},{}]; // Képek újra inicializálása
          document.getElementById("headIndex").innerText = headIndex;
          document.getElementById("bodyIndex").innerText = bodyIndex;
          document.getElementById("legsIndex").innerText = legsIndex;
            window.pywebview.api.osszes_kepnev_betoltese().then((resp)=>{
              for (let i = 0; i < 2; i++) {
                loadedImages = 0;
                hanyKepetKellBetolteni = resp[i].length;
                resp[i].forEach((elem) => {
                    loadImage(i, elem[0], elem[1], onImageLoaded);
                });
              }
                // drawCharacter2(headIndex, bodyIndex, legsIndex, true, "characterCanvas2");
            });        

            for(let i = 0; i < 20;i++){
                    animations.push([])
                   
                }
                window.pywebview.api.animacio_betoltese().then((resp) => {
                  for (let i = 0; i < 2; i++) {
                    resp[i].forEach((elem) => {
                      
                            const folder_path = elem[1];  
                            if(!elem[0].includes("vonal")){
                            loadAnimation(elem[0], folder_path); 
                        }
                    });}
                });
        }
        function loadAnimation(src, folder_path) {
                // Betöltjük az animációs képet
           
                    let animationIndex = 0;

                    // Az animationIndex meghatározása a folder_path alapján
                    if (folder_path[0] == 'n') {

                        animationIndex = 9 + parseInt(folder_path.split('h')[1]);  // Ha 'n' kezdődik, akkor 10-zel növeljük
                        // document.querySelector('.select_title').innerHTML+=animationIndex + " "
                    } else {
                        animationIndex = parseInt(folder_path.split('h')[1])-1;  // Ha nem 'n', akkor a számot közvetlenül használjuk
                        
                            
                    }

                    // Segédvonal fájl
                    let auxiliaryImage = null
                
                        
                        auxiliaryImage = new Image();
                        auxiliaryImage.src = folder_path + "/animation/animalo_seged_vonal.png";  // Segédvonal fájl elérési útja
                    const seged = new Image();
                        seged.src = folder_path +"/animation/animalo_seged_vonal.png";  // Az új kép elérési útja

                      


                    // Ha az animációkhoz nem létező index található, létrehozzuk
                    if (!animations[animationIndex - 1]) {
                        animations[animationIndex - 1] = [];  // Ha még nem létezik, inicializáljuk
                    }
                    // Az animációs fájl és segédvonal fájl hozzáadása a megfelelő indexhez
                    animations[animationIndex].push([ folder_path + "/" + src, seged]);

                
                };
            
        function getAnimationIndex(folder_path) {
                let index = 0;
                if (folder_path.includes("f_ch")) {
                    index = parseInt(folder_path.split("f_ch")[1]);  // f_ch1 -> 1, f_ch2 -> 2, stb.
                } else if (folder_path.includes("l_ch")) {
                    index = parseInt(folder_path.split("l_ch")[1]) + 10;  // l_ch1 -> 11, l_ch2 -> 12, stb.
                }
                return index;
            }

        // Ha minden kép betöltődött, rajzoljuk ki a karaktert
      
        let egs = true;
        function drawCharacter2(nem, fej, test, lab, futtasa, canvasNev) {

          dimensions.haj_segedvonalHeight = 0;
          dimensions.haj_segedvonalWidth = 0;
          dimensions.kopeny_segedvonalHeight = 0;
          dimensions.kopeny_segedvonalWidth = 0;

          canvas2 = document.getElementById("characterCanvas2");
          ctx2 = canvas2.getContext("2d");

          // document.getElementById("characterCanvas2").width = dimensions.bodyWidth  + (dimensions.bodyWidth + Math.max((dimensions.lab_segedvonalWidth - dimensions.derek_segedvonalWidth),0) - dimensions.legWidth); // vagy itt a legszélesebb kell a 3 közül


          
          // document.getElementById("characterCanvas2").width = dimensions.bodyWidth + Math.max((dimensions.legWidth - (dimensions.bodyWidth-(Math.abs(balcupli)))),Math.max(balcupli,0)); // vagy itt a legszélesebb kell a 3 közül
          // if ((dimensions.legWidth - Math.max(balcupli,0)) > dimensions.bodyWidth) {
          //   canvas2.width -= balcupli
          // }
          // if (Math.max(balcupli,0) + dimensions.bodyWidth > dimensions.legWidth && dimensions.legWidth >= dimensions.bodyWidth && (dimensions.legWidth - (dimensions.bodyWidth-(balcupli))) <0) {
          //   canvas2.width -= balcupli
          // }
          // if (dimensions.bodyWidth < dimensions.legWidth && balcupli > 0 && ((dimensions.bodyWidth + balcupli - dimensions.legWidth) >0)) {
          //   canvas2.width -= balcupli
          // }
          ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

          // canvas2.width = balcupli + Math.max(dimensions.legWidth - dimensions.lab_segedvonalWidth, dimensions.bodyWidth-dimensions.derek_segedvonalWidth)*2
          if (futtasa){
            canvas2.width = 500
            canvas2.height = 600
            ctx2.fillStyle = "white"; // háttér fehér
            ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
          }
            // canvas2.width = 200
            // canvas2.height =100

          // document.getElementById("characterCanvas2").height = dimensions.headHeight + dimensions.torzs_segedvonalHeight + dimensions.legHeight - dimensions.derek_segedvonalHeight; // vagy itt a legmagasabb kell a 3 közüls
            // ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
            const head = images[nem][`head${fej}`];
            const hair = images[nem][`hair${fej}`];
            const body = images[nem][`body${test}`];
            const kopeny = images[nem][`kopeny${test}`];
            const leg = images[nem][`leg${lab}`];
            const headGuideLine = images[nem][`headGuideLine${test}`];
            
            const headGuideLineTwo = images[nem][`headGuideLineTwo${fej}`];
            const hajGuideLine = images[nem][`hajGuideLine${fej}`];
            const bodyGuideLine = images[nem][`bodyGuideLine${test}`];
            
            const kopenyGuideLine = images[nem][`kopenyGuideLine${test}`];
            const legGuideLine = images[nem][`legGuideLine${lab}`];
            const waistGuideLine = images[nem][`waistGuideLine${test}`];
            const animation = animations[bodyIndex-1]
                let seged = null
                if(animation && !animationActive){
                animationName = animation[0][0]
                let animationNamecop = animation[0][0]
                seged = animation[0][1]
                dimensions.segedWidth = seged.width
                dimensions.segedHeight = seged.height
                animRowss = animationNamecop.split('/')[animationNamecop.split('/').length-1].split('_')[1].split("x")[0]
                animColss= animationNamecop.split('/')[animationNamecop.split('/').length-1].split('_')[1].split("x")[1].split(".")[0]
                
                }
            // Frissítés
            
            if (headGuideLine) {
                dimensions.fej_segedvonalWidth = headGuideLine.width / 4;
                dimensions.fej_segedvonalHeight = headGuideLine.height / 4;
            }
             if (headGuideLineTwo) {
                console.log("AJSDIJNAJSDHIASHDKJAH")
                dimensions.fej2_segedvonalWidth = headGuideLineTwo.width / 4;
                dimensions.fej2_segedvonalHeight = headGuideLineTwo.height / 4;
            }else {
                dimensions.fej2_segedvonalWidth = 0;
                dimensions.fej2_segedvonalHeight = 0;
            }
            if (hajGuideLine) {
                dimensions.haj_segedvonalWidth = hajGuideLine.width / 4;
                dimensions.haj_segedvonalHeight = hajGuideLine.height / 4;
            }
            if (kopenyGuideLine) {
                dimensions.kopeny_segedvonalWidth = kopenyGuideLine.width / 4;
                dimensions.kopeny_segedvonalHeight = kopenyGuideLine.height / 4;
            }
            if (bodyGuideLine) {
                dimensions.torzs_segedvonalWidth = bodyGuideLine.width / 4;
                dimensions.torzs_segedvonalHeight = bodyGuideLine.height / 4;
            }
            if (legGuideLine) {
                dimensions.lab_segedvonalWidth = legGuideLine.width / 4;
                dimensions.lab_segedvonalHeight = legGuideLine.height / 4;
            }
            if (waistGuideLine) {
                dimensions.derek_segedvonalWidth = waistGuideLine.width / 4;
                dimensions.derek_segedvonalHeight = waistGuideLine.height / 4;
            }
            if (head) {
                dimensions.headWidth = head.width / 4;
                dimensions.headHeight = head.height / 4;
            }
            if (hair) {
                dimensions.hajWidth = hair.width / 4;
                dimensions.hajHeight = hair.height / 4;
            }
            if (body) {
                dimensions.bodyWidth = body.width / 4;
                dimensions.bodyHeight = body.height / 4;
            }
            if (kopeny) {
                dimensions.kopenyWidth = kopeny.width / 4;
                dimensions.kopenyHeight = kopeny.height / 4;
            }
            if (leg) {
                dimensions.legWidth = leg.width / 4;
                dimensions.legHeight = leg.height / 4;
            }
                        const tolas =
                dimensions.fej2_segedvonalWidth > 1
                    ? dimensions.fej2_segedvonalWidth - dimensions.headHeight / 2
                    : 0;
            
            tullogoReszTestLab = dimensions.lab_segedvonalWidth - dimensions.derek_segedvonalWidth // ha pozitív akkor a láb kilóg balra a törzsből
            dimensions.kozep = dimensions.bodyWidth/2 + Math.max(tullogoReszTestLab, 0); //x koordináta közepe
            if (dimensions.haj_segedvonalWidth > 0) {
              if (tullogoReszTestLab < 0){ // testhez hasonlitunk
                 let alma1 = dimensions.kozep  - dimensions.headWidth/2 - (dimensions.bodyWidth/2 - dimensions.torzs_segedvonalWidth) + dimensions.headWidth - dimensions.haj_segedvonalWidth +tolas +dimensions.hajWidth
                 let alma2 = alma1 - (dimensions.hajWidth - dimensions.haj_segedvonalWidth) - dimensions.headWidth/2 - dimensions.torzs_segedvonalWidth
                 let alma3 = dimensions.hajWidth - Math.abs(alma2 - alma1)
                //  alma = dimensions.hajWidth - alma
                //  document.querySelector(".ideirok2").innerHTML = alma.toString()
                 dimensions.kozep += Math.max(alma3,0)
              }else { // lábhoz hasonlitunk
                 let alma1 = dimensions.kozep  - dimensions.headWidth/2 - (dimensions.bodyWidth/2 - dimensions.torzs_segedvonalWidth) + dimensions.headWidth - dimensions.haj_segedvonalWidth +tolas +dimensions.hajWidth
                 let alma2 = alma1 - (dimensions.hajWidth - dimensions.haj_segedvonalWidth) - dimensions.headWidth/2 - dimensions.torzs_segedvonalWidth
                 let alma3 = dimensions.hajWidth - Math.abs(alma2 - alma1) - tullogoReszTestLab
                //  alma = dimensions.hajWidth - alma
                //  document.querySelector(".ideirok2").innerHTML = alma.toString()
                 dimensions.kozep += Math.max(alma3,0)
              }
            }
            dimensions.kezdet = Math.max(dimensions.bodyHeight/2 - dimensions.fej_segedvonalHeight +dimensions.headHeight + dimensions.haj_segedvonalHeight, dimensions.bodyHeight/2); //y koordináta közepe


            console.log(dimensions.haj_segedvonalWidth)
            if (hair) {
                ctx2.drawImage(
                    hair,
                    dimensions.kozep  - dimensions.headWidth/2 - (dimensions.bodyWidth/2 - dimensions.torzs_segedvonalWidth) + dimensions.headWidth - dimensions.haj_segedvonalWidth +tolas, 
                    dimensions.kezdet - dimensions.headHeight -dimensions.bodyHeight/2 + dimensions.fej_segedvonalHeight - dimensions.haj_segedvonalHeight,
                    dimensions.hajWidth,
                    dimensions.hajHeight
                );
            }
            if (kopeny) {
                ctx2.drawImage(
                    kopeny,
                    
                    dimensions.kozep-dimensions.bodyWidth/2 - dimensions.bodyWidth + dimensions.kopeny_segedvonalWidth ,
                    dimensions.kezdet - dimensions.bodyHeight/2,
                    dimensions.kopenyWidth,
                    dimensions.kopenyHeight
                );
            }
            if (leg) {
                ctx2.drawImage(
                    leg,
                    dimensions.kozep  - dimensions.bodyWidth/2  - dimensions.legWidth + dimensions.derek_segedvonalWidth -(dimensions.lab_segedvonalWidth - dimensions.legWidth),
                    dimensions.kezdet - dimensions.bodyHeight/2 + dimensions.fej_segedvonalHeight+ dimensions.torzs_segedvonalHeight - dimensions.lab_segedvonalHeight -dimensions.derek_segedvonalHeight,
                    dimensions.legWidth,
                    dimensions.legHeight
                );
            }
            if (body) {
                    let width = 0
                    let height = 0
                    // Switch a nemekre
                    let valamiWidth = 0
                    let valamiHeight = 0
                    
                    switch (nem) {
                        case "1":
                            console.log("Női karakter");
                            switch (test) {
                                case "1":
                                    width = dimensions.bodyWidth*1.5
                                    height = dimensions.bodyHeight*2.05
                                    valamiWidth = dimensions.segedWidth*1.15
                                    valamiHeight = dimensions.segedHeight*0.15
                                    break;
                                case "2":
                                    width = dimensions.bodyWidth*2.3
                                    height = dimensions.bodyHeight*2.3
                                    valamiWidth = dimensions.segedWidth*1.0
                                    valamiHeight = dimensions.segedHeight*0.95
                                    break;
                                case "3":
                                    width = dimensions.bodyWidth*1.85
                                    height = dimensions.bodyHeight*1.85
                                    valamiWidth = dimensions.segedWidth*1.1
                                    valamiHeight = dimensions.segedHeight*0.9
                                    break;
                                case "4":
                                    width = dimensions.bodyWidth*2.35
                                    height = dimensions.bodyHeight*2.35
                                    valamiWidth = dimensions.segedWidth*1.1
                                    valamiHeight = dimensions.segedHeight*1.2
                                    break;
                                case "5":
                                      width = dimensions.bodyWidth*2
                                    height = dimensions.bodyHeight*2
                                    valamiWidth = dimensions.segedWidth*1.45
                                    valamiHeight = dimensions.segedHeight*1.1
                                    break;
                                case "6":
                                      width = dimensions.bodyWidth*1.36
                                    height = dimensions.bodyHeight*1.46
                                    valamiWidth = dimensions.segedWidth*1.45
                                    valamiHeight = dimensions.segedHeight*1.2
                                    break;
                                case "7":
                                    width = dimensions.bodyWidth*1.35
                                    height = dimensions.bodyHeight*2.1
                                    valamiWidth = dimensions.segedWidth*1.2
                                    valamiHeight = dimensions.segedHeight*1.2
                                    break;
                                case "8":
                                    width = dimensions.bodyWidth*1.9
                                    height = dimensions.bodyHeight*2.05
                                    valamiWidth = dimensions.segedWidth*1.2
                                    valamiHeight = dimensions.segedHeight*1
                                    break;
                                case "9":
                                    width = dimensions.bodyWidth*2.4
                                    height = dimensions.bodyHeight*2.0
                                    valamiWidth = dimensions.segedWidth*1.15
                                    valamiHeight = dimensions.segedHeight*0.95
                                    break;
                                case "10":
                                    width = dimensions.bodyWidth*2.0
                                    height = dimensions.bodyHeight*2.1
                                    valamiWidth = dimensions.segedWidth*1.3
                                    valamiHeight = dimensions.segedHeight*1.0
                                    break;
                                default:
                                    console.log("Érvénytelen szám");
                            }
                            break;
                        
                        case "0":
                            console.log("Férfi karakter");
                           
                            switch (test) {
                                case "1":
                                    width = dimensions.bodyWidth*1.14
                                    height = dimensions.bodyHeight*1.14
                                    
                                    valamiWidth = dimensions.segedWidth*1.09
                                    valamiHeight = dimensions.segedHeight*1.5
                                    break
                                case "2":
                                    width = dimensions.bodyWidth*1.85
                                    height = dimensions.bodyHeight*1.85
                                    
                                    valamiWidth = dimensions.segedWidth*1.09
                                    valamiHeight = dimensions.segedHeight*0.9
                                    break;
                                case "3":
                                    width = dimensions.bodyWidth*1.85
                                    height = dimensions.bodyHeight*1.85
                                    
                                    valamiWidth = dimensions.segedWidth*1.0
                                    valamiHeight = dimensions.segedHeight*1.0
                                    break;
                                case "4":
                                    width = dimensions.bodyWidth*2.14
                                    height = dimensions.bodyHeight*2.14
                                    
                                    valamiWidth = dimensions.segedWidth*1.09
                                    valamiHeight = dimensions.segedHeight*1.0
                                    break;
                                case "5":
                                    width = dimensions.bodyWidth*1.15
                                    height = dimensions.bodyHeight*0.9
                                    
                                    valamiWidth = dimensions.segedWidth*1.09
                                    valamiHeight = dimensions.segedHeight*1.5
                                    break;
                                case "6":
                                    width = dimensions.bodyWidth*1.14
                                    height = dimensions.bodyHeight*1.14
                                    
                                    valamiWidth = dimensions.segedWidth*1
                                    valamiHeight = dimensions.segedHeight*1.1
                                    break;
                                case "7":
                                       width = dimensions.bodyWidth*1.35
                                    height = dimensions.bodyHeight*1.35
                                    
                                    valamiWidth = dimensions.segedWidth*1.1
                                    valamiHeight = dimensions.segedHeight*1.35
                                    break;
                                case "8":
                                    width = dimensions.bodyWidth*2.14
                                    height = dimensions.bodyHeight*2.14
                                    valamiWidth = dimensions.segedWidth*1.27
                                    valamiHeight = dimensions.segedHeight*1.35
                                    break;
                                case "9":
                                    width = dimensions.bodyWidth*1.65
                                    height = dimensions.bodyHeight*1.65
                                    
                                    valamiWidth = dimensions.segedWidth*1.2
                                    valamiHeight = dimensions.segedHeight*1.1
                                    break;
                                case "10":
                                    width = dimensions.bodyWidth*1.14
                                    height = dimensions.bodyHeight*1.14
                                    break;
                                default:
                                    console.log("Érvénytelen szám");
                            }
                            break;
                        
                        default:
                            console.log("Érvénytelen nem");
                    }
                    
                    if (animationActive && animImage.complete && (canvasNev == 'kanvasjobb' || canvasNev =='kanvasbal')) {

                        const frame = animationFrame;

                        const col = frame % animMaxCols;
                        const row = Math.floor(frame / animMaxCols);
                        
                    
                        ctx2.drawImage(
                            animImage,
                            col * animFrameWidth,
                            row * animFrameHeight,
                            animFrameWidth,
                            animFrameHeight,
                            dimensions.kozep - (dimensions.bodyWidth / 2) - (valamiWidth - dimensions.derek_segedvonalWidth),
                            dimensions.kezdet - (dimensions.bodyHeight / 2) - valamiHeight,
                            width,
                            height
                        );
                    }
                    else {
                        
                        ctx2.drawImage(
                    body,
                    dimensions.kozep  - dimensions.bodyWidth/2,
                    dimensions.kezdet - dimensions.bodyHeight/2,
                    dimensions.bodyWidth,
                    dimensions.bodyHeight
                );
                    }
             
            }
            if (head) {
                ctx2.drawImage(
                    head,
                    dimensions.kozep  - dimensions.headWidth/2 - (dimensions.bodyWidth/2 - dimensions.torzs_segedvonalWidth) +tolas, 
                    dimensions.kezdet - dimensions.headHeight -dimensions.bodyHeight/2 + dimensions.fej_segedvonalHeight,
                    dimensions.headWidth,
                    dimensions.headHeight
                );
            }

                      
            
            if (futtasa){
              getCharacterDimensions(nem, fej, test, lab, canvasNev)
            }else {
              // let canvas3 = document.getElementById(canvasNev)
              // let ctx3 = canvas3.getContext("2d");
              document.getElementById(canvasNev).width = canvas2.width
              document.getElementById(canvasNev).height = canvas2.height
              // document.querySelector(".barackoska").innerHTML += `${canvasNev}`;
              document.getElementById(canvasNev).getContext("2d").clearRect(0, 0, document.getElementById(canvasNev).width, document.getElementById(canvasNev).height);
              document.getElementById(canvasNev).getContext("2d").drawImage(canvas2, 0, 0);
              // drawCharacter3(fej, test, lab)
            }
        }
        
        // Kép betöltése befejeződése után
        function onImageLoaded(success) {
            if (loadedImages === hanyKepetKellBetolteni) {
                // Ha minden képet betöltöttünk

            }
        }

        // Képek betöltése, majd karakter rajzolása

        // Lapozás logika
        function setupNavigation(
            prevBtnId,
            nextBtnId,
            indexSpanId,
            maxIndex,
            callback
        ) {
            document.getElementById(prevBtnId).addEventListener("click", () => {
                callback((i) => {
                  if (i > 1) i-=1;
                  else i = maxIndex;
                  return i
                });
            });
            document.getElementById(nextBtnId).addEventListener("click", () => {
                callback((i) => {
                  if (i < maxIndex) i += 1;
                  else i = 1;
                  return i
                });
            });
        }

        // Fej
        setupNavigation("headPrev", "headNext", "headIndex", 10, (fn) => {
            headIndex = fn(headIndex);
            document.getElementById("headIndex").textContent = headIndex;
            drawCharacter2(document.getElementById("gender").selectedIndex, headIndex, bodyIndex, legsIndex, true, "characterCanvas3");
        });

        // Törzs
        setupNavigation("bodyPrev", "bodyNext", "bodyIndex", 10, (fn) => {
            bodyIndex = fn(bodyIndex);
            document.getElementById("bodyIndex").textContent = bodyIndex;
            drawCharacter2(document.getElementById("gender").selectedIndex, headIndex, bodyIndex, legsIndex, true, "characterCanvas3");
        });

        // Láb
        setupNavigation("legsPrev", "legsNext", "legsIndex", 10, (fn) => {
            legsIndex = fn(legsIndex);
            document.getElementById("legsIndex").textContent = legsIndex;
            drawCharacter2(document.getElementById("gender").selectedIndex, headIndex, bodyIndex, legsIndex, true, "characterCanvas3");
        });

        // Változás a nemet választó gombnál
        document.getElementById("gender").addEventListener("change", (event) => {
            selectedGender = event.target.value;
            dimensions.hajWidth = 0;
            dimensions.hajHeight = 0;
            dimensions.haj_segedvonalWidth = 0;
            dimensions.haj_segedvonalHeight = 0;
            alma1 = 0
            alma2 = 0
            alma3 = 0
            legsIndex = 1;
            headIndex = 1;
            bodyIndex = 1;
            document.getElementById("headIndex").textContent = headIndex;
            document.getElementById("bodyIndex").textContent = bodyIndex;
            document.getElementById("legsIndex").textContent = legsIndex;
            drawCharacter2(document.getElementById("gender").selectedIndex, 1,1,1, true, "characterCanvas3");
            // loadAllImages(onImageLoaded); // Újra betöltjük az összes képet
        });

        let korabbiElem = "tuz";
        document.getElementById("elementSelect").addEventListener("change", (event) => {
            const selectedElement = event.target.value;
            if (korabbiElem != selectedElement){
              document.querySelector(".kintiKartya").classList.remove(korabbiElem)
              document.querySelector(".kintiKartya").classList.add(selectedElement)
              korabbiElem = selectedElement
            }
            kivalasztottElem = selectedElement;
            document.querySelector(".icon-elonezet").src = selectedElement + ".png";
            document.querySelector(".kintiKartya").classList
        });
        
        // Kép betöltése befejeződése után
        function onImageLoaded(success) {
            if (loadedImages === hanyKepetKellBetolteni) {
                // Ha minden képet betöltöttünk

            }
        }

        // Képek betöltése, majd karakter rajzolása

        // Lapozás logika
        function setupNavigation(
            prevBtnId,
            nextBtnId,
            indexSpanId,
            maxIndex,
            callback
        ) {
            document.getElementById(prevBtnId).addEventListener("click", () => {
                callback((i) => {
                  if (i > 1) i-=1;
                  else i = maxIndex;
                  return i
                });
            });
            document.getElementById(nextBtnId).addEventListener("click", () => {
                callback((i) => {
                  if (i < maxIndex) i += 1;
                  else i = 1;
                  return i
                });
            });
        }

        // Fej
        setupNavigation("headPrev", "headNext", "headIndex", 10, (fn) => {
            headIndex = fn(headIndex);
            document.getElementById("headIndex").textContent = headIndex;
            drawCharacter2(document.getElementById("gender").selectedIndex, headIndex, bodyIndex, legsIndex, true, "characterCanvas3");
        });

        // Törzs
        setupNavigation("bodyPrev", "bodyNext", "bodyIndex", 10, (fn) => {
            bodyIndex = fn(bodyIndex);
            document.getElementById("bodyIndex").textContent = bodyIndex;
            drawCharacter2(document.getElementById("gender").selectedIndex, headIndex, bodyIndex, legsIndex, true, "characterCanvas3");
        });

        // Láb
        setupNavigation("legsPrev", "legsNext", "legsIndex", 10, (fn) => {
            legsIndex = fn(legsIndex);
            document.getElementById("legsIndex").textContent = legsIndex;
            drawCharacter2(document.getElementById("gender").selectedIndex, headIndex, bodyIndex, legsIndex, true, "characterCanvas3");
        });

        // Változás a nemet választó gombnál
        document.getElementById("gender").addEventListener("change", (event) => {
            selectedGender = event.target.value;
            dimensions.hajWidth = 0;
            dimensions.hajHeight = 0;
            dimensions.haj_segedvonalWidth = 0;
            dimensions.haj_segedvonalHeight = 0;
            alma1 = 0
            alma2 = 0
            alma3 = 0
            legsIndex = 1;
            headIndex = 1;
            bodyIndex = 1;
            document.getElementById("headIndex").textContent = headIndex;
            document.getElementById("bodyIndex").textContent = bodyIndex;
            document.getElementById("legsIndex").textContent = legsIndex;
            drawCharacter2(document.getElementById("gender").selectedIndex, 1,1,1, true, "characterCanvas3");
            // loadAllImages(onImageLoaded); // Újra betöltjük az összes képet
        });

        korabbiElem = "tuz";
        document.getElementById("elementSelect").addEventListener("change", (event) => {
            const selectedElement = event.target.value;
            if (korabbiElem != selectedElement){
              document.querySelector(".kintiKartya").classList.remove(korabbiElem)
              document.querySelector(".kintiKartya").classList.add(selectedElement)
              korabbiElem = selectedElement
            }
            kivalasztottElem = selectedElement;
            document.querySelector(".icon-elonezet").src = selectedElement + ".png";
            document.querySelector(".kintiKartya").classList
        });

        // Kezdeti rajz
        // drawCharacter();
        // drawCharacter2(headIndex, bodyIndex, legsIndex, true);

function getCharacterDimensions(nem, headIndexx, bodyIndexx, legsIndexx, canvasNev) {

    const imageData = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);

    // document.querySelector(".atiro").innerHTML = canvas2.width + " " + canvas2.height;

    const pixels = imageData.data;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    // Magasság meghatározása: Vizsgáljuk meg az összes sort
    for (let y = 0; y < canvas2.height; y++) {
        let foundNonWhitePixelInRow = false;
        for (let x = 0; x < canvas2.width; x++) {
            const i = (y * canvas2.width + x) * 4;
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];

            // Ha nem fehér pixel, akkor rögzítjük, hogy ez a sor a karakter része
            if (!(r === 255 && g === 255 && b === 255)) {
                foundNonWhitePixelInRow = true;
                break; // Ha találunk egy nem fehér pixelt, nem kell tovább keresni a sorban
            }
        }

        if (foundNonWhitePixelInRow) {
            minY = Math.min(minY, y); // Karakter alja
            maxY = Math.max(maxY, y); // Karakter teteje
        }
    }

    // Szélesség meghatározása: Vizsgáljuk meg az összes oszlopot
    for (let x = 0; x < canvas2.width; x++) {
        let foundNonWhitePixelInColumn = false;
        for (let y = 0; y < canvas2.height; y++) {
            const i = (y * canvas2.width + x) * 4;
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];

            // Ha nem fehér pixel, akkor rögzítjük, hogy ez az oszlop a karakter része
            if (!(r === 255 && g === 255 && b === 255)) {
                foundNonWhitePixelInColumn = true;
                break; // Ha találunk egy nem fehér pixelt, nem kell tovább keresni az oszlopban
            }
        }

        if (foundNonWhitePixelInColumn) {
            minX = Math.min(minX, x); // Karakter bal oldala
            maxX = Math.max(maxX, x); // Karakter jobb oldala
        }
    }

    // Karakter szélessége és magassága
    const characterWidth = maxX - minX + 1;
    const characterHeight = maxY - minY + 1;
    // document.querySelector(".krumplis").innerHTML = `Szélesség: ${characterWidth}px, Magasság: ${characterHeight}px`;
    canvas2.width = characterWidth;
    canvas2.height = characterHeight;

    drawCharacter2(nem, headIndexx, bodyIndexx, legsIndexx, false, canvasNev);
    // Eredmény megjelenítése
}

function randomKepGeneralas() {
    headIndex = Math.floor(Math.random() * 10) + 1;
    bodyIndex = Math.floor(Math.random() * 10) + 1;
    legsIndex = Math.floor(Math.random() * 10) + 1;
    document.getElementById("headIndex").textContent = headIndex;
    document.getElementById("bodyIndex").textContent = bodyIndex;
    document.getElementById("legsIndex").textContent = legsIndex;
    drawCharacter2(document.getElementById("gender").selectedIndex, headIndex, bodyIndex, legsIndex, true, "characterCanvas3");
}
function karatker_kimentes_meghivo(){
  if (document.getElementById("letrehozoName").value.trim() === "") {
    document.querySelector(".hibaJelzo").style.display = "block";
    document.querySelector(".hibaJelzoSzoveg").innerHTML = "<h1>Adj meg egy nevet a karakterednek!</h1>"
    return;
  }
  
  window.pywebview.api.karakter_kimentese(document.getElementById("letrehozoName").value, document.getElementById("letrehozoSebzes").value, document.getElementById("letrehozoEletero").value, kivalasztottElem, headIndex, bodyIndex, legsIndex, document.querySelector('input[name="fajta"]:checked').value ,document.getElementById("gender").selectedIndex).then((respo)=>{
    
    if (!respo) {
      document.querySelector(".hibaJelzo").style.display = "block";
      document.querySelector(".hibaJelzoSzoveg").innerHTML = "<h1>Ez a karakter név már létezik!</h1>"
      return;
    }
      window.pywebview.api.karakterek_betoltese().then((resp)=>{
       
let normal_kartyak_betolt = resp[0]; // nev, sebzes, eletero, elem, fej, torzs, lab, nem
        normal_kartyak_hossza = normal_kartyak_betolt.length;
        normal_kartyak_betolt = [...normal_kartyak_betolt, ...resp[1]]; // hozzáadjuk a vezérkártyákat is
        document.querySelector(".vilagkar").innerHTML = ""
        normal_kartyak_betolt.map((kartya, ind) => {

          let irt_elem = kartya[3]
          if (irt_elem == "tuz") {
            irt_elem = "tuzi"
          }
          document.querySelector(".vilagkar").innerHTML += `
          <section class="fade card felsokoz nagycard hoverelheto torol${ind} ${kivalasztott_normal_kartyak.includes(kartya[0]) ? "kivalasztva" : ""} ${ind>normal_kartyak_hossza-1 ? "vezerClassKartyaNagyonClass" : ""}" onclick="kartya_kivalasztas('${kartya[0]}', '${ind}')">
            <span class='szamSzinez'></span>
             <div class="corner top left"></div>
             <div class="corner top right"></div>
             <div class="corner bottom left"></div>
             <div class="corner bottom right"></div>
             <button onclick="karakter_torles('${kartya[0].toLowerCase()}', '${ind}')" class="vilagkartyacskatorlesecske">X</button>
    <figure class="figure figure-leshen ${irt_elem}">
      <div class="canvas3igazitas"> <canvas id="kanvas${ind}" width="500" height="600"></canvas> </div>
    </figure>
    <div class="">
      <div class="content">
        <div class="nevBerak">${kartya[0]}</div>
      </div>
    </div>
    <footer class="footer footer-leshen">
      <div class="details">
        <p class="kartyaSzoveg">${kartya[1]}⚔️</p>
      </div>
            <div class="details elsoDetail">
        <img class="elem-icon" src="${kartya[3]}.png" alt="">
      </div>
      <div class="details">
        <p class="kartyaSzoveg jobboldal">${kartya[2]}❤️</p>
      </div>
    </footer>
  </section>
          `;
          
        setTimeout(() => {
          drawCharacter2(kartya[7], kartya[4], kartya[5], kartya[6], true, `kanvas${ind}`)
        }, 100);
        } );
        document.querySelector(".karakterke").classList.add("nelatszon");
        // document.querySelector(".koplar").innerHTML = "ALMALMALMALM";
        VilagkartyaScene.classList.remove("nelatszon");
      });
      // document.querySelector(".my_scene").classList.remove("nelatszon");

  });

}
    // A karakterek szélességének és magasságának kiszámítása

function sebzesChange(ertek) {
  document.getElementById("letrehozoSebzes").value = Math.max(2, Math.min(ertek, 100));
  document.querySelector(".sebzesBerak").innerHTML = "⚔️" + Math.max(2, Math.min(ertek, 100));
  if (document.querySelector(".sebzesBerak").innerHTML.length == 5){
    document.querySelector(".sebzesBerak").style.fontSize = "2.55vh";
  }else {
    document.querySelector(".sebzesBerak").style.fontSize = "2.963vh";
  }
}

function eleteroChange(ertek) {
  document.getElementById("letrehozoEletero").value = Math.max(1, Math.min(ertek, 100));
  document.querySelector(".eleteroBerak").innerHTML = Math.max(1, Math.min(ertek, 100))+"❤️";
  if (document.querySelector(".eleteroBerak").innerHTML.length == 5){
    document.querySelector(".eleteroBerak").style.fontSize = "2.55vh";
  }else {
    document.querySelector(".eleteroBerak").style.fontSize = "2.963vh";
  }
}

function nevChange(ertek) {
  document.querySelector(".nevBerak").innerHTML = ertek;
  if (document.querySelector(".nevBerak").innerHTML.length >= 11){
    adjustFontSize();
  }
  // else {
  //   document.querySelector(".nevBerak").style.fontSize = "2.08vh";
  // }
}

function adjustFontSize() {
    const textBox = document.querySelector('.nevBerak');
    const container = document.querySelector('.content');

    let fontSize = 2.08; // Kezdeti font méret
    textBox.style.fontSize = fontSize + 'vh';

    // Mivel a szöveg túl nagy lehet, csökkentjük a betűméretet, amíg elfér
    while (textBox.scrollWidth > container.clientWidth) {
        fontSize -= 0.0926; // Csökkentjük a font méretét
        textBox.style.fontSize = fontSize + 'vh';
    }
}

function kartyaSzetvalaszto(tomb) {
  kivalasztott_normal_kartyak_normal = [];
  kivalasztott_normal_kartyak_vezer = [];
  window.pywebview.api.karakterek_betoltese().then((resp)=>{
    let normal_kartyak_betolt = resp[0]; // nev, sebzes, eletero, elem, fej, torzs, lab, nem
    normal_kartyak_betolt.map(kartya => {
      if (tomb.includes(kartya[0].toLowerCase())) {
        kivalasztott_normal_kartyak_normal.push(kartya);
      }
    })
    let vezer_kartyak_betolt = resp[1];
    vezer_kartyak_betolt.map(kartya => {
      if (tomb.includes(kartya[0].toLowerCase())) {
        kivalasztott_normal_kartyak_vezer.push(kartya);
      }
    })
  });
}

function karakterek_megkapasa() {
  window.pywebview.api.karakterek_betoltese().then((resp)=>{
    let normal_kartyak_betolt = resp[0]; // nev, sebzes, eletero, elem, fej, torzs, lab, nem
    let vezer_kartyak_betolt = resp[1];
    let filterezett2 = [];
    normal_kartyak_betolt.map(kartya => {
      if (kivalasztott_normal_kartyak.includes(kartya[0].toLowerCase())) {
        filterezett2.push(kartya);
      }
    })
    let html = "";
    document.querySelector(".gyujtemenySelect").innerHTML = "";
    filterezett2.map(kartya => {
        html += `<option class="igazit" value="${kartya[0]}"><span>⚔️${kartya[1]}</span></span>${kartya[0]}</span><span>${kartya[2]}❤️</span></option>`
    });
    document.querySelector(".gyujtemenySelect").innerHTML = html;

    // document.querySelector(".ideirok").innerHTML = `${normal_kartyak_betolt[0]}`
  });
}

function kartya_krealas() {
  fire_loop_sound.pause()
  fire_loop_sound.currentTime = 0;
  legsIndex = 1;
  headIndex = 1;
  bodyIndex = 1;
  document.getElementById("headIndex").textContent = headIndex;
  document.getElementById("bodyIndex").textContent = bodyIndex;
  document.getElementById("legsIndex").textContent = legsIndex;
  document.getElementById("letrehozoName").value = "";
  document.getElementById("letrehozoSebzes").value = 2;
  document.getElementById("letrehozoEletero").value = 1;
  document.getElementById("elementSelect").value = "tuz";
  document.getElementById("gender").value = "male";
  document.querySelector(".sebzesBerak").innerHTML = "⚔️2";
  document.querySelector(".eleteroBerak").innerHTML = "1❤️";
  document.querySelector(".nevBerak2").innerHTML = "NÉV";
  document.querySelector(".elem-icon2").src = "tuz.png";
  document.querySelector(".kintiKartya2").classList.remove("viz")
  document.querySelector(".kintiKartya2").classList.remove("fold")
  document.querySelector(".kintiKartya2").classList.remove("levego")
  document.querySelector(".kintiKartya2").classList.add("tuzi")
  alma1 = 0
  alma2 = 0
  alma3 = 0
  setTimeout(() => {  drawCharacter2(0, 1, 1, 1, true, "characterCanvas3");}, 100);
  VilagkartyaScene.classList.add("nelatszon");
  document.querySelector(".karakterke").classList.remove("nelatszon");
}

function karakter_torles(nev, ind) {
  if (kivalasztott_normal_kartyak.includes(nev.toLowerCase())) {
    document.querySelector(".vilagkar").querySelectorAll(".torol" + ind)[0].classList.remove("kivalasztva");
    kivalasztott_normal_kartyak = kivalasztott_normal_kartyak.filter(item => item !== nev.toLowerCase());
    kartyaSzetvalaszto(kivalasztott_normal_kartyak);
    TorolCurrentKartya(nev.toLowerCase());
  }
  window.pywebview.api.karakter_torlese(nev).then(()=>{
    document.querySelector(".vilagkar").removeChild(document.querySelectorAll(".vilagkar .torol" + ind)[0]);
  });
}

function kartya_kivalasztas(nev, ind) {
  if (kivalasztott_normal_kartyak.includes(nev.toLowerCase())) {
    document.querySelector(".vilagkar").querySelectorAll(".torol" + ind)[0].classList.remove("kivalasztva");
    kivalasztott_normal_kartyak = kivalasztott_normal_kartyak.filter(item => item !== nev.toLowerCase());
    kartyaSzetvalaszto(kivalasztott_normal_kartyak);
    TorolCurrentKartya(nev.toLowerCase());
  }else {
    document.querySelector(".vilagkar").querySelectorAll(".torol" + ind)[0].classList.add("kivalasztva");
    kivalasztott_normal_kartyak.push(nev.toLowerCase());
    kartyaSzetvalaszto(kivalasztott_normal_kartyak);
  }
}

function VilagLetrehozas() {
  if (document.querySelector(".vilagnev").value.trim() === "") {
    document.querySelector(".hibaJelzo").style.display = "block";
    document.querySelector(".hibaJelzoSzoveg").innerHTML = "<h1>Adj meg egy nevet a világodnak!</h1>"
    return;
  }
  let knev = document.querySelector(".vilagnev").value;
  let tombocske = [];
  let sztr = "";
  let barack = []
  currentKazamatak.map(kazamata => {
    if(!barack.includes(kazamata.tipus)){barack.push(kazamata.tipus)}
    sztr = "";
    if (kazamata.tipus == "Egyszerű") {
      sztr = `egyszeru;${kazamata.nev};${kazamata.kartyak_value};${kazamata.jutalom_value}`
    }else if (kazamata.tipus == "Nagy") {
      sztr = `nagy;${kazamata.nev};${kazamata.kartyak_value};${kazamata.vezer_value}`
    }else {
      sztr = `kis;${kazamata.nev};${kazamata.kartyak_value};${kazamata.vezer_value};${kazamata.jutalom_value}`
    }
    tombocske.push(sztr);
  })
  if(barack.length < 3){
    document.querySelector(".hibaJelzo").style.display = "block";
    document.querySelector(".hibaJelzoSzoveg").innerHTML = "<h1>Minden kazamata tipusból kell legalább egy!!!! (-_-)</h1>"
    return;
  }
  let tombocske2 = currentgyujtemeny.map(elem => elem.nev);
  if(currentgyujtemeny.length == 0){
    document.querySelector(".hibaJelzo").style.display = "block";
    document.querySelector(".hibaJelzoSzoveg").innerHTML = "<h1>Legalább egy kártya kell a gyűjteményedbe!!!! (-_-)</h1>"
    return;
  }
  window.pywebview.api.vilag_kimentese(knev, kivalasztott_normal_kartyak_normal, kivalasztott_normal_kartyak_vezer, tombocske, tombocske2)
  document.querySelector(".hibaJelzo").style.display = "block";
  document.querySelector(".hibaJelzoSzoveg").innerHTML = "<h1>A világ létrehozva!!! \\(^-^)/</h1>"
  return;
}


function playSpriteAnimation(path, nem, fej, test, lab, futtasa, canvasNev,jatekosE,gif) {
    const file = path.split('/').pop();
    const parts = file.replace(".png", "").split("_");

    const maxPart = parts[0].split("x");
    animMaxRows = parseInt(maxPart[0]);   
    animMaxCols = parseInt(maxPart[1]);   

    const usedPart = parts[1].split("x");
    animRows = parseInt(usedPart[0]);     
    animCols = parseInt(usedPart[1]);     

    animTotalFrames = (animRows - 1) * animMaxCols + animCols;
    
    animImage = new Image();
    animImage.src = path;

    animImage.onload = () => {
        animFrameWidth  = animImage.width / animMaxCols;
        animFrameHeight = animImage.height / animMaxRows;
        
        animationFrame = 0;
        lastFrameTime = performance.now();

        // 🔥 CSAK MOST indulhat az animáció!
        animationActive = true;
        animationLoop(nem, fej, test, lab, futtasa, canvasNev,jatekosE,gif);
    };
}



// Animációs ciklus, hogy végigmenjünk az összes képkockán
const FRAME_TIME = 1000 / 40; // 40 FPS → 25 ms
// Az animációs ciklus frissítése
function animationLoop(nem, fej, test, lab, futtasa, canvasNev,jatekosE,gif) {
    if (!animationActive) return;

    const now = performance.now();

    // Ha elértük a megfelelő időt, növeljük a frame számot
    if (now - lastFrameTime >= FRAME_TIME) {
        animationFrame++;
        const proba = animTotalFrames * 0.85
        if (animationFrame >= proba  && gifMehetE){
          gifMehetE = false
            if (!jatekosE) {
              document.getElementById("kozep6").innerHTML += `<div class="gifContainer"><img class="tamadoGif shiftedBal" src="${gif}_gif.gif" alt="tamadoGif"></div>`;
            } else {
              document.getElementById("kozep1").innerHTML += `<div class="gifContainer"><img class="tamadoGif shiftedJobb" src="${gif}_gif.gif" alt="tamadoGif"></div>`;
            }
            
        }
        // Ellenőrizzük, hogy túl vagyunk-e az összes frame-en
        if (animationFrame >= animTotalFrames) {
           
            gifMehetE = true
            animationActive = false;
         
            animationFrame = 0; // Az animáció újraindítása
            drawCharacter2(nem, fej, test, lab, futtasa, canvasNev); // Karakter kirajzolása az utolsó frame után
             
             return;
        } else {
            drawCharacter2(nem, fej, test, lab, futtasa, canvasNev); // Egy új frame kirajzolása
        }

        lastFrameTime = now; // Frissítjük az időpontot
    }
    
    // A következő frame-t kérjük
    requestAnimationFrame(() => animationLoop(nem, fej, test, lab, futtasa, canvasNev,jatekosE,gif));
}