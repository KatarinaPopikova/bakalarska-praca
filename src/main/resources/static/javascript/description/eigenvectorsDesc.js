function eigenvectorDescription(i, lambda, gn) {
    $(createAddClassId("div", "#description-evec-" + (i + 1), "evec-description-" + i, "evec-desc description-content")).append(
        `
        <ul>
            <li>Do rovnice Ax = λx, upravenej do tvaru (A − λI)x = 0<sup>n×1</sup>, dosadíme vlastné číslo λ = ` + lambda + ` .</li>
            <li>Riešime homogénnu sústavu lineárnych rovníc.</li>
            <li>Úlohou vlastných vektorov je tvoriť bázu lineárneho priestoru, aby sme pomocou nich dokázali skonštruovať maticu prechodu P.</li>
            <li>Vieme nájsť toľko lineárne nezávislých vlastných vektorov, aké je jadro matice (A − λI). Tento počet sa nazýva aj <b>geometrická násobnosť</b> vlastného čísla.</li>
            <li>Všetky ostatné vlastné vektory tohto vlastného čísla sú jeho lineárnou kombináciou.<img id="show-more-info-11-` + i + `" src="pictures/request.svg" alt="hint" width="25" draggable="false"> </li>
        
            <ul id="show-more-info-11-` + i + `-text" class="info-on-hover">
                <li>Riešenie sa môže s Vašim výpočtom líšiť. Avšak viac ako ` + gn + gnFormula(gn) + ` sa pre túto maticu nájsť nedá.</li>
            </ul>
            <li>Všeobecné riešenie:</li>
            <div id="solution-gen-vec-ex-` + i + `" class="center-matrix"></div>
            ` + isNeedGen(gn, lambda, i) + `
            
        </ul>
        
        `
    )
    let a = $("#general-vector-expression-" + i).parent().clone().appendTo("#solution-gen-vec-ex-" + i);
    a.css("display", "block");

    createOnHover("show-more-info-11-" + i);


}

function isNeedGen(gn, lambda, i) {
    let an = $("#an-" + i).get(0).innerText;
    if (an == gn)
        return `<li>Vlastné číslo λ = ` + lambda + ` má algebraickú násobnosť ` + an + ` a našli sme ` + gn + gnFormula(gn) + `, teda geometrická násobnosť sa rovná algebraickej.</li>`;
    else
        return `<li>Vlastné číslo λ = ` + lambda + ` má algebraickú násobnosť ` + an + ` a našli sme ` + gn + gnFormula(gn) + `, teda geometrická násobnosť sa nerovná algebraickej a preto je potrebné hľadať zovšeobecnené vlastné vektory.</li>`;
}

function gnFormula(gn) {
    if (gn === 1)
        return " lineárne nezávislý vlastný vektor ";
    else if (gn === 5)
        return " lineárne nezávislých vlastných vektorov ";
    else
        return " lineárne nezávislé vlastné vektory ";
}

