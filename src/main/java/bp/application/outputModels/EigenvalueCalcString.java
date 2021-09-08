package bp.application.outputModels;

import bp.application.jordanFormCalculator.Eigenvalues;
import bp.application.helpers.Fraction;
import bp.application.jordanFormCalculator.MainJordanFormCalculator;
import bp.application.jordanFormCalculator.MinimalPolynomial;

import java.util.HashMap;
import java.util.List;

public class EigenvalueCalcString extends Fraction {
    private String[][][] determinant;
    private String[][] matrixForPolynomial;
    private String[][] matrixForPolynomialGEM;
    private String[][] kernelPol;
    private String[][][] multiplicationMatrices;
    private List<String> eigenvalues;
    private String[] polynomial;
    private String[][] imaginaryRoots;
    private String[] eigenvaluesFromPolynomial;
    private String trace;
    private String missedEigenvalue;
    private String evalLambdaSum;
    private HashMap<String, Integer> eigenvaluesMap;
    private String[] eigenValFromMap;

    public EigenvalueCalcString(MainJordanFormCalculator mainJordanFormCalculator, int error) {
        if (mainJordanFormCalculator.getCharacteristicPolynomial() != null)
            determinantString(mainJordanFormCalculator.getCharacteristicPolynomial().getDeterminant());
        else {
            calcMinPol(mainJordanFormCalculator.getMinimalPolynomial());
        }
        polynomialString(mainJordanFormCalculator.getEigenvalues().getPolynomial());
        if (error != 3) {
            allEigenvalues(mainJordanFormCalculator.getEigenvalues());
            if (mainJordanFormCalculator.getEigenvalues().getMissedEigenvalue() != null)
                traceALemma(mainJordanFormCalculator.getTrace(), mainJordanFormCalculator.getEigenvalues().getMissedEigenvalue());

        }
    }

    private void calcMinPol(MinimalPolynomial minimalPolynomial) {
        matricesForMinPolString(minimalPolynomial.getMultiplicationMatrices());
        minPolString(minimalPolynomial.getMatrixForPolynomial());
        minPolGEMString(minimalPolynomial.getMatrixForPolynomialGEM(), minimalPolynomial.getPivot().length);
        setKernelPol(matrixToString(minimalPolynomial.getKernel()));
    }

    private void minPolGEMString(double[][] matrixForPolynomialGEM, int length) {
        setMatrixForPolynomialGEM(matrixToString(matrixForPolynomialGEM, length));
    }

    public void determinantString(double[][][] determinant) {
        setDeterminant(dim3ArrayToString(determinant));
    }

    private void minPolString(double[][] matrixForPolynomial) {
        setMatrixForPolynomial(matrixToString(matrixForPolynomial));
    }

    private void matricesForMinPolString(double[][][] multiplicationMatrices) {
        setMultiplicationMatrices(dim3ArrayToString(multiplicationMatrices));
    }


    private void polynomialString(double[] polynomial) {
        setPolynomial(arrayToString(polynomial));
    }

    private void traceALemma(double trace, Double missedEigenvalue) {
        setTrace(valueToString(trace));
        setMissedEigenvalue(valueToString(missedEigenvalue));
        setEvalLambdaSum(valueToString(trace - missedEigenvalue));
    }

    private void allEigenvalues(Eigenvalues eigenvalues) {
        setEigenvaluesFromPolynomial(arrayToString(eigenvalues.getEigenvaluesFromPolynomial()));
        setEigenvalues(listToString(eigenvalues.getEigenvalues()));
        if (eigenvalues.getImaginaryRoots() != null)
            setImaginaryRoots(matrixToString(eigenvalues.getImaginaryRoots()));
        else {
            eigenvalueMap(eigenvalues.getEigenvaluesMap());
        }
    }

    private void eigenvalueMap(HashMap<Double, Integer> eigenvaluesMap) {
        setEigenvaluesMap(new HashMap<>());
        setEigenValFromMap(new String[eigenvaluesMap.size()]);
        int i = 0;

        for (Double eVal : eigenvaluesMap.keySet()) {
            getEigenvaluesMap().put(valueToString(eVal), eigenvaluesMap.get(eVal));
            getEigenValFromMap()[i++] = valueToString(eVal);
        }
    }

    public String[][][] getDeterminant() {
        return determinant;
    }

    public void setDeterminant(String[][][] determinantString) {
        this.determinant = determinantString;
    }

    public String[] getPolynomial() {
        return polynomial;
    }

    public void setPolynomial(String[] polynomial) {
        this.polynomial = polynomial;
    }

    public String[][] getImaginaryRoots() {
        return imaginaryRoots;
    }

    public void setImaginaryRoots(String[][] imaginaryRoots) {
        this.imaginaryRoots = imaginaryRoots;
    }

    public String[] getEigenvaluesFromPolynomial() {
        return eigenvaluesFromPolynomial;
    }

    public void setEigenvaluesFromPolynomial(String[] eigenvaluesFromPolynomial) {
        this.eigenvaluesFromPolynomial = eigenvaluesFromPolynomial;
    }

    public String getTrace() {
        return trace;
    }

    public void setTrace(String trace) {
        this.trace = trace;
    }

    public String getMissedEigenvalue() {
        return missedEigenvalue;
    }

    public void setMissedEigenvalue(String missedEigenvalue) {
        this.missedEigenvalue = missedEigenvalue;
    }

    public String getEvalLambdaSum() {
        return evalLambdaSum;
    }

    public void setEvalLambdaSum(String evalLambdaSum) {
        this.evalLambdaSum = evalLambdaSum;
    }

    public String[][] getMatrixForPolynomial() {
        return matrixForPolynomial;
    }

    public void setMatrixForPolynomial(String[][] matrixForPolynomial) {
        this.matrixForPolynomial = matrixForPolynomial;
    }

    public List<String> getEigenvalues() {
        return eigenvalues;
    }

    public void setEigenvalues(List<String> eigenvalues) {
        this.eigenvalues = eigenvalues;
    }

    public String[][][] getMultiplicationMatrices() {
        return multiplicationMatrices;
    }

    public void setMultiplicationMatrices(String[][][] multiplicationMatrices) {
        this.multiplicationMatrices = multiplicationMatrices;
    }

    public String[][] getMatrixForPolynomialGEM() {
        return matrixForPolynomialGEM;
    }

    public void setMatrixForPolynomialGEM(String[][] matrixForPolynomialGEM) {
        this.matrixForPolynomialGEM = matrixForPolynomialGEM;
    }

    public HashMap<String, Integer> getEigenvaluesMap() {
        return eigenvaluesMap;
    }

    public void setEigenvaluesMap(HashMap<String, Integer> eigenvaluesMap) {
        this.eigenvaluesMap = eigenvaluesMap;
    }

    public String[] getEigenValFromMap() {
        return eigenValFromMap;
    }

    public void setEigenValFromMap(String[] eigenValFromMap) {
        this.eigenValFromMap = eigenValFromMap;
    }

    public String[][] getKernelPol() {
        return kernelPol;
    }

    public void setKernelPol(String[][] kernelPol) {
        this.kernelPol = kernelPol;
    }
}
