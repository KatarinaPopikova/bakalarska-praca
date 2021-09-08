function blockDiagonalDescription(blocks) {
    let blocksLength = Array();
    let generalize = false;
    for (let i = 0; i < blocks.length; i++) {
        blocksLength[i] = blocks[i].length;
        if (blocksLength[i] > 1)
            generalize = true;
    }
    if (generalize)
        notDiagonalDescription(blocksLength);
    else
        diagonalDescription();
}


function diagonalDescription() {
    $(createAddClassId("div", "#description-jordan-matrix", "jordan-form-spectrum-desc", "eval-desc description-content")).append(
        `
       <ul>
       <li>Ku každému vlastnému číslu zo spektra matice, sme našli jemu prislúchajúci vlastný vektor. </li>
       <li>Teda pri všetkých vlastných číslach sa geometrická násobnosť rovná aritmetickej.</li>
       <li>Preto rozklad matice A vytvoríme jednoducho. Najprv zostrojíme maticu prechodu P a Jordanovu maticu J.</li>
       
       
        
        <div class="more-description">
            <div class="detail-description">
                <ul>
                  <li>Vlastné vektory lineárneho operátora patriace k rôznym vlastným číslam sú lineárne nezávislé.</li>
                   <li>Teda existuje regulárna matica P, ku ktorej vieme nájsť jej inverznú maticu.</li>
                   <li>Pokiaľ máme dostatočné množstvo vlastných vektorov pre vytvorenie bázy, ktorá je schopná generovať celý priestor C<sup>` + matrixLength() + `</sup> ,
                    tak dokážeme skonštruovať maticu prechodu čisto z vlastných vektorov. Pri tejto matici sa to podarilo.</li>
                   <li>Vtedy je matica A diagonizovateľná, čo zmanená že je podobná diagonálnej matici J.<img id="show-more-info-2" src="pictures/request.svg" alt="hint" width="25" draggable="false"> </li>
        
                    <ul id="show-more-info-2-text" class="info-on-hover">
                         <li>Hodnoty Jordanovej matice mimo diagonály sú nulové.</li>
                         <li><b>Definícia</b> Matica A ∈ C<sup>n×n</sup> je diagonizovateľná práve vtedy, keď existuje báza priestoru C<sup>n×1</sup> pozostávajúca z vlastných vektorov matice A</li>
       
                    </ul>
                  
                </ul>
            </div>
            <div class="more-button" onclick="showDetailDescription(this.parentElement)">
                <img class="more-button-down" src="../../pictures/chevron-down.svg" width="25" height="25" alt="down">
                <img class="more-button-up" src="../../pictures/chevron-up.svg" width="25" height="25" alt="up">
            </div>
        </div>
       
       
       <li>Vlastné čísla postupne vložíme na diagonálu matice J. Poradie vloženia nie je definované, ale závisí od toho zostrojenie matice prechodu.</li>
       <li>Pokiaľ sme i-te vlastné číslo vložili do i-teho stĺpca matice J, tak vlastný vektor prislúchajúci tomuto vlastnému číslu tiež vložíme do i-teho stĺpca matice P.</li>
       <li>Potom už len dopočítame inverznú maticu P<sup>−1</sup>, pre úplnosť rozkladu. </li>
       <li>V Jordanovej matici sú orámované hodnoty. To sú znázornené Jordanove bloky, ktoré je možné zapísať aj v jednoduchšej forme (čo je znázornené). </li>
       <li>Jordanov blok označujeme J<sub>k</sub>(λ), kde k = veľkosť bloku a λ = vlastné číslo, ktorému blok zodpovedá.<img id="show-more-info-3" src="pictures/request.svg" alt="hint" width="25" draggable="false"> </li>
        
        <ul id="show-more-info-3-text" class="info-on-hover">
            <li>
                <div>
                   <p><b>Definícia</b> Matica J<sub>k</sub>(λ) ∈ K<sup>k×k</sup> sa nazýva Jordanov blok s vlastným číslom λ, ak je maticou lineárneho operátora (matice) A vzhľadom na bázu,
                    ktorá je reťazcom zovšeobecnených vlastných vektorov matice </p>
                    <p>A: β = \{b<sub>1</sub>,b<sub>2</sub>,...,b<sub>k</sub>\}, (A − λI)b<sub>1</sub> = b<sub>2</sub>, (A − λI)b<sub>2</sub> = b<sub>3</sub>,...,(A − λI)b<sub>k</sub>= 0<sup>n×1</sup></p>
                   
                 </div>
            </li>
        </ul>
       
       <li>V tomto prípade je Jordanov tvar matice zložený z Jordanovych blokov dĺžky 1.<img id="show-more-info-4" src="pictures/request.svg" alt="hint" width="25" draggable="false"> </li>
        
        <ul id="show-more-info-4-text" class="info-on-hover">
            <li>
                <div>
                    <p><b>Definícia</b> Hovoríme, že matica J je v Jordanovom tvare, ak je blokovo diagonálna a jej diagonálne bloky sú Jordanove patriace k vlastným číslam matice A<sup>n×n</sup>.</p>
                    <img id="jordan-form-img" src="pictures/jordan-form.png" alt="jordan form" width="800px" draggable="false">
                    
                    </div>
            </li>
        </ul>

        

       
       
</ul>
        
        `
    )

    createOnHover("show-more-info-2");
    createOnHover("show-more-info-3");
    createOnHover("show-more-info-4");
}


function notDiagonalDescription(blocksLength) {
    $(createAddClassId("div", "#description-jordan-matrix", "jordan-form-spectrum-desc", "eval-desc description-content")).append(
        `
       <ul>
       <li>Nie ku každému vlastnému číslu zo spektra matice, sme našli jemu prislúchajúci vlastný vektor. Preto na vytvorenie bázy bolo potrebné nájsť zovšeobecnené vlastné vektory.  </li>
       <li>Teda nie pri všetkých vlastných číslach sa geometrická násobnosť rovná aritmetickej.</li>
       
       
        
        <div class="more-description">
            <div class="detail-description">
                <ul>
                  <li>Vlastné vektory lineárneho operátora patriace k rôznym vlastným číslam sú lineárne nezávislé.</li>
                   <li>Teda existuje regulárna matica P, ku ktorej vieme nájsť jej inverznú maticu.</li>
                   <li>Pokiaľ máme dostatočné množstvo vlastných vektorov pre vytvorenie bázy, ktorá je schopná generovať celý priestor C<sup>` + matrixLength() + `</sup> ,
                    tak dokážeme skonštruovať maticu prechodu čisto z vlastných vektorov. Pri tejto matici sa to nepodarilo. Preto matica prechodu bude doplnená o zovšeobecnené vlastné vektory.</li>                 
                </ul>
            </div>
            <div class="more-button" onclick="showDetailDescription(this.parentElement)">
                <img class="more-button-down" src="../../pictures/chevron-down.svg" width="25" height="25" alt="down">
                <img class="more-button-up" src="../../pictures/chevron-up.svg" width="25" height="25" alt="up">
            </div>
        </div>
       
       
       <li>Reťazce zovšeobecnených vlastných vektorov postupne vložíme do matice P, ako je znázornené.</li>
       <li class="part-of-down">Prvky, ktoré tvoria reťazec zovšeobecnených vlastných vektorov, sa v matici prechodu nachádzajú vedľa seba, pričom posledný prvok v reťazci je vlastný vektor. </li>
       <li class="part-of-up">Prvky, ktoré tvoria reťazec zovšeobecnených vlastných vektorov, sa v matici prechodu nachádzajú vedľa seba, pričom prvý prvok v reťazci je vlastný vektor. </li>
       <li class="part-of-down">Pokiaľ sme na i-ty stĺpec vložili zovšeobecnený vlastný vektor, jemu prislúchajúce vlastné číslo vložíme do i-teho stĺpca matice J na diagoonálu a pod diagonálu vložíme hodnotu 1.</li>
       <li class="part-of-up">Pokiaľ sme na i-ty stĺpec vložili zovšeobecnený vlastný vektor, jemu prislúchajúce vlastné číslo vložíme do i-teho stĺpca matice J na diagoonálu a nad diagonálu vložíme hodnotu 1.</li>
       <li class="part-of-down">Pri vkladaní vlastného vektora do matice prechodu sa už v matici J v danom stĺpci hodnota 1 pod diagonálu nevkladá.</li>
       <li class="part-of-up">Pri vkladaní vlastného vektora do matice prechodu sa už v matici J v danom stĺpci hodnota 1 nad diagonálu nevkladá.</li>
       <li>Potom už len dopočítame inverznú maticu P<sup>−1</sup>, pre úplnosť rozkladu. </li>
       <li>V Jordanovej matici sú orámované hodnoty. To sú znázornené Jordanove bloky, ktoré je možné zapísať aj v jednoduchšej forme (čo je znázornené). </li>
       <li>Jordanov blok označujeme J<sub>k</sub>(λ), kde k = veľkosť bloku a λ = vlastné číslo, ktorému blok zodpovedá.<img id="show-more-info-3" src="pictures/request.svg" alt="hint" width="25" draggable="false"> </li>
        
        <ul id="show-more-info-3-text" class="info-on-hover">
            <li>
                <div>
                   <p><b>Definícia</b> Matica J<sub>k</sub>(λ) ∈ K<sup>k×k</sup> sa nazýva Jordanov blok s vlastným číslom λ, ak je maticou lineárneho operátora (matice) A vzhľadom na bázu,
                    ktorá je reťazcom zovšeobecnených vlastných vektorov matice </p>
                    <p>A: β = \{b<sub>1</sub>,b<sub>2</sub>,...,b<sub>k</sub>\}, (A − λI)b<sub>1</sub> = b<sub>2</sub>, (A − λI)b<sub>2</sub> = b<sub>3</sub>,...,(A − λI)b<sub>k</sub>= 0<sup>n×1</sup></p>
                   
                 </div>
            </li>
        </ul>
       
       <li>V tomto prípade je Jordanov tvar matice zložený z Jordanovych blokov dĺžky ` + blocksLength + ` .<img id="show-more-info-4" src="pictures/request.svg" alt="hint" width="25" draggable="false"> </li>
        
        <ul id="show-more-info-4-text" class="info-on-hover">
            <li>
                <div>
                    <p><b>Definícia</b> Hovoríme, že matica J je v Jordanovom tvare, ak je blokovo diagonálna a jej diagonálne bloky sú Jordanove patriace k vlastným číslam matice A<sup>n×n</sup>.</p>
                    <img id="jordan-form-img" src="pictures/jordan-form.png" alt="jordan form" width="800px" draggable="false">
                    
                    </div>
            </li>
        </ul>

        

       
       
</ul>
        
        `
    )

    createOnHover("show-more-info-2");
    createOnHover("show-more-info-3");
    createOnHover("show-more-info-4");
}


function linearOperator() {
    $(createAddClassId("div", "#linear-operator", "linear-description", "description-content")).append(
        `
        <ul>
        <li><b>Matica lineárneho operátora</b> je lineárne zobrazenie medzi dvoma konečnými lineárnymi priestormi.</li>

        <div class="more-description">
            <div class="detail-description">
                <ul>
                    <li>Označuje sa [T]<sub>βα</sub>.</li> 
                    <li>Závisí od voľby dvoch báz, a to β pre lineárny priestor (L, +,·) a α pre lineárny priestor (M, +,·). </li>
                    <li>Vyjadruje zobrazenie T:L→M.</li>
                    <li>Keď vynásobíme maticu [T]<sub>βα</sub> vektorom vyjadreným pomocou počiatočnej bázy β , získame súradnice vektora vzhľadom na konečnú bázu α.</li>
                </ul>
            </div>
            <div class="more-button" onclick="showDetailDescription(this.parentElement)">
                <img class="more-button-down" src="../../pictures/chevron-down.svg" width="25" height="25" alt="down">
                <img class="more-button-up" src="../../pictures/chevron-up.svg" width="25" height="25" alt="up">
            </div>
        </div>
        
        
    
        <li>Pri štvorcových maticiach sa lineárne priestory rovnajú L = M. Preto štvorcová matica A vyjadruje zobrazenie T: C<sup>` + matrixLength() + `</sup> → C<sup>` + matrixLength() + `</sup>.</li>
        <li>Úlohou, ktorá sa nazýva spektrálny rozklad operátora T v C<sup>n</sup>, je nájsť bázu β, pri ktorej je matica operátora najjednoduchšia.</li>
        <li>V tomto postupe matica A predstavuje maticu lineárneho operátora v štandardnej báze ([T]εε = [T]ε).</li>
        </ul>
         <div class="more-description">
            <div class="detail-description">
                <div id="standard-base">
                    <p>Štandardná báza ε lineárneho priestoru C<sup>` + matrixLength() + `</sup> pozostáva z prvkov:</p>
                </div>
            </div>
            <div class="more-button" onclick="showDetailDescription(this.parentElement)">
                <img class="more-button-down" src="../../pictures/chevron-down.svg" width="25" height="25" alt="down">
                <img class="more-button-up" src="../../pictures/chevron-up.svg" width="25" height="25" alt="up">
            </div>
        </div>
        
        <ul>
        <li>Matica J predstavuje to isté zobrazenie ako matica A. Jedná sa o tú istú maticu lineárneho operátora, akurát v báze β ([T]ββ = [T]β).</li>
        <li>Matica prechodu predstavuje identické zobrazenie. Vďaka nej sa ľahko prechádza z jednej bázy do druhej, bez zmeny postavenia vektora v lineárnom priestore. </li>
        <li>Čo sa mení sú súradnice tohto vektora.</li>
        <li>Matica P (= [I]<sub>βε</sub>) vykonáva prechod z bázy β do bázy ε. Inverzná matica P<sup>−1</sup> sa stará presne o opačný prechod.</li>
        </ul>
        
        
         <div class="more-description">
            <div class="detail-description">
                <div id="other-base">
                  <p>Báza β lineárneho priestoru C<sup>` + matrixLength() + `</sup> bude tvoriť stĺpce matice P. Preto pozostáva z prvkov:</p>
                </div>
            </div>
            <div class="more-button" onclick="showDetailDescription(this.parentElement)">
                <img class="more-button-down" src="../../pictures/chevron-down.svg" width="25" height="25" alt="down">
                <img class="more-button-up" src="../../pictures/chevron-up.svg" width="25" height="25" alt="up">
            </div>
        </div>
        
        <ul>  
    
        <li>Ak platí rovnica A = PJP<sup>−1</sup>, tak hovoríme, že matice A a J sú podobné.</li>
        <li>Potom majú rovnaký minimálny, charakteristický polynóm, hodnosť, determinant, stopu, spektrum matice, teda aj vlastné čísla a mnoho ďalších vlastností.</li>
        <li>Je to z toho dôvodu, že tieto vlastnosti sa zmenou bázy menenia. </li>  
  
        </ul>
         <div class="more-description">
            <div class="detail-description">
                <ul>
                    <li>Rozklad A = PJP<sup>−1</sup> môžeme zapísať aj ako [T]<sub>ε</sub> = [I]<sub>βε</sub> [T]<sub>β</sub> [I]<sub>εβ</sub>.  </li>
                    <li>Matica prechodu P<sup>−1</sup> prevedie vektory zo štandardnej bázy do bázy β. </li>
                    <li>Jordanova matica J zobrazí vektory v báze β. </li>
                    <li>Matica prechodu P vektor z bázy β opäť prevedie do štandardnej bázy.</li>
                    <li>C<sup>` + matrixLength() + `</sup><sub>ε</sub>→C<sup>` + matrixLength() + `</sup><sub>β</sub>→C<sup>` + matrixLength() + `</sup><sub>β</sub>→C<sup>` + matrixLength() + `</sup><sub>ε</sub>.</li>
                 </ul>
            </div>
            <div class="more-button" onclick="showDetailDescription(this.parentElement)">
                <img class="more-button-down" src="../../pictures/chevron-down.svg" width="25" height="25" alt="down">
                <img class="more-button-up" src="../../pictures/chevron-up.svg" width="25" height="25" alt="up">
            </div>
        </div>
        

        `
    )
    standardBase();
    otherBase();

}

function standardBase() {
    let div = createAppend("div", "#standard-base");
    for (let i = 0; i < matrixLength(); i++) {
        let base = createAddClass("div", div, "standard-base");
        let val = "e<sub>" + i + "</sub> = (";
        for (let j = 0; j < matrixLength(); j++) {
            if (i === j)
                val += "1, ";
            else
                val += "0, ";
        }
        $(createAddClassId("p", base, "standard-base-vector-" + i, "standard-base-vector")).html(val.substring(0, val.length - 2) + ')<sup>T</sup>');

    }
}

function otherBase() {
    let div = createAppend("div", "#other-base");
    let val = "β = {";
    for (let i = 0; i < matrixLength(); i++) {
        val += "P<sub>*" + (i + 1) + "</sub>, ";
    }
    $(createAddId("p", div, "other-base-vector")).html(val.substring(0, val.length - 2) + '}');

}
