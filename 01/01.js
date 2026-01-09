console.log("Hello")
//1. **Időzített üzenetek**
 //  - Írj egy aszinkron függvényt, ami három különböző időzítéssel (1, 2, és 3 másodperc) ír ki egy-egy üzenetet a konzolra.
 async function időzitettüzenet() {
    setTimeout(() => {
        console.log("1 másodperc eltelt");
    },1000);

    setTimeout(() => {
        console.log("2 másodperc eltelt");
    },2000);

    setTimeout(() => {
        console.log("3 másodperc eltelt");
    },3000);
 }
 időzitettüzenet();

 function idozitettPromise(idő) {
    return new Promise((resolve)=> {
        setTimeout(() => {
            resolve(`Eltelt ${idő / 1000} másodperc`);
        }, idő)
    });
 }

 async function időzitettüzenet() {
    await idozitettPromise(1000);
    await idozitettPromise(2000);
    await idozitettPromise(3000);
    
    console.log("Minden időzzítés befejezödött")
 }