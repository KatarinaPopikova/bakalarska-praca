package bp.application.jordanFormCalculator.resources;

public class SolutionResource {
    double[][] matrixP;
    double[][] matrixJ;
    double[][] matrixPInv;

    public double[][] getMatrixP() {
        return matrixP;
    }

    public void setMatrixP(double[][] matrixP) {
        this.matrixP = matrixP;
    }

    public double[][] getMatrixJ() {
        return matrixJ;
    }

    public void setMatrixJ(double[][] matrixJ) {
        this.matrixJ = matrixJ;
    }

    public double[][] getMatrixPInv() {
        return matrixPInv;
    }

    public void setMatrixPInv(double[][] matrixPInv) {
        this.matrixPInv = matrixPInv;
    }
}
