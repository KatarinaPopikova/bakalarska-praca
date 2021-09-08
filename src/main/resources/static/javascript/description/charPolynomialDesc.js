function makeDescription(data) {
    characteristicPolynomialDesc();
}


function characteristicPolynomialDesc() {
    let div = createAddClassId("div", "#description-eval", "char-polynom-div", "char-polynom description-content")
    let ul = createAddClassId("ul", div, "desc-ul", "char-polynom-ul")
    $(ul).append(
        `<li>λ je vlastné číslo práve vtedy, keď je koreňom charakteristického polynómu p<sub>A</sub>(λ).<img id="show-more-info-10" src="pictures/request.svg" alt="hint" width="25" draggable="false"> </li>
        
        <ul id="show-more-info-10-text" class="info-on-hover">
             <li>Nech A ∈ K<sup>n×n</sup>,  charakteristický polynóm matice A je p<sub>A</sub>(λ) = det(A − λI<sub>n</sub>). Stupeň polynómu je n a vedúci člen v p<sub>A</sub>(λ) je (−1)<sup>n</sup>λ<sup>n</sup></li>
        
        </ul>
       <li>Vyjadríme si ho pomocou determinantu</li>
    `);
    $(createAddId("div", div, "det-explain")).append(`
        <p class="explain-center"> p<sub>A</sub>(λ) = det(A - λI<sub>n</sub>)</p>
        <div class="more-description">
            <div class="detail-description">
                <div id="desc-polynomial">
                <p>Konštantou λ  prenásobíme jednotkovú maticu a odčítame ju od matice A. Z nej vypočítame determinant.</p>
                <div id="det-form-explain" class="explain-center"> 
                    <p>det(A - λI<sub>n</sub>) = </p>
                    <div id="det-kernel"></div>
                 </div>
                </div>
            </div>
            <div class="more-button" onclick="showDetailDescription(this.parentElement)">
                <img class="more-button-down" src="../../pictures/chevron-down.svg" width="25" height="25" alt="down">
                <img class="more-button-up" src="../../pictures/chevron-up.svg" width="25" height="25" alt="up">
            </div>
        </div>
        
        
`);


    makeMatrixDiv(getMatrixA(), "input-matrix-det", "input-matrix-det", "#det-kernel");
    $(createAppend("p", "#det-kernel")).text(" -λ");
    makeMatrixDiv(identityMatrix(), "identity-matrix-det", "identity-matrix-det", "#det-kernel");
    let ul2 = createAddClassId("ul", div, "desc-ul-2", "char-polynom-ul");
    $(ul2).append(
        `<li>V jednoduchosti: od diagonály odpočítame konštantu λ a vypočítame determinant.</li>
        <li id="add-polynomial">Ako výsledok vznikne charakteristický polynóm p<sub>A</sub>(λ) = ` + savePolynomial() + ` </li>
        <li>Častokrát je vhodné polynóm neupravovať, a teda neroznásobovať zátvorky (ak to nie je nutné). Korene sú potom ľahko čitateľné.</li>
        <li>Charakteristickým polynómom vždy nájdeme všetky vlastné čísla <img id="show-more-info-1" src="pictures/request.svg" alt="hint" width="25" draggable="false"> </li>
        
        <ul id="show-more-info-1-text" class="info-on-hover">
            <li>
                Keďže je stupňa n a pre maticu nxn hľadáme n vlastných čísel. V našom prípade sa n = ` + matrixLength() + ` (Platí pre komplexné čísla). 
            </li>
        </ul>
        
        <li>Vložíme ho do rovnosti s 0, aby sme zistili korene.
            <p class="explain-center">` + savePolynomial() + ` = 0  </p></li>
        <li id="eigenvalues-li" class="explain-center">Vlastné čísla:  ` + saveMatrixSpectrum() + `</li> 
        <li>n-tica vlastných čísel matice A sa nazýva spektrum matice A,  označuje sa σ(A).</li>   
        <li id="spectrum-li" class="explain-center">σ(A) = (` + saveMatrixSpectrum() + `)</li>   
        <li>Okrem toho, že môžu byť komplexné, niektoré sa môžu opakovať. Počet násobnosti vlastného čísla nazývame <b>algebraická násobnosť</b>.</li>      
        
    `);

    createOnHover("show-more-info-1");
    createOnHover("show-more-info-10");

}


//for description
function saveMatrixSpectrum() {
    let matrixSpetrum = $("#matrix-spetrum p").get(0).outerHTML;
    return matrixSpetrum.substring(matrixSpetrum.indexOf("=") + 2, matrixSpetrum.length - 5);
}

function savePolynomial() {
    let polynomial = $("#polynomial p").get(0).outerHTML;
    return polynomial.substring(polynomial.lastIndexOf("=") + 1, polynomial.length - 4);
}

function identityMatrix() {
    let n = ($('#row-col-count').get(0).innerText);
    let identity = new Array(n);
    for (let i = 0; i < n; i++) {
        identity[i] = new Array(n);
        for (let j = 0; j < n; j++) {
            (i === j) ? identity[i][j] = 1 : identity[i][j] = 0;
        }
    }
    return identity;
}