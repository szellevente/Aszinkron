/**
 * Recept lekérdezés async/await-tel
 * 
 * Ez a példa bemutatja, hogyan lehet aszinkron műveleteket
 * async/await szintaxissal kezelni.
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

// Async függvény: Recept lekérdezés async/await-tel
async function lekeres() {
  try {
    console.log('🚀 Recept lekérdezés elindítva...\n');
    
    // 1. lépés: Azonosítók lekérése
    // Az await megvárja, amíg a Promise fulfilled lesz
    const azonositok = await azonositokLekerese;
    console.log('📋 Recept azonosítók:', azonositok);
    
    // 2. lépés: Recept lekérése az azonosító alapján
    // A második indexű azonosítót használjuk (34)
    const recept = await receptLekeres(azonositok[2]);
    console.log('🍲 Recept részletei:', recept);
    
    // 3. lépés: Kategória alapján további receptek lekérése
    const levesek = await kategoriaLekeres(recept.kategoria);
    console.log('📚 További receptek a kategóriából:');
    levesek.forEach((leves, index) => {
      console.log(`   ${index + 1}. ${leves.cim}`);
    });
    
    console.log('\n✅ Minden lekérdezés sikeresen befejeződött!');
    
  } catch (error) {
    // Ha bármelyik Promise rejected lesz, ide fut a kód
    console.error('❌ Hiba történt:', error);
  }
}

// Az async függvény meghívása
lekeres();

console.log('⏳ A kód tovább fut, nem várja meg a Promise-okat...\n');
