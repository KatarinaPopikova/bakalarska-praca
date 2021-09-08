package bp.application.jordanFormCalculator;

import bp.application.jordanFormCalculator.resources.SolutionResource;

import java.util.ArrayList;
import java.util.List;

import static java.lang.Math.abs;


public class JordanForm extends MatrixResult {
    private double[][] matrixA;

    //1 below diagonal
    private double[][] matrixJ;
    private double[][] matrixP;
    private double[][] matrixPInv;

    //1 above diagonal
    private double[][] matrixJUp;
    private double[][] matrixPUp;
    private double[][] matrixPInvUp;

    private int error; //1: eigenvectors are linearly dependent, 2: bad matrixPInv from user or bad calculation Jordan

    public JordanForm() {
    }

    public JordanForm(double[][] matrixP) {//find Inverse matrix for check solution
        setMatrixPInv(calculateMatrixInv(matrixP)); //TO DO: matrix to string
    }

    public JordanForm(SolutionResource solutionResource) {

        setMatrixJ(solutionResource.getMatrixJ());
        setMatrixP(solutionResource.getMatrixP());
        setMatrixPInv(solutionResource.getMatrixPInv());
        if (checkEqualMatrices(calculateMatrixInv(getMatrixP()), getMatrixPInv()))
            setMatrixA(multiplyJordanFormToA());

    }

    public JordanForm(Eigenvalues eigenvalue, Eigenvectors eigenvectors, double[][]matrixA) {
        declareAllMatrix(eigenvalue);
        setJ(eigenvalue);
        setP(eigenvectors);
        setPInv();
        if (getError() == 0 ){
            setMatrixA(multiplyJordanFormToA());
            boolean error = checkEqualMatrices(matrixA, getMatrixA());
        }
    }

    private boolean checkEqualMatrices(double[][] matrix1, double[][] matrix2) { //mozno pouzijes aj pre kontrolu vstupnej matice
        if (getError() != 0) //null row
            return false;

        for (int row = 0; row < matrix1.length; row++)
            for (int col = 0; col < matrix1[0].length; col++)
                if (abs(matrix1[row][col] - matrix2[row][col]) > 0.0000003) {
                    setError(2);
                    return false;
                }

        return true;
    }

    public double[][] multiplyJordanFormToA() {
        return multiplyMatrix(multiplyMatrix(getMatrixP(), getMatrixJ()), getMatrixPInv());
    }

    private void declareAllMatrix(Eigenvalues eigenvalue) {
        setMatrixJ(new double[eigenvalue.getEigenvalues().size()][eigenvalue.getEigenvalues().size()]);
        setMatrixP(new double[eigenvalue.getEigenvalues().size()][eigenvalue.getEigenvalues().size()]);
        setMatrixPUp(new double[eigenvalue.getEigenvalues().size()][eigenvalue.getEigenvalues().size()]);
        setMatrixPInv(new double[eigenvalue.getEigenvalues().size()][eigenvalue.getEigenvalues().size()]);
        setMatrixPInvUp(new double[eigenvalue.getEigenvalues().size()][eigenvalue.getEigenvalues().size()]);
    }

    private void setJ(Eigenvalues eigenvalue) {
        int i = 0;

        for (Double eVal : eigenvalue.getEigenvaluesMap().keySet()) {
            for (int count = 0; count < eigenvalue.getEigenvaluesMap().get(eVal); count++) {
                getMatrixJ()[i][i] = eVal;
                i++;
            }
        }
        if(getMatrixJ().length < 2)
            setError(1);
        else
            setMatrixJUp(copyMatrix(getMatrixJ()));
    }

    private void setP(Eigenvectors eigenvectors) {
        int col = 0;

        for (int block = 0; block < eigenvectors.getEigenvectorsInBlock().size(); block++) {
            for (int gVector = 0, endGVector = eigenvectors.getEigenvectorsInBlock().get(block).size() - 1; gVector < eigenvectors.getEigenvectorsInBlock().get(block).size(); gVector++, endGVector--) {

                for (int row = 0; row < getMatrixP().length; row++) {
                    getMatrixP()[row][col] = eigenvectors.getEigenvectorsInBlock().get(block).get(endGVector)[row];
                    getMatrixPUp()[row][col] = eigenvectors.getEigenvectorsInBlock().get(block).get(gVector)[row];
                }

                if (gVector > 0) {
                    getMatrixJ()[col][col - 1] = 1.0;
                    getMatrixJUp()[col - 1][col] = 1.0;
                }
                col++;
            }

        }

    }

    private void setPInv() {
        setMatrixPInv(calculateMatrixInv(getMatrixP()));
        setMatrixPInvUp(calculateMatrixInv(getMatrixPUp()));
    }


    public double[][] calculateMatrixInv(double[][] matrixP) {
        List<Integer> pivot = new ArrayList<>();
        double[][] matrixInv = doGaussJordanE(matrixP, identityMatrix(matrixP.length), pivot);
        setError((pivot.size() != matrixP.length) ? 1 : 0);
        return matrixInv;
    }

    public double[][] identityMatrix(int length) {
        double[][] matrix = new double[length][length];
        for (int i = 0; i < length; i++) {
            matrix[i][i] = 1.0;
        }
        return matrix;
    }

    public double[][] getMatrixJ() {
        return matrixJ;
    }

    public void setMatrixJ(double[][] matrixJ) {
        this.matrixJ = matrixJ;
    }

    public double[][] getMatrixP() {
        return matrixP;
    }

    public void setMatrixP(double[][] matrixP) {
        this.matrixP = matrixP;
    }

    public double[][] getMatrixPInv() {
        return matrixPInv;
    }

    public void setMatrixPInv(double[][] matrixPInv) {
        this.matrixPInv = matrixPInv;
    }

    public double[][] getMatrixJUp() {
        return matrixJUp;
    }

    public void setMatrixJUp(double[][] matrixJUp) {
        this.matrixJUp = matrixJUp;
    }

    public double[][] getMatrixPUp() {
        return matrixPUp;
    }

    public void setMatrixPUp(double[][] matrixPUp) {
        this.matrixPUp = matrixPUp;
    }

    public double[][] getMatrixPInvUp() {
        return matrixPInvUp;
    }

    public void setMatrixPInvUp(double[][] matrixPInvUp) {
        this.matrixPInvUp = matrixPInvUp;
    }

    public int getError() {
        return error;
    }

    public void setError(int error) {
        this.error = error;
    }

    public double[][] getMatrixA() {
        return matrixA;
    }

    public void setMatrixA(double[][] matrixA) {
        this.matrixA = matrixA;
    }
}
