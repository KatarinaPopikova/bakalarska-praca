package bp.application.outputModels;

import bp.application.helpers.Fraction;
import bp.application.jordanFormCalculator.JordanForm;

public class JordanFormString extends Fraction {
    private String[][] solutionMatrix;

    //matrixInString
    private String[][] matrixJ;
    private String[][] matrixP;
    private String[][] matrixPInv;

    //matrixInString Up
    private String[][] matrixJUp;
    private String[][] matrixPUp;
    private String[][] matrixPInvUp;


    public JordanFormString() {
    }

    public JordanFormString(double[][] matrix, int error) {
        if (error == 0)
            setSolutionMatrix(matrixToString(matrix));
        else
            setSolutionMatrix(new String[][]{{String.valueOf(error)}});
        //1: eigenvectors are linearly dependent, 2: bad matrixPInv from user

    }

    public JordanFormString(JordanForm jordanForm) {
        setAllMatricesToString(jordanForm);
    }

    private void setAllMatricesToString(JordanForm jordanForm) {
        if (jordanForm.getError() == 0) {
            setSolutionMatrix(matrixToString(jordanForm.getMatrixA()));
            setMatricesToString(jordanForm.getMatrixP(), jordanForm.getMatrixJ(), jordanForm.getMatrixPInv());
            setMatricesUpToString(jordanForm.getMatrixPUp(), jordanForm.getMatrixJUp(), jordanForm.getMatrixPInvUp());
            setSolutionMatrix(matrixToString(jordanForm.getMatrixA()));
        } else
            setSolutionMatrix(new String[][]{{String.valueOf(jordanForm.getError())}});
        //1: eigenvectors are linearly dependent, 2: bad matrixPInv from user
    }

    private void setMatricesToString(double[][] matrixP, double[][] matrixJ, double[][] matrixPInv) {
        setMatrixP(matrixToString(matrixP));
        setMatrixJ(matrixToString(matrixJ));
        setMatrixPInv(matrixToString(matrixPInv));
    }

    private void setMatricesUpToString(double[][] matrixPUp, double[][] matrixJUp, double[][] matrixPInvUp) {
        setMatrixPUp(matrixToString(matrixPUp));
        setMatrixJUp(matrixToString(matrixJUp));
        setMatrixPInvUp(matrixToString(matrixPInvUp));
    }

    public String[][] getSolutionMatrix() {
        return solutionMatrix;
    }

    public void setSolutionMatrix(String[][] solutionMatrix) {
        this.solutionMatrix = solutionMatrix;
    }

    public String[][] getMatrixJ() {
        return matrixJ;
    }

    public void setMatrixJ(String[][] matrixJ) {
        this.matrixJ = matrixJ;
    }

    public String[][] getMatrixP() {
        return matrixP;
    }

    public void setMatrixP(String[][] matrixP) {
        this.matrixP = matrixP;
    }

    public String[][] getMatrixPInv() {
        return matrixPInv;
    }

    public void setMatrixPInv(String[][] matrixPInv) {
        this.matrixPInv = matrixPInv;
    }

    public String[][] getMatrixJUp() {
        return matrixJUp;
    }

    public void setMatrixJUp(String[][] matrixJUp) {
        this.matrixJUp = matrixJUp;
    }

    public String[][] getMatrixPUp() {
        return matrixPUp;
    }

    public void setMatrixPUp(String[][] matrixPUp) {
        this.matrixPUp = matrixPUp;
    }

    public String[][] getMatrixPInvUp() {
        return matrixPInvUp;
    }

    public void setMatrixPInvUp(String[][] matrixPInvUp) {
        this.matrixPInvUp = matrixPInvUp;
    }

}
