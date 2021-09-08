package bp.application.jordanFormCalculator;

import bp.application.jordanFormCalculator.resources.JordanFormResource;

public class MainJordanFormCalculator extends MatrixResult {
    private double[][] matrixA;
    private double[][] matrixb;
    private CharacteristicPolynomial characteristicPolynomial;
    private MinimalPolynomial minimalPolynomial;
    private Eigenvalues eigenvalues;
    private Eigenvectors eigenvectors;
    private JordanForm jordanForm;
    private double trace;

    public MainJordanFormCalculator(JordanFormResource jordanFormResource) {
        setMatrixA(jordanFormResource.getMatrixA());
        setMatrixb(jordanFormResource.getMatrixb());
    }

    public void minimalPolynomial() {
        setMinimalPolynomial(new MinimalPolynomial(getMatrixA(), getMatrixb()));
        eigenvalues(getMinimalPolynomial().createPolynomial());
    }

    public void characteristicPolynomial() {
        setCharacteristicPolynomial(new CharacteristicPolynomial(getMatrixA()));
        eigenvalues(getCharacteristicPolynomial().calculateDeterminant());
    }

    public void eigenvalues(double[] polynomial) {
        roundIfNecessaryPolynomial(polynomial);
        setEigenvalues(new Eigenvalues(polynomial, getTrace(), getMatrixA()));
    }

    public void createP() {
        setEigenvectors(new Eigenvectors(getEigenvalues().getEigenvaluesMap()));
        getEigenvectors().calculateEigenvectors(getEigenvalues().getEigenvaluesMap(), getMatrixA());
    }

    public void createPJPInv() {
        setJordanForm(new JordanForm(getEigenvalues(), getEigenvectors(), getMatrixA()));
    }

    public boolean isAllEigenValues() {
        if (getEigenvalues().getImaginaryRoots() == null)
            return (getEigenvalues().getEigenvalues().size() == getMatrixA().length);
        else
            return (getEigenvalues().getEigenvalues().size() + 2 == getMatrixA().length);
    }

    public double getTrace() {
        return trace;
    }

    public void setTrace(double trace) {
        this.trace = trace;
    }

    public void setTrace() {
        double trace = 0;
        for (int i = 0; i < getMatrixA().length; i++)
            trace += getMatrixA()[i][i];
        this.trace = trace;
    }

    public double[][] getMatrixA() {
        return matrixA;
    }

    public void setMatrixA(double[][] matrixA) {
        this.matrixA = matrixA;
    }

    public double[][] getMatrixb() {
        return matrixb;
    }

    public void setMatrixb(double[][] matrixb) {
        this.matrixb = matrixb;
    }

    public CharacteristicPolynomial getCharacteristicPolynomial() {
        return characteristicPolynomial;
    }

    public void setCharacteristicPolynomial(CharacteristicPolynomial characteristicPolynomial) {
        this.characteristicPolynomial = characteristicPolynomial;
    }

    public MinimalPolynomial getMinimalPolynomial() {
        return minimalPolynomial;
    }

    public void setMinimalPolynomial(MinimalPolynomial minimalPolynomial) {
        this.minimalPolynomial = minimalPolynomial;
    }

    public Eigenvalues getEigenvalues() {
        return eigenvalues;
    }

    public void setEigenvalues(Eigenvalues eigenvalues) {
        this.eigenvalues = eigenvalues;
    }

    public Eigenvectors getEigenvectors() {
        return eigenvectors;
    }

    public void setEigenvectors(Eigenvectors eigenvectors) {
        this.eigenvectors = eigenvectors;
    }

    public JordanForm getJordanForm() {
        return jordanForm;
    }

    public void setJordanForm(JordanForm jordanForm) {
        this.jordanForm = jordanForm;
    }

}
