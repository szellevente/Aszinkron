/**
 * Recept lekérdezés Promise-okkal
 * 
 * Ez a példa bemutatja, hogyan lehet aszinkron műveleteket
 * Promise-okkal és .then()/.catch() metódusokkal kezelni.
 */

// 1. Promise: Recept azonosítók lekérése a szerverről
const azonositokLekerese = new Promise((resolve, reject) => {
  setTimeout(() => {
    // 2 másodperc után "visszaérkezik" az adat
    const receptID = [676, 102, 34, 1089, 321];
    console.log('✅ Recept azonosítók megérkeztek:', receptID);
    resolve(receptID);
    
    // Ha hiba történne, akkor így:
    // reject("Nem sikerült lekérni az azonosítókat!");
  }, 2000);
});

// 2. Promise: Egy konkrét recept lekérése az azonosító alapján
const receptLekeres = (receptID) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 1,5 másodperc után "visszaérkezik" a recept
      const recept = {
        cim: 'Gulyás leves',
        kategoria: 'Levesek',
        id: receptID
      };
      console.log(`✅ Recept megérkezett: ${receptID} - ${recept.cim}`);
      resolve(recept);
      
      // Ha hiba történne, akkor így:
      // reject(`Nem található recept az azonosítóval: ${receptID}`);
    }, 1500);
  });
};

// 3. Promise: Kategória alapján további receptek lekérése
const kategoriaLekeres = (kategoria) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 1,5 másodperc után "visszaérkeznek" a további receptek
      const levesek = [
        { cim: 'Nyírségi gombócleves', kategoria: 'Levesek' },
        { cim: 'Borsóleves', kategoria: 'Levesek' },
        { cim: 'Húsleves', kategoria: 'Levesek' }
      ];
      console.log(`✅ Kategória alapján ${levesek.length} recept megérkezett a(z) "${kategoria}" kategóriából`);
      resolve(levesek);
      
      // Ha hiba történne, akkor így:
      // reject(`Nem található recept a(z) "${kategoria}" kategóriában`);
    }, 1500);
  });
};

// Promise-ok láncolása
console.log('🚀 Recept lekérdezés elindítva...\n');

azonositokLekerese
  .then((azonositok) => {
    // Az első Promise sikeresen lefutott, megkaptuk az azonosítókat
    console.log('📋 Recept azonosítók:', azonositok);
    
    // Visszaadjuk a következő Promise-t, hogy láncolhassuk
    // A második indexű azonosítót használjuk (34)
    return receptLekeres(azonositok[2]);
  })
  .then((recept) => {
    // A második Promise is sikeresen lefutott, megkaptuk a receptet
    console.log('🍲 Recept részletei:', recept);
    
    // Visszaadjuk a következő Promise-t a kategória alapján
    return kategoriaLekeres(recept.kategoria);
  })
  .then((levesek) => {
    // A harmadik Promise is sikeresen lefutott, megkaptuk a további recepteket
    console.log('📚 További receptek a kategóriából:');
    levesek.forEach((leves, index) => {
      console.log(`   ${index + 1}. ${leves.cim}`);
    });
    
    console.log('\n✅ Minden lekérdezés sikeresen befejeződött!');
  })
  .catch((hiba) => {
    // Ha bármelyik Promise rejected lesz, ide fut a kód
    console.error('❌ Hiba történt:', hiba);
  });

console.log('⏳ A kód tovább fut, nem várja meg a Promise-okat...\n');
