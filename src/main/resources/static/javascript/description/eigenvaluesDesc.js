function eigenvalueDescription() {
    $(createAddClassId("div", "#eval-evec-description", "eval-evec-desc", "description-content")).append(
        `
        <ul>
        <li><b>Vlastnými vektormi</b> označujeme tie nenulové vektory, ktoré po lineárnej transformácii (zobrazení) nezmenia smer. </li>
        <li>Môžu však zmeniť veľkosť (predĺžiť/skrátiť) a tá sa zmení na násobok skalárnou hodnotou λ.<img id="show-more-info-5" src="pictures/request.svg" alt="hint" width="25" draggable="false"> </li>
        
        <ul id="show-more-info-5-text" class="info-on-hover">
            <li>Veľkosť vlastného vektora po transformácii, zodpovedá veľkosti pred transformáciou prenásobenej hodnotou vlastného čísla λ.</li> 
        </ul>
        
        <li>Skalár sa nazýva <b>vlastné číslo</b> tejto lineárnej transformácie.</li>
        <li>V prípade zápornej hodnoty skaláru sa smer vektora preklopí na opačný.<img id="show-more-info-6" src="pictures/request.svg" alt="hint" width="25" draggable="false"> </li>
        
        <ul id="show-more-info-6-text" class="info-on-hover">
            <li>
                <div id="definition-eval"><b>Definícia</b> Nech (L, +,·) je lineárny priestor nad poľom K. Nenulový vektor x ∈ L sa nazýva vlastný vektor lineárneho operátora T:L→L,
                        ak ∃λ ∈ K, pre ktoré Tx = λx. Číslo λ sa nazýva vlastné číslo operátora T.</div>
            </li>
        </ul>
        
        
        <div class="more-description">
            <div class="detail-description">
                <ul>
                  <li>Vektor x sa nazýva vlastný vektor matice A patriaci k vlastnému číslu λ, keď platí:</li>
                        <div id="adjustment-equation">
                        <p>Ax = λx</p>
                        <p>Ax = λI<sub>n</sub>x</p>
                        <p>Ax−λI <sub>n</sub>x= 0<sup>n×1</sup></p>
                        <p>(A−λI<sub>n</sub>)x= 0<sup>n×1</sup></p>
                        <p><img id="show-more-info-7" src="pictures/request.svg" alt="hint" width="25" draggable="false"></p>
                        <ul id="show-more-info-7-text" class="info-on-hover">
                            <li>
                             <p>Výraz upravíme tak, že skalár rozšírime o jednotkovú maticu I<sub>n</sub> ∈ K<sup>n×n</sup>, aby vlastné číslo bolo možné po úprave odčítať od matice A.</p>
                            </li>
                        </ul>
                        </div>
                  
                </ul>
            </div>
            <div class="more-button" onclick="showDetailDescription(this.parentElement)">
                <img class="more-button-down" src="../../pictures/chevron-down.svg" width="25" height="25" alt="down">
                <img class="more-button-up" src="../../pictures/chevron-up.svg" width="25" height="25" alt="up">
            </div>
        </div>
        
        
         
       
        <li>Keďže vlastný vektor x musí byť nenulový, tak výraz <b>Ax = λx</b> si je vhodnejšie upraviť na <b>(A−λI<sub>n</sub>)x= 0<sup>n×1</sup></b>.<img id="show-more-info-8" src="pictures/request.svg" alt="hint" width="25" draggable="false"> </li>
        
        <ul id="show-more-info-8-text" class="info-on-hover">
            <li>Vlastné číslo môže byť nulové, vlastný vektor nie!</li>
        </ul>
        
        <li>Teda riešenie nájdeme v tom prípade, ak hodnosť matice (A − λI<sub>n</sub>) je menšia ako n.</li>
        <li>Čiže vektory tvoriace túto maticu sú lineárne závislé, a teda hľadáme také vlastné čísla, aby determinant (A − λI<sub>n</sub>) bol nulový.</li>
        <li>Výsledok determinantu je charakteristická rovnica</li>
        <li><b>Cayley-Hamiltonova veta</b> hovorí o tom, že matica anuluje svoj vlastný charakteristický polynóm, a teda je koreňom tohto polynómu.<img id="show-more-info-9" src="pictures/request.svg" alt="hint" width="25" draggable="false"> </li>

        <ul id="show-more-info-9-text" class="info-on-hover">
            <li><b>Cayley-Hamiltonova veta:</b> Ak p<sub>A</sub>(λ) je charakteristický polynóm matice A, tak p<sub>A</sub>(A) = 0n×n</li>
        </ul>
        
</ul>

        `
    );

    createOnHover("show-more-info-5");
    createOnHover("show-more-info-6");
    createOnHover("show-more-info-7");
    createOnHover("show-more-info-8");
    createOnHover("show-more-info-9");
}