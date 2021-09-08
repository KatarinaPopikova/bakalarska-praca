function minimalPolynomial(kernelPol, trace){
    if(isBChecked())
        minimalPolynomialVectorB(kernelPol, trace);
    else
       minimalPolynomialMatrix(kernelPol, trace);
}

function minimalPolynomialMatrix(kernelPol, trace){
    let div = createAddClassId("div","#description-eval", "min-polynom-div" ,"min-polynom description-content")
    let ul = createAddClassId("ul",div,"desc-ul", "char-polynom-ul" )
    $(ul).append(
        `
        <li> &lambda; je vlastné číslo práve vtedy, keď je koreňom minimálneho polynómu m<sub>A</sub>(&lambda;).</li>
               <div class="more-description">
            <div class="detail-description">
                <ul>
                    <li>Je to najmenší nenulový polynóm, pre ktorý platí f(A) = 0<sup>n×n</sup><img id="show-more-info-min-1" src="pictures/request.svg" alt="hint" width="25" draggable="false"></li>
                    
                    <ul id="show-more-info-min-1-text" class="info-on-hover">
                        <li>Nech A ∈ K<sup>n×n</sup>, nenulový polynóm f(λ) najmenšieho stupňa, pre ktorý platí f(A) = 0<sup>n×n</sup>, 
                        sa nazýva minimálny polynóm matice A a označovať ho budeme m<sub>A</sub>(λ).</li>
                    </ul>
        
                    <li>Minimálny polynóm delí charakteristický m<sub>A</sub>(&lambda;)/p<sub>A</sub>(&lambda;).<img id="show-more-info-min-2" src="pictures/request.svg" alt="hint" width="25" draggable="false"></li>
                   
                    <ul id="show-more-info-min-2-text" class="info-on-hover">
                        <li>Ak A ∈ K<sup>n×n</sup>,0 = f(λ) ∈ P(K) a platí f(A) = 0<sup>n×n</sup>, tak m<sub>A</sub>(λ) je deliteľom f(λ)</li>
                    </ul>
                   
                    <li>Preto majú rovnaké korene, avšak v minimálnom polynóme môžu mať menšiu násobnosť.</li>
                </ul>
            </div>
            <div class="more-button" onclick="showDetailDescription(this.parentElement)">
                <img class="more-button-down" src="../../pictures/chevron-down.svg" width="25" height="25" alt="down">
                <img class="more-button-up" src="../../pictures/chevron-up.svg" width="25" height="25" alt="up">
            </div>
        </div>

        <li>Minimálny polynóm má tvar:
        <p class="explain-center"> m<sub>A</sub>(&lambda;) = a<sub>0</sub> + a<sub>1</sub>&lambda; +  a<sub>2</sub>&lambda; + ... + a<sub>n</sub>&lambda;   </p>
        </li>
        <li>Pre jeho nájdenie je potrebné nájsť také reálne koeficienty <b>` +coeffExponent()+ `</b> aby platilo: 
        <p class="explain-center"> a<sub>0</sub>I + a<sub>1</sub>A`+matrixACoeffExponent()+` = 0   </p>
        </li>
        
        
        `
    );

     let ul2 = createAddClassId("ul",div,"desc-ul-2", "char-polynom-ul" )
    $(ul2).append(`

        <li>Najprv si vypočítame I, A`+matrixAExponent()+` a zostrojíme maticu homogénnej sústavy lineárnych rovníc.<img id="show-more-info-min-3" src="pictures/request.svg" alt="hint" width="25" draggable="false"></li>
             
             <ul id="show-more-info-min-3-text" class="info-on-hover">
                <li>V jednoduchosti:</li>
                <li>V každej matici I, A`+matrixAExponent()+` si stĺpce vložíme pod seba. Potom nám vzniknú `
                +($('#row-col-count').get(0).innerText+1)+
                ` dlhé stĺpce.</li>
                <li>Do matice M ich vložíme vedľa seba v správnom poradí- teda od najnižšieho exponentu. </li>
             </ul>
        
        <li>Riešime homogénnu sústavu (táto aplikácia používa na riešenie Gaussovu-Jordanovu eliminačnú metódu).</li>
        <li>Parametre, ktoré vzniknú pri riešení určíme tak, aby polynóm bol skutočne minimálny. Parameter patriaci koeficientu s najnižším indexom si určíme ako 1, ostatné budú nulové.</li>
        <li>Pokiaľ riešením sústavy je  <b>(`+solutionMinPol(kernelPol)+`)<sup>T</sup> </b>, tak po určení parametrov koeficienty vyzerajú nasledovne  <b>a<sub>0</sub>-a<sub>`+$('#row-col-count').get(0).innerText+`</sub> = (`+ coeffMinPol(kernelPol)+`)<sup>T</sup> </b>. <img id="show-more-info-min-4" src="pictures/request.svg" alt="hint" width="25" draggable="false"></li>
             
             <ul id="show-more-info-min-4-text" class="info-on-hover">
                <li>Tip pre informatikov: na akom indexe sa nachádza koeficient, taký exponent zodpovedá lambde.</li>
             </ul>
             
        <li>Vznikne minimálny polynóm   <b>m<sub>A</sub>(&lambda;) =  `+ savePolynomial() +` </b></li>
        <li>Vložíme ho do rovnosti s 0, aby sme zistili korene.
            <p class="explain-center">`+ savePolynomial() +` = 0  </p></li>
            `+addLiTrace(trace)+`
        <li id="eigenvalues-li" class="explain-center">Vlastné čísla:  `+saveMatrixSpectrum()+`</li> 
        <li>n-tica vlastných čísel matice A sa nazýva spektrum matice A,  označuje sa σ(A).</li>   
        <li id="spectrum-li" class="explain-center">σ(A) = (`+saveMatrixSpectrum()+`)</li>   
        <li>Okrem toho, že môžu byť komplexné, niektoré sa môžu opakovať. Počet násobnosti vlastného čísla nazývame <b>algebraická násobnosť</b>.</li>      
     `
    );

    createOnHover("show-more-info-min-1");
    createOnHover("show-more-info-min-2");
    createOnHover("show-more-info-min-3");
    createOnHover("show-more-info-min-4");

}

function minimalPolynomialVectorB(kernelPol, trace){
    let div = createAddClassId("div","#description-eval", "min-polynom-div" ,"min-polynom description-content")
    let ul = createAddClassId("ul",div,"desc-ul", "char-polynom-ul" )
    $(ul).append(
        `
        <li> &lambda; je vlastné číslo práve vtedy, keď je koreňom minimálneho polynómu m<sub>A,b</sub>(&lambda;).</li>
               <div class="more-description">
            <div class="detail-description">
                <ul>
                    <li>Je to najmenší nenulový polynóm, pre ktorý platí f(A)b = 0<sup>n×n</sup><img id="show-more-info-min-1" src="pictures/request.svg" alt="hint" width="25" draggable="false"></li>
                    
                    <ul id="show-more-info-min-1-text" class="info-on-hover">
                        <li>Nech A ∈ K<sup>n×n</sup>, nenulový polynóm f(λ) najmenšieho stupňa, pre ktorý platí f(A)b = 0<sup>n×n</sup>, 
                        sa nazýva minimálny polynóm vektora b vzhľadom na maticu A a označovať ho budeme m<sub>Ab</sub>(λ).</li>
                    </ul>
        
                    <li>Minimálny polynóm vektora b delí charakteristický  a taktiež minimálny polynóm matice A.</li>
                     
                    <li>Preto majú rovnaké korene, avšak v minimálnom polynóme môžu mať menšiu násobnosť.</li>
                </ul>
            </div>
            <div class="more-button" onclick="showDetailDescription(this.parentElement)">
                <img class="more-button-down" src="../../pictures/chevron-down.svg" width="25" height="25" alt="down">
                <img class="more-button-up" src="../../pictures/chevron-up.svg" width="25" height="25" alt="up">
            </div>
        </div>

        <li>Minimálny polynóm má tvar:
        <p class="explain-center"> m<sub>A,b</sub>(&lambda;) = a<sub>0</sub> + a<sub>1</sub>&lambda; +  a<sub>2</sub>&lambda; + ... + a<sub>n</sub>&lambda;   </p>
        </li>
        <li>Pre jeho nájdenie je potrebné nájsť také reálne koeficienty <b>` +coeffExponent()+ `</b> aby platilo: 
        <p class="explain-center"> a<sub>0</sub>I + a<sub>1</sub>A`+matrixACoeffExponent()+` = 0   </p>
        </li>
        
        
        `
    );

    let ul2 = createAddClassId("ul",div,"desc-ul-2", "char-polynom-ul" )
    $(ul2).append(`

        <li>Najprv si vypočítame b, Ab`+vectorbExponent()+` a zostrojíme maticu homogénnej sústavy lineárnych rovníc. Vektory vložíme vedľa seba v správnom poradí- teda od najnižšieho exponentu matice A.</li>
                    
        <li>Riešime homogénnu sústavu (táto aplikácia používa na riešenie Gaussovu-Jordanovu eliminačnú metódu).</li>
        <li>Parametre, ktoré vzniknú pri riešení určíme tak, aby polynóm bol skutočne minimálny. Parameter patriaci koeficientu s najnižším indexom si určíme ako 1, ostatné budú nulové.</li>
        <li>Pokiaľ riešením sústavy je  <b>(`+solutionMinPol(kernelPol)+`)<sup>T</sup> </b>, tak po určení parametrov koeficienty vyzerajú nasledovne  <b>a<sub>0</sub>-a<sub>`+$('#row-col-count').get(0).innerText+`</sub> = (`+ coeffMinPol(kernelPol)+`)<sup>T</sup> </b>. <img id="show-more-info-min-4" src="pictures/request.svg" alt="hint" width="25" draggable="false"></li>
             
             <ul id="show-more-info-min-4-text" class="info-on-hover">
                <li>Tip pre informatikov: na akom indexe sa nachádza koeficient, taký exponent zodpovedá lambde.</li>
             </ul>
             
        <li>Vznikne minimálny polynóm   <b>m<sub>A</sub>(&lambda;) =  `+ savePolynomial() +` </b></li>
        <li>Vložíme ho do rovnosti s 0, aby sme zistili korene.
            <p class="explain-center">`+ savePolynomial() +` = 0  </p></li>
            `+addLiTrace(trace)+`
        <li id="eigenvalues-li" class="explain-center">Vlastné čísla:  `+saveMatrixSpectrum()+`</li> 
        <li>n-tica vlastných čísel matice A sa nazýva spektrum matice A,  označuje sa σ(A).</li>   
        <li id="spectrum-li" class="explain-center">σ(A) = (`+saveMatrixSpectrum()+`)</li>   
        <li>Okrem toho, že môžu byť komplexné, niektoré sa môžu opakovať. Počet násobnosti vlastného čísla nazývame <b>algebraická násobnosť</b>.</li>      
     `
    );

    createOnHover("show-more-info-min-1");
    createOnHover("show-more-info-min-4");

}

function addLiTrace(trace){
    if(trace !== null && trace !== "0"){
        return "<li>Posledné vlastné číslo doplníme vďaka vete, ktorá hovorí, že súčet prvkov na diagonále (stopa matice) je rovný súčtu vlastných čísel.</li>";
    }
    return  "";
}

function solutionMinPol(kernelPol){
    let sol = Array();

    for(let i = 0; i<kernelPol.length; i++) {
        sol[i] = evecRowInParameter(i, kernelPol[i], kernelPol.length, parameterArray());
    }
    return sol;
}


function coeffMinPol(kernelPol){
    let sol = Array();

    for(let i = 0; i<kernelPol.length; i++) {
        sol[i] =kernelPol[i][0];
    }
    return sol;
}

function coeffExponent(){
    let val = "";
    for(let i = 0; i <= ($('#row-col-count').get(0).innerText); i++)
        val+= "a<sub>" + i +"</sub>, " ;
    return val;
}

function matrixACoeffExponent(){
    let val = "";
    for(let i = 2; i <= ($('#row-col-count').get(0).innerText); i++)
        val+= " + a<sub>" + i +"</sub> A<sup>"+i+"</sup>" ;
    return val;
}

function matrixAExponent(){
    let val = "";
    for(let i = 2; i <= ($('#row-col-count').get(0).innerText); i++)
        val+= ", A<sup>"+i+"</sup>" ;
    return val;
}

function vectorbExponent(){
    let val = "";
    for(let i = 2; i <= ($('#row-col-count').get(0).innerText); i++)
        val+= ", A<sup>"+i+"</sup>b" ;
    return val;
}