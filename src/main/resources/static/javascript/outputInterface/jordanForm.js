function jordan(data) {
    let pArray = jordanFormMatrixx(data.evecCalc.blocksOfVectors, data.evalCalculation.eigenvaluesMap, data.evalCalculation.eigenValFromMap);
    transitionMatrix(data.jordanForm.matrixP, "part-of-down", pArray[0]);
    transitionMatrix(data.jordanForm.matrixPUp, "part-of-up", pArray[1]);
    jordanMatrix(data.evecCalc.blocksOfVectors, data.evalCalculation.eigenvaluesMap, data.evalCalculation.eigenValFromMap, data.jordanForm.matrixJ.length);

}

function jordanFormMatrixx(evectorsblocks, eigenvaluesMap, realOrderInMap) {
    return blockPart(evectorsblocks, eigenvaluesMap, realOrderInMap);
}

function blockPart(evectorsblocks, eigenvaluesMap, realOrderInMap) {
    let transition = createAddClassId("div", ("#jordan-matrix"), "make-transition", "f-r-c");

    let pArray = Array();
    let subArray = Array();
    let pArrayInv = Array();
    let subArrayInv = Array();

    let div0 = createAddId("div", transition, "eigenvectors-summary-w-h");

    $(createAddClassId("h4", div0, "p-gen-vec-h4", "solution-h4")).text("Reťazce zovšeobecnených vlastných vektorov");

    let div = createAddId("div", div0, "eigenvectors-summary");

    let i = 0;
    let order = 0;
    for (let block = 0; block < evectorsblocks.length; block++) {
        let tempArray = Array();
        let blockDiv = createAddClassId("div", div, "eigenvectors-summary-" + block, "eigenvectors-summary");
        $(createAppend("p", blockDiv)).html("λ = " + addEval(eigenvaluesMap, realOrderInMap, i));
        if (i !== 0 && realOrderInMap.indexOf(addEval(eigenvaluesMap, realOrderInMap, i)) === realOrderInMap.indexOf(addEval(eigenvaluesMap, realOrderInMap, i - 1)))
            order++;
        else
            order = 0;
        let vDivs = createAddClassId("div", blockDiv, "p-v-" + order + "-" + realOrderInMap.indexOf(addEval(eigenvaluesMap, realOrderInMap, i)), "p-vector");
        for (let vector = 0; vector < evectorsblocks[block].length; vector++) {
            let vDiv = createAddId("div", vDivs, "p-v-" + i);
            tempArray.push(((vector === 0) ? "v" : "z") + "<sub>" + (i + 1) + "</sub>");
            $(createAddClass("p", vDiv, "vec-title")).html(tempArray.slice(-1));

            makeMatrixDiv(evectorsblocks[block][vector], "summary-vector", "", vDiv);
            i++;
        }
        subArrayInv = subArrayInv.concat(tempArray);

        subArray = subArray.concat(tempArray.reverse());

    }
    pArray.push(subArray);
    pArrayInv.push(subArrayInv);

    return [pArray, pArrayInv];
}

function transitionMatrix(p, classp, pArray) {

    let transitionsDiv = createAddClassId("div", "#make-transition", "eigenvectors-summary-p", classp);
    $(createAddClassId("h4", transitionsDiv, "p-matrix-h4", "solution-h4")).text("Matica prechodu");

    let pGenDiv = createAddClassId("div", transitionsDiv, "transition-gen-matrix", "f-r-c");
    $(createAddClass("p", pGenDiv, "vec-title")).html("P = ");
    makeMatrixDiv(pArray, "transition", "transition-p-mat", pGenDiv);


    let pDiv = createAddClassId("div", transitionsDiv, "transition-matrix", "f-r-c");
    $(createAddClass("p", pDiv, "vec-title")).html("P = ");
    makeMatrixDiv(p, "transition", "transition-p-mat", pDiv);

}

function makeDivForJordanMatrix(ones) {
    let div0 = createAddClassId("div", "#jordan-matrix", "various-jordan-w-h", (ones === "top") ? "part-of-up" : "part-of-down");
    $(createAddClassId("h4", div0, "j-m", "solution-h4")).html("Jordanova matica");
    let div = createAddClassId("div", div0, "various-jordan-matrices", (ones === "top") ? "part-of-up" : "part-of-down");
    $(createAppend("p", div)).html("J = ");
    let matrixDiv = createAddClass("div", div, "matrix-style");

    let table = createAddClassId("table", matrixDiv, "final-jordan-" + ones, (ones === "top") ? "part-of-up" : "part-of-down");
    createAppend("tbody", table);
    return div;

}

function jordanMatrix(evectorsblocks, eigenvaluesMap, realOrderInMap, mLength) {
    jordanMatrixTopBottom(evectorsblocks, eigenvaluesMap, realOrderInMap, mLength, "bottom");
    jordanMatrixTopBottom(evectorsblocks, eigenvaluesMap, realOrderInMap, mLength, "top");

}

function jordanMatrixTopBottom(evectorsblocks, eigenvaluesMap, realOrderInMap, mLength, where) {
    let div = makeDivForJordanMatrix(where);
    let blocks = fillMatrix(evectorsblocks, eigenvaluesMap, realOrderInMap, mLength, where);
    shorterBlockMatrix(blocks, div);
    shorterBlock(blocks, div);
}

function fillMatrix(evectorsblocks, eigenvaluesMap, realOrderInMap, mLength, where) {
    let fromN = 0, toN = evectorsblocks[0].length - 1, block = 1;
    let blocks = Array(evectorsblocks.length);
    blocks[0] = "J<sub>" + evectorsblocks[0].length + "</sub>(" + realOrderInMap[0] + ")";


    for (let i = 0; i < mLength; i++) {
        let tr = createAppend("tr", "#final-jordan-" + where + " tbody");

        if (i > toN) {
            blocks[block] = "J<sub>" + evectorsblocks[block].length + "</sub>(" + addEval(eigenvaluesMap, realOrderInMap, i) + ")";
            fromN = toN + 1;
            toN = evectorsblocks[block++].length + i - 1;

        }

        for (let j = 0; j < mLength; j++) {
            let td = createAppend("td", tr);
            if (i === j)
                $(td).html(addEval(eigenvaluesMap, realOrderInMap, i));

            else {
                let appendTop = (where === "top") ? j > fromN && j <= toN && i === (j - 1) : j >= fromN && j < toN && (i - 1) === j;
                $(td).html((appendTop) ? "1" : "0");
            }
            makeBorder(fromN, toN, i, j, td);
        }
    }
    return blocks;
}

function makeBorder(fromN, toN, i, j, td) {

    if (i === fromN && j >= fromN && j <= toN)
        $(td).addClass("b-top");
    if (i === toN && j >= fromN && j <= toN)
        $(td).addClass("b-bottom");
    if (j === fromN && i >= fromN && i <= toN)
        $(td).addClass("b-left");
    if (j === toN && i >= fromN && i <= toN)
        $(td).addClass("b-right");
}

function addEval(eigenvaluesMap, realOrderInMap, index) {
    let count = 0;

    for (let eVal = 0; eVal < realOrderInMap.length; eVal++) {
        if (index < count + eigenvaluesMap[realOrderInMap[eVal]]) {
            return realOrderInMap[eVal];
        }
        count += eigenvaluesMap[realOrderInMap[eVal]];
    }
}

function shorterBlockMatrix(blocks, div0) {
    $(createAppend("p", div0)).html(" = ");
    let div = createAppend("div", div0);
    let matrixDiv = createAddClass("div", div, "matrix-style");
    let table = createAddId("table", matrixDiv, "shorter-jordan-matrix");
    let tbody = createAppend("tbody", table);
    for (let i = 0; i < blocks.length; i++) {
        let tr = createAppend("tr", tbody);

        for (let j = 0; j < blocks.length; j++) {
            let td = createAppend("td", tr);
            if (i === j)
                $(td).html(blocks[i]);
        }
    }
}

function shorterBlock(blocks, div0) {
    $(createAppend("p", div0)).html(" = ");
    let div = createAppend("div", div0);

    let val = "";
    for (let block of blocks)
        val += block + "  &oplus;  ";
    $(createAppend("p", div)).html(val.substring(0, val.length - 9));//7

}