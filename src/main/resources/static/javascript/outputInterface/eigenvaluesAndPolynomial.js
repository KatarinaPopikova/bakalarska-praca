let eigenvalueLeft = ("#eigenvalues-left");
let eigenvalueRight = ("#eigenvalues-right");

//****************DETERMINANT -CHARAKTERISTICKY POLYNOM****************
function showDeterminant(determinant) {
    $("#eigenvalues-left").addClass("determinant-div");
    let h3 = createAppend("h3", eigenvalueLeft);
    $(h3).addClass("solution-h3");
    $(h3).html("det(A-&lambda;I) = 0");
    let div = createAppend("div", eigenvalueLeft);
    $(div).attr("id", "determinant");
    let table = createAppend("table", div);
    for (let r = 0; r < determinant.length; r++) {
        let detRow = determinant[r];
        let tr = createAppend("tr", table);
        for (let d = 0; d < detRow.length; d++) {
            let val = createLambdaString(detRow[d], null);
            let td = createAppend("td", tr);
            $(td).html(val);
        }
    }
}

//**********************MATICE (VELA ..A, A^2, A^3...) PRE MINIMALNY POLYNOM***************
function matricesForMinPol(matrices) {
    let div = createAddId("div", "#minimal-matrices", "minimal-polynomial");
    for (let i = 0; i < matrices.length; i++) {
        let p = createAppend("p", div);
        $(p).html(titleValMinPol(i) + "=");
        makeMatrixDiv(matrices[i], "minimal matrices-for-min-pol", "matrix-min-pol" + i, div);
    }
}

//**********************MATIC (ZLOZENA Z ..A, A^2, A^3...) PRE MINIMALNY POLYNOM***************
function showMatrixForPolynomial(matrixForPolynomial) {
    let div = createAppend("div", eigenvalueLeft);
    $(div).attr("id", "result-eigenvalues");

    let div0 = createAddId("div", "#result-eigenvalues", "result-eigenvalues-matrix");

    let titleLikeMultiplicationVectors = aMultiplyB(matrixForPolynomial[0].length);
    $(div0).append(titleLikeMultiplicationVectors);

    makeMatrixDiv(matrixForPolynomial, "minimal", "matrix_polynomial", div0);
}

function showMatrixForPolynomialGEM(matrixForPolynomialGEM) {

    $(createAddClass("p", "#result-eigenvalues", "tilda")).text(" ~ ");
    let div = createAddId("div", "#result-eigenvalues", "gem-matrix");
    coeffTitleMinPol();
    $(makeMatrixDiv(matrixForPolynomialGEM, "minimal", "matrix-for-polynomial-GEM", div));


}

//TO NAD MATICOU PRE MIN POL
function aMultiplyB(length) {
    let table = createAddId("table", "#result-eigenvalues-matrix", "aMultiplyB");
    let tr = createAppend("tr", table);
    for (let d = 0; d < length; d++) {
        let td = createAppend("td", tr);
        $(td).html(titleValMinPol(d));
    }
    if (!isBChecked())
        $(table).css("font-size", "23px");
    return table;
}

function titleValMinPol(d) {

    let val = "A<sup>" + d + "</sup>";
    return isBChecked() ? val + "b" : val;
}

function coeffTitleMinPol() {
    let table = createAddId("table", "#gem-matrix", "coeff-title-min-pol");
    let tr = createAppend("tr", table);
    for (let i = 0; i <= $('#row-col-count').get(0).innerText; i++) {
        $(createAppend("td", tr)).html("a<sub>" + i + "</sub>");
    }

    return table;
}

function showResultMatrixForPolynomial(kernel, b) {
    resultMatrixPol(kernel, b);
    parameterSolve(kernel[0].length, b);

}

function resultMatrixPol(kernelPol, b) {
    let append = eigenvalueRight;
    if (b)
        append = eigenvalueLeft;
    let table = createAddId("table", append, "result-min-pol-table");


    for (let i = 0; i < kernelPol.length; i++) {
        let tr = createAppend("tr", table);
        $(createAppend("td", tr)).html("a<sub>" + i + "</sub>  = ");

        $(createAppend("td", tr)).html(makeParameterResult(kernelPol[i]));

    }


}

function makeParameterResult(result) {
    let parameterResult = "";
    let parameter = parameterArray();
    for (let j = 0; j < result.length; j++) {
        if (result[j] !== "0") {
            if (result[j] > 0 && parameterResult !== "") {
                parameterResult += " +";
            } else if (result[j] === "-1")
                parameterResult += " -";
            else
                parameterResult += " ";
            if (result[j] === "1" || result[j] === "-1")
                parameterResult += parameter[j];
            else
                parameterResult += (result[j] + parameter[j]);

        }
    }
    return (parameterResult === "") ? "0" : parameterResult;
}


function parameterSolve(countCoeff, b) {
    let append = eigenvalueRight;
    if (b)
        append = eigenvalueLeft;
    let div = createAddId("div", append, "pol-coeff-values");
    let parameter = parameterArray();
    for (let i = 0; i < countCoeff; i++) {
        let p = createAppend("p", div);
        if (i === 0) {
            $(p).text(parameter[i] + " = 1");
        } else
            $(p).text(parameter[i] + " = 0");
    }


}

function createLambdaString(detRow, coef) {  //coef=null (determinant), =0 (polynomial)
    let val = "";
    for (let lambda = 0; lambda < detRow.length; lambda++) {

        if (coef === null)
            val = createValue(val, detRow[lambda], lambda, (lambda > 0));
        else {
            val = createValue(val, detRow[lambda], coef, (coef < detRow.length - 1));
            coef--;
        }
    }

    return (val === "") ? val + "0" : val;
}

function createValue(val, add, i, notLast) {
    if (add !== "0") {
        if (parseFloat(add) > 0 && notLast)
            val += " +";
        else if (add === "-1" && i > 0)
            val += " -";
        else
            val += " ";
        if (i === 0 || (add !== "1" && add !== "-1"))
            val += add;
        if (i > 0)
            val += "λ";
        if (i > 1)
            val += "<sup>" + i + "</sup>";
    }
    return val;
}

//VSETKO AZ DOLE PRAVA STRANA EIGENVALUES

//polynomial without Parentheses
function showPolynomial(evalData, polynom, error) {
    let append = eigenvalueRight;
    if (polynom.includes(",b"))
        append = $("#eigenvalues-almost-end");
    let div = createAppend("div", append);
    $(div).attr("id", "polynomial");
    let p = createAppend("p", div);
    $(p).html(polynSolution(evalData, polynom, error));
}

function polynSolution(evalData, polynom, error) {
    let val = createPolynomial(evalData.polynomial, polynom);
    if (evalData.imaginaryRoots === null && error !== 3 && evalData.eigenvaluesFromPolynomial.length > 0) {
        let parentheses = polynParentheses(evalData.eigenvaluesFromPolynomial, evalData.polynomial[0]);
        if (val.substring(20) !== parentheses.substring(0, parentheses.length) && parentheses.length - 2 > 0)
            val += " = " + parentheses;
    }
    return val;
}

function createPolynomial(polynomial, polynom) {
    return polynom + createLambdaString(polynomial, polynomial.length - 1);
}

//polynomial with Parentheses (λ-3)(λ-2)
function polynParentheses(eigenvalues, firstConstant) {
    let parentheses = (firstConstant === "-1") ? "-" : "";
    let i = 0, exponent = 1;
    for (i; i < eigenvalues.length - 1; i++) {
        if (eigenvalues[i] === eigenvalues[i + 1])
            exponent++;
        else {
            parentheses += (makeParenthesis(exponent, eigenvalues[i]));
            exponent = 1;
        }
    }
    parentheses += makeParenthesis(exponent, eigenvalues[i]);

    return parentheses;
}

function makeParenthesis(exponent, eigenvalue) {
    let parenthesis = "";
    if (eigenvalue === "0")
        parenthesis += "λ";
    else if (parseFloat(eigenvalue) > 0) {
        parenthesis += "(λ -" + eigenvalue + ")";
    } else {
        eigenvalue = (eigenvalue.includes("-")) ? eigenvalue.substring(1) : "-" + eigenvalue;
        parenthesis += "(λ +" + eigenvalue + ")";
    }
    if (exponent > 1)
        parenthesis += "<sup>" + exponent + "</sup>"
    return parenthesis;
}


//**************EIGENVALUE -SPEKTRUM MATICE σ(A)=(...)*******************
function eigenvalue(evalData) {

    if (evalData.missedEigenvalue != null)
        traceA(evalData.trace, evalData.missedEigenvalue, evalData.evalLambdaSum);
    showEigenvalues(evalData);
    if (evalData.imaginaryRoots === null)
        algMultiplicity(evalData.eigenvaluesMap, evalData.eigenValFromMap);
}

function traceA(trace, missedEigenvalue, evalLambdaSum) {
    let append = eigenvalueRight;
    if ($("#polynomial").text().includes(",b"))
        append = $("#eigenvalues-almost-end");
    if (trace !== "0" || evalLambdaSum !== "0") {
        let div = createAppend("div", append);
        let p = createAppend("p", div);
        $(p).html(pTrace(trace, missedEigenvalue, evalLambdaSum));
    }
}

function pTrace(trace, missedEigenvalue, evalLambdaSum) {
    let val = "trace(A) = ∑aii = ∑λ  ->  ";
    return val + "" + trace + "-" + evalLambdaSum + "=" + missedEigenvalue;
}

function showEigenvalues(eigenvalues) {
    let append = eigenvalueRight;
    if ($("#polynomial").text().includes(",b"))
        append = $("#eigenvalues-almost-end");
    let div = createAddId("div", append, "matrix-spetrum");
    let p = createAppend("p", div);
    $(p).html(createEigenvalue(eigenvalues));
}

function createEigenvalue(eigenvalues) {
    let val = "σ(A)=(";
    eigenvalues.eigenvalues.forEach(value => val += value + ", ");
    if (eigenvalues.imaginaryRoots !== null)
        eigenvalues.imaginaryRoots.forEach(value => val += addImaginaryRoots(value));

    return val.substring(0, val.length - 2) + ")";
}

function addImaginaryRoots(value) {
    return value[0] + " " + ((value[1] > 0) ? "+ " + value[1] + "i, " : value[1] + "i, ");
}

function algMultiplicity(evalMap, realOrderInMap) {

    let div = createAddId("div", "#eigenvalues-end", "algebraic-multiplicity");
    let table = createAppend("table", div);
    let thead = createAppend("thead", table);
    let tr = createAppend("tr", thead);
    $(createAppend("th", tr)).html("Vlastné číslo");
    $(createAppend("th", tr)).html("Algebraická násobnosť");

    let tbody = createAppend("tbody", table);
    let order = 0;
    for (let eVal of realOrderInMap) {
        let tr = createAppend("tr", tbody);
        $(createAppend("th", tr)).html(eVal);
        let td = createAppend("td", tr);
        $(td).html(evalMap[eVal]);
        $(td).attr("id", "an-" + order++);

    }

}

