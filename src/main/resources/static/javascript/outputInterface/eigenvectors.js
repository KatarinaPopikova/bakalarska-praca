let eigenvectorsDiv = ("#eigenvectors");

function eigenvectorsPart(eigenvectors, realOrderInMap) {

    createEigevecDivs(eigenvectors, realOrderInMap);

}


function createEigevecDivs(evect, realOrderInMap) {
    let vecOrder = 1;


    for (let i = 0; i < evect.firstEigenvectors.length; i++) {

        makeEvecDiv(realOrderInMap, i);
        appendMatrixEvec(evect.matricesForEigenvector[i], evect.matricesForEigenvectorGEM[i], i);
        evecResultWithParameter(i, evect.eigenvectors[i], evect.firstEigenvectors[i].length);
        eigenvectorDescription(i, realOrderInMap[i], evect.firstEigenvectors[i].length);
        let an = ($("#an-" + i).get(0).innerText) * 1;
        let order = vecOrder;
        if (an === evect.firstEigenvectors[i].length || evect.firstEigenvectors[i].length === 1) {
            appendCalcEigenvector(evect.firstEigenvectors[i], i, order);
        }
        if (an !== evect.firstEigenvectors[i].length) {
            generalize(evect, evect.coeff[i], i, order);
        }
        vecOrder += an;
    }
}

function makeEvecDiv(realOrderInMap, i) {
    let h3 = createAddClass("h3", "#eigenvectors-" + (i + 1), "solution-h3");
    $(h3).html("(A − λI)v = <span id='parenthes-" + i + "'>(A " + coeffOfEval(realOrderInMap[i]) + "I)</span>v = 0");
    let div0 = createAddId("div", "#eigenvectors-" + (i + 1), "eigenvector-solution" + (i + 1));
    let div = createAddClassId("div", div0, "calculate-vectors-" + (i + 1), "eigenvectors");
    $("#article-vector-" + (i + 1)).show();
    $("#eigenvalue-" + (i + 1)).text(realOrderInMap[i]);
}

function generalize(evect, coeff, i, vecOrder) {
    $(createAddClass("h4", "#generalize-evec-" + (i + 1), "solution-h4")).text("Zovšeobecnené vlastné vektory");

    if (coeff.length === 1)
        easyGeneralize(evect, i, vecOrder);
    else
        hardGeneralize(evect, i, vecOrder);
}

function easyGeneralize(evect, eValOrder, vecOrder) {
    for (let i = 0; i < evect.beforeGen[eValOrder].length; i++) {
        let div0 = createAddClassId("div", "#generalize-evec-" + (eValOrder + 1), "generalize-div-" + eValOrder + "-" + i, "easy-generalize eigenvectors");
        let headDiv = createAddClass("div", div0, "head-gem");
        let h3 = createAddClass("h3", headDiv, "solution-h3");
        $(h3).html(makeHeadGen(eValOrder, vecOrder, i));
        let div = createAddClassId("div", headDiv, "#make-gen-gem-" + (eValOrder + 1) + "-" + i, "easy-gen-gem gem");

        genBeforeGEM(evect.beforeGen[eValOrder][i], eValOrder, div, i);
        $(createAddClass("div", div, "tilda")).html("~");
        genAfterGEM(evect.afterGen[eValOrder][i], eValOrder, div, i);
        easyGenVector(evect.blocksOfVectors[eValOrder][i + 1], eValOrder, vecOrder, i);
        vecOrder++;
    }
}

function makeHeadGen(eValOrder, vecOrder, i) {
    return $("#parenthes-" + eValOrder).text() + "z<sub>" + (vecOrder + 1) + "</sub> = " + ((i === 0) ? "v" : "z") + "<sub>" + (vecOrder) + "</sub> ";

}

function easyGenVector(vector, eValOrder, vecOrder, i) {
    let div = createAddClassId("div", "#generalize-div-" + eValOrder + "-" + i, "solve-evectors-" + eValOrder, "s-vectors");
    let subDiv = createAddClassId("div", div, "vector-div" + eValOrder + "-" + i, "first-vectors");
    $(createAddClass("p", subDiv, "vec-title")).html("z<sub>" + (vecOrder + 1) + "</sub>");
    makeMatrixDiv(vector, "vector vector-" + eValOrder + "-" + i, "vector-" + eValOrder + "-" + i, subDiv);

}


function genBeforeGEM(eVec, eValOrder, div, i) {
    let a = $("#matrix-minus-lambda-" + (eValOrder)).parent().clone().appendTo(div);
    $(a).children().first().attr("id", "generalize-" + eValOrder + "-" + i);
    for (let j = 0; j < eVec.length; j++) {
        let tr = $(a).children().first().children().eq(1).children().eq(j);
        $(createAppend("td", tr)).html("|");
        $(createAppend("td", tr)).html(eVec[j]);
    }
}

function genAfterGEM(eVec, eValOrder, div, i) {
    let a = $("#matrix-minus-lambda-GEM-" + (eValOrder)).parent().clone().appendTo(div);
    $(a).children().first().attr("id", "generalize-gem-" + eValOrder + "-" + i);
    for (let j = 0; j < eVec.length; j++) {
        let tr = $(a).children().first().children().eq(1).children().eq(j);
        $(createAppend("td", tr)).html("|");
        $(createAppend("td", tr)).html(eVec[j]);
    }
}

//             HARD


function makeHardHeadGen(eValOrder, vecOrder, i) {
    let index = ["x", "y", "z"];
    return "(A " + coeffOfEval(0) + "λI)" + "z<sub>" + index[i] + "</sub> = " + ((i === 0) ? "v" : "z<sub>" + index[i - 1] + "</sub>");
}

function hardGeneralize(evect, eValOrder, vecOrder) {

    for (let i = 0; i < evect.beforeGen[eValOrder].length; i++) {
        let div0 = createAddClassId("div", "#generalize-evec-" + (eValOrder + 1), "generalize-div-" + eValOrder + "-" + i, "hard-generalize eigenvectors");
        let headDiv = createAddClass("div", div0, "head-gem");
        let h3 = createAddClass("h3", headDiv, "solution-h3");
        $(h3).html(makeHardHeadGen(eValOrder, vecOrder, i));
        let div = createAddClassId("div", headDiv, "make-gen-gem-" + (eValOrder + 1) + "-" + i, "hard-gen-gem gem");
        let parameter = findParameter(i, evect.coeff[eValOrder], evect.cantGen[0].length);
        genMatrices(evect.beforeGen[eValOrder], evect.afterGen[eValOrder], eValOrder, i, parameter);
        if (evect.beforeGen[eValOrder].length === 1) {
            solutionWithOnlyOneGen(evect, eValOrder, i);
            vecOrder += $("#an-" + eValOrder).text();
        }
        if (i === 1)
            zx(evect, evect.beforeGen[eValOrder][i], parameter, eValOrder, i);
        if (i === 2 && evect.beforeGen[eValOrder].length === 3)
            gem3TimesVectors(evect, parameter, i, eValOrder);

    }
    return vecOrder;
}

function zx(evect, eVec, parameter, eValOrder, i) {
    let zx = Array();

    for (let j = 0; j < eVec.length; j++) {
        zx[j] = evecRowInParameter(j, eVec[j], eVec.length, parameter);
    }
    let subDiv = createAddClassId("div", "#generalize-div-" + eValOrder + "-0", "gene-second-result-div", "gen-result-div");
    $(createAddClass("p", subDiv, "vec-title")).html("Všeobecné <br> riešenie<br>  z<sub>x</sub>");
    makeMatrixDiv(zx, "", "zx", subDiv);

    if (evect.coeff[0][0].length === 3 && evect.coeff[0].length === 5)
        block1and1and3(evect, parameter, i, eValOrder);
    else if (evect.beforeGen[eValOrder].length === 3)
        gem3Times(evect, parameter, i, eValOrder);
    else
        secondGen(evect, parameter, i, eValOrder);
}

function gem3TimesVectors(evect, parameter, i, eValOrder) {
    let div0 = createAddClass("div", "#generalize-div-" + eValOrder + "-" + i, "exist-solute");
    $(createAppend("p", div0)).html("Reťazec zovšeobecnených vlastných vektorov");
    let divS = createAddClass("div", div0, "one-eval-div");

    let div1 = createAddClass("div", "#generalize-div-" + eValOrder + "-" + i, "not-exist-solute");
    makeCoeff(evect.coeff[eValOrder][3][0], parameter, i, eValOrder, divS)

    let div = createAppend("div", divS);
    $("#p-v-1-" + (eValOrder)).clone().appendTo(div);

    four(evect.cantGen, parameter, i, eValOrder, div1);
}

function gem3Times(evect, parameter, i, eValOrder) {
    let vector = Array();
    for (let j = 0; j < evect.beforeGen[0][2].length; j++) {
        vector[j] = evecRowInParameter(j, evect.beforeGen[0][2][j], evect.beforeGen[0][2].length, parameter);
    }
    let subDiv = createAddClassId("div", "#generalize-div-" + eValOrder + "-1", "zy-result-div", "gen-result-div");
    $(createAddClass("p", subDiv, "vec-title")).html("Všeobecné <br> riešenie<br>  z<sub>y</sub>");
    //makeCoeff(evect.coeff[eValOrder][3], parameter, i,eValOrder, subDiv )
    makeMatrixDiv(vector, "", "zy", subDiv);

}

function block1and1and3(evect, parameter, i, eValOrder) {
    let div0 = createAddClass("div", "#generalize-div-" + eValOrder + "-" + i, "exist-solute");
    $(createAppend("p", div0)).html("Reťazec zovšeobecnených vlastných vektorov");
    let divS = createAddClass("div", div0, "one-eval-div");

    let div1 = createAddClass("div", "#generalize-div-" + eValOrder + "-" + i, "not-exist-solute");
    makeCoeff(evect.coeff[eValOrder][4], parameter, i, eValOrder, divS)

    let div = createAppend("div", divS);
    $("#p-v-2-" + (eValOrder)).clone().appendTo(div);

    $(createAppend("p", div1)).html("Ďalšie lineárne nezávislé vlastné vektory zvolíme napríklad");
    let allEvalDiv = createAddClass("div", div1, "all-eval-div");

    for (let b = 0; b < 2; b++) {
        let oneEvalDiv = createAddClass("div", allEvalDiv, "one-eval-div");
        let a = [[0], [0], [0]];
        a[evect.cantGen[0][b]] = 1;
        makeCoeff(a, ["a", "b", "c"], 0, 0, oneEvalDiv);
        $("#p-v-" + (b) + "-" + (eValOrder)).clone().appendTo(oneEvalDiv);
    }

}

function secondGen(eVec, parameter, i, eValOrder) {
    let div0 = createAddClass("div", "#generalize-div-" + eValOrder + "-" + i, "exist-solute");
    $(createAppend("p", div0)).html("Reťazec zovšeobecnených vlastných vektorov");
    let divS = createAddClass("div", div0, "one-eval-div");

    let div1 = createAddClass("div", "#generalize-div-" + eValOrder + "-" + i, "not-exist-solute");
    if (eVec.coeff[eValOrder].length === 4) {
        makeCoeff(eVec.coeff[eValOrder][3], parameter, i, eValOrder, divS)
    }
    let div = createAppend("div", divS);
    $("#p-v-1-" + (eValOrder)).clone().appendTo(div);

    if (eVec.cantGen[0].length > 0 && eVec.coeff[eValOrder].length === 4 && eVec.coeff[eValOrder][0].length === 2 && eVec.afterGen[0].length !== 3) {
        four(eVec.cantGen[0], parameter, i, eValOrder, div1);
    }
    if (eVec.cantGen[0].length === 0)
        block2and3(div1, eVec.coeff[eValOrder][3]);
    // else if()
    // eval5block3();


}

function block2and3(div1, coeff) {
    let a = [[0], [0]];
    if (coeff[0] === 1)
        a[1] = 1;
    else
        a[0] = 1;
    $(createAppend("p", div1)).html("Ako druhý reťazec dĺžky 2 zvolíme napríklad");
    let allEvalDiv = createAddClass("div", div1, "all-eval-div");
    let oneEvalDiv = createAddClass("div", allEvalDiv, "one-eval-div");
    makeCoeff(a, ["a", "b"], 0, 0, oneEvalDiv);
    $("#p-v-" + 0 + "-" + 0).clone().appendTo(oneEvalDiv);

}

function four(cantGen, parameter, i, eValOrder, div1) {
    let a = [[0], [0]];
    a[cantGen] = 1;
    $(createAppend("p", div1)).html("Ako druhý lineárne nezávislý vlastný vektor zvolíme napríklad");
    let allEvalDiv = createAddClass("div", div1, "all-eval-div");
    let oneEvalDiv = createAddClass("div", allEvalDiv, "one-eval-div");
    makeCoeff(a, ["a", "b"], i, eValOrder, oneEvalDiv);
    $("#p-v-" + 0 + "-" + (eValOrder)).clone().appendTo(oneEvalDiv);
}

function findParameter(i, coeff, cantLength) {
    if (i === 0 || cantLength === 0)
        return parameterArray();
    if (coeff[0].length === 2) {
        return [[(coeff[2][0] === "0") ? "b" : "a"], ["c"], ["d"], ["e"], ["f"]];
    }
    let a;
    if (coeff[3][0] !== "0")
        a = "a";
    else if (coeff[3][1] !== "0")
        a = "b";
    else
        a = "c";
    return [["d"], ["e"], ["f"], [a], ["g"], ["h"], ["i"]];

}


function solutionWithOnlyOneGen(evect, eValOrder, i) {

    let div0 = createAddClass("div", "#generalize-div-" + eValOrder + "-" + i, "exist-solute");
    let div1 = createAddClass("div", "#generalize-div-" + eValOrder + "-" + i, "not-exist-solute");
    if ($("#an-" + eValOrder).text() - 1 === evect.coeff[eValOrder][0].length)
        oneGenEvec(evect, eValOrder, i, div0, div1);
    else
        twoGenEvec(evect, eValOrder, i, div0, div1);
}

function oneGenEvec(evect, eValOrder, i, div0, div1) {
    $(createAppend("p", div0)).html("Reťazec zovšeobecnených vlastných vektorov");
    makeCoeff(evect.coeff[eValOrder][evect.coeff[eValOrder][0].length], parameterArray().slice(0, evect.coeff[eValOrder][evect.coeff[eValOrder][0].length].length), i, eValOrder, div0);
    // $(createAppend("p", div0)).html("Potom reťazec zovšeobecnených vektorov vyzerá nasledovne" );
    $("#p-v-" + (evect.coeff[eValOrder][0].length - 1) + "-" + (eValOrder)).clone().appendTo("#solve-parameters-" + eValOrder + "-" + i);

    $(createAppend("p", div1)).html("Ďalšie lineárne nezávislé vlastné vektory zvolíme napríklad");
    let allEvalDiv = createAddClass("div", div1, "all-eval-div");
    for (let ev = 0; ev < evect.coeff[eValOrder][0].length - 1; ev++) {
        let oneEvalDiv = createAddClass("div", allEvalDiv, "one-eval-div");
        makeCoeff(evect.coeff[eValOrder][evect.cantGen[0][ev]], parameterArray().slice(0, evect.coeff[eValOrder][evect.coeff[eValOrder][0].length].length), i, eValOrder, oneEvalDiv);
        $("#p-v-" + ev + "-" + (eValOrder)).clone().appendTo(oneEvalDiv);
    }

}

function twoGenEvec(evect, eValOrder, i, div0, div1) {

    let an = $("#an-" + eValOrder).text() * 1;

    if ((an === 4 && evect.coeff[eValOrder][evect.coeff[eValOrder][0].length].length === 2) || (an === 5 && evect.coeff[eValOrder][evect.coeff[eValOrder][0].length].length === 3)) {
        $(createAppend("p", div0)).html("Reťazce zovšeobecnených vlastných vektorov <br> vyzerajú nasledovne");
        let genDiv = createAddClass("div", div0, "all-gen-eval-div");
        for (let gen = 2; gen > 0; gen--) {
            let genInDiv = createAddClass("div", genDiv, "two-gen-vec-div");
            makeCoeff(evect.coeff[eValOrder][evect.coeff[eValOrder].length - gen], parameterArray().slice(0, evect.coeff[eValOrder][evect.coeff[eValOrder].length - gen].length), i, eValOrder, genInDiv);
            $("#p-v-" + (evect.coeff[eValOrder][0].length - gen) + "-" + (eValOrder)).clone().appendTo(genInDiv);
        }
    }

    if (an === 5 && evect.coeff[eValOrder][evect.coeff[eValOrder][0].length].length === 3) {
        $(createAppend("p", div1)).html("Ako lineárne nezávislý vlastný vektor môže byť");
        let allEvalDiv = createAddClass("div", div1, "all-eval-div");
        let oneEvalDiv = createAddClass("div", allEvalDiv, "one-eval-div");
        makeCoeff(evect.coeff[eValOrder][evect.cantGen[0][0]], parameterArray().slice(0, evect.coeff[eValOrder][evect.coeff[eValOrder][0].length].length), i, eValOrder, oneEvalDiv);
        $("#p-v-" + 0 + "-" + (eValOrder)).clone().appendTo(oneEvalDiv);

    }
}

function makeCoeff(coeff, parameters, i, eValOrder, div0) {
    let div = createAddClassId("div", div0, "solve-parameters-" + eValOrder + "-" + i, "s-parameter-div");
    let subDiv = createAddClassId("div", div, "vector-div" + eValOrder + "-" + i, "s-parameters");
    for (let c = 0; c < coeff.length; c++) {
        $(createAddClass("p", subDiv, "parameter-equals")).html(parameters[c] + " = " + coeff[c]);

    }

}

function genMatrices(beforeGen, afterGen, eValOrder, i, parameter) {

    let div = createAddClassId("div", "#make-gen-gem-" + (eValOrder + 1) + "-" + i, "generalize-div-" + eValOrder + "-" + i, "hard-generalize gem");
    genBeforeHardGEM(beforeGen[i], eValOrder, div, i, parameter);
    $(createAddClass("div", div, "tilda")).html("~");
    genAfterHardGEM(afterGen[i], eValOrder, div, i, parameter);


}

function genBeforeHardGEM(eVec, eValOrder, div, i, parameter) {
    let a = $("#matrix-minus-lambda-" + (eValOrder)).parent().clone().appendTo(div);
    $(a).children().first().attr("id", "generalize-hard-" + eValOrder + "-" + i);
    for (let j = 0; j < eVec.length; j++) {
        let val = evecRowInParameter(j, eVec[j], eVec.length, parameter);

        let tr = $(a).children().first().children().eq(1).children().eq(j);
        $(createAppend("td", tr)).html("|");
        $(createAppend("td", tr)).html(val);
    }
}

function genAfterHardGEM(eVec, eValOrder, div, i, parameter) {
    let a = $("#matrix-minus-lambda-GEM-" + (eValOrder)).parent().clone().appendTo(div);
    $(a).children().first().attr("id", "generalize-gem-" + eValOrder + "-" + i);
    for (let j = 0; j < eVec.length; j++) {
        let val = evecRowInParameter(j, eVec[j], eVec.length, parameter);
        let tr = $(a).children().first().children().eq(1).children().eq(j);
        $(createAppend("td", tr)).html("|");
        $(createAppend("td", tr)).html(val);
    }
}


function evecRowInParameter(i, vector, firstVectorSize, parameter) {
    let parameterResult = "";
    for (let j = 0; j < vector.length; j++) {
        if (vector[j] !== "0") {
            if (vector[j] > 0 && parameterResult !== "") {
                parameterResult += " +";
            } else if (vector[j] === "-1")
                parameterResult += " -";
            else
                parameterResult += " ";
            if (vector[j] === "1" || vector[j] === "-1")
                parameterResult += parameter[j];
            else
                parameterResult += (vector[j] + parameter[j]);

        }
    }
    return (parameterResult === "") ? "0" : parameterResult;
}


//***********NA VYPOCET VLASTNYCH VEKTOROV MATICA (A-LAMBDA I)v = 0
function appendMatrixEvec(matricesForEigenvector, matricesForEigenvectorGEM, i) {


    let div = createAddClassId("div", "#calculate-vectors-" + (i + 1), "make-gem-" + (i + 1), "gem");
    makeMatrixDiv(matricesForEigenvector, "matrix-minus-lambda", "matrix-minus-lambda-" + i, div);
    $(createAddClass("div", div, "tilda")).html("~");
    makeMatrixDiv(matricesForEigenvectorGEM, "matrix-minus-lambda-GEM", "matrix-minus-lambda-GEM-" + i, div);

}

function coeffOfEval(lambda) {
    if (lambda === "1")
        return "- ";
    else if (lambda === "-1")
        return "+ ";
    else if (lambda === "0" || lambda === "-0")
        return "- 0";
    else if (parseFloat(lambda) > 0)
        return "- " + lambda;
    else
        return "+ " + lambda * (-1);
}

function evecResultWithParameter(order, kernel, firstVectorSize) {
    let div = createAppend("div", "#calculate-vectors-" + (order + 1));
    let table = createAddId("table", div, "result-evec-table");
    let generalVectorExpression = Array(kernel[0].length);

    for (let i = 0; i < kernel[0].length; i++) {
        let tr = createAppend("tr", table);
        $(createAppend("td", tr)).html("x<sub>" + i + "</sub>  =  ");
        generalVectorExpression[i] = evecInParameter(i, kernel, firstVectorSize);
        $(createAppend("td", tr)).html(generalVectorExpression[i]);

    }

    let result = createAddClassId("div", "#calculate-vectors-" + (order + 1), "gene-result-div-" + (order + 1), "gen-result-div");
    let subDiv = createAppend("div", result);
    $(createAddClass("p", subDiv, "vec-title")).html("Všeobecné <br> riešenie");
    makeMatrixDiv(generalVectorExpression, "", "general-vector-expression-" + order, result);
    if (($("#an-" + order).get(0).innerText) == firstVectorSize || firstVectorSize === 1) {
        $(result).css("display", "none");
    }
}

function evecInParameter(i, kernel, firstVectorSize) {
    let parameterResult = "";
    let parameter = parameterArray();
    for (let j = 0; j < firstVectorSize; j++) {
        if (kernel[j][i] !== "0") {
            if (kernel[j][i] > 0 && parameterResult !== "") {
                parameterResult += " +";
            } else if (kernel[j][i] === "-1")
                parameterResult += " -";
            else
                parameterResult += " ";
            if (kernel[j][i] === "1" || kernel[j][i] === "-1")
                parameterResult += parameter[j];
            else
                parameterResult += (kernel[j][i] + parameter[j]);

        }
    }
    return (parameterResult === "") ? "0" : parameterResult;
}


function appendCalcEigenvector(eigenvectors, index, vecOrder) {
    let div = createAddClassId("div", "#calculate-vectors-" + (index + 1), "solve-evectors-" + index, "s-vectors");
    for (let i = 0; i < eigenvectors.length; i++) {
        let subDiv = createAddClassId("div", div, "vector-div" + index + "-" + i, "first-vectors");
        $(createAddClass("p", subDiv, "vec-title")).html("v<sub>" + (vecOrder++) + "</sub>");
        makeMatrixDiv(eigenvectors[i], "vector vector-" + index, "vector-" + index + "-" + i, subDiv);
    }

}

