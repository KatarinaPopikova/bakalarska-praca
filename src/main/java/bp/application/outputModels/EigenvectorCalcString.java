package bp.application.outputModels;

import bp.application.jordanFormCalculator.Eigenvectors;
import bp.application.helpers.Fraction;

import java.util.List;

public class EigenvectorCalcString extends Fraction {
    private String[][][] firstEigenvectors;
    private String[][][] matricesForEigenvector;
    private String[][][] matricesForEigenvectorGEM;
    private String[][][] blocksOfVectors;
    private String[][][] coeff;
    private String[][][] eigenvectors;
    private String[][][][] beforeGen;
    private String[][][][] afterGen;
    private List<int[]> cantGen;
    private String[][][] rCoeff;


    public EigenvectorCalcString(Eigenvectors evec) {
        firstEigenvectors(evec.getGeneralizedEigenvector(), evec.getVectorCoefficients());
        matrices(evec.getMatricesForEigenvector());
        matricesGEM(evec.getMatricesForEigenvectorGEM());
        vectorsToBlock(evec.getEigenvectorsInBlock());
        coefficients(evec.getVectorCoefficients());
        rCoefficients(evec.getRealCoeff());
        eigenvector(evec.getGeneralizedEigenvector());
        hardGeneralize(evec.getBeforeGeneralize(), evec.getAfterGeneralize(), evec.getCantGen());
    }

    private void hardGeneralize(List<List<double[][]>> beforeGeneralize, List<List<double[][]>> afterGeneralize, List<int[]> cantGen) {
        setBeforeGen(new String[beforeGeneralize.size()][][][]);
        setAfterGen(new String[afterGeneralize.size()][][][]);
        setCantGen(cantGen);
        for (int i = 0; i < beforeGeneralize.size(); i++) {
            getBeforeGen()[i] = new String[beforeGeneralize.get(i).size()][][];
            getAfterGen()[i] = new String[afterGeneralize.get(i).size()][][];
            matricesList(getBeforeGen()[i], beforeGeneralize.get(i));
            matricesList(getAfterGen()[i], afterGeneralize.get(i));
        }
    }

    public void eigenvector(List<List<double[]>> vectors) {
        setEigenvectors(new String[vectors.size()][][]);
        listToArrayString(getEigenvectors(), vectors);
    }

    public void coefficients(List<List<double[]>> coeff) {
        setCoeff(new String[coeff.size()][][]);
        listToArrayString(getCoeff(), coeff);
    }

    public void rCoefficients(List<List<double[]>> coeff) {
        setrCoeff(new String[coeff.size()][][]);
        listToArrayString(getrCoeff(), coeff);
    }

    private void matrices(List<double[][]> matricesForEigenvector) {
        setMatricesForEigenvector(new String[matricesForEigenvector.size()][][]);
        matricesList(getMatricesForEigenvector(), matricesForEigenvector);
    }

    private void matricesList(String[][][] array, List<double[][]> matrices) {
        for (int i = 0; i < matrices.size(); i++) {
            array[i] = matrixToString(matrices.get(i));
        }

    }

    private void matricesGEM(double[][][] matricesForEigenvectorGEM) {
        setMatricesForEigenvectorGEM(dim3ArrayToString(matricesForEigenvectorGEM));
    }


    public void firstEigenvectors(List<List<double[]>> generalizedEigenvector, List<List<double[]>> vectorCoefficients) {
        setFirstEigenvectors(new String[vectorCoefficients.size()][][]);
        for (int eval = 0; eval < vectorCoefficients.size(); eval++) {
            int onlyEigenvectors = vectorCoefficients.get(eval).get(0).length; //==nBlockOfEval
            String[][] evecsOfEval = new String[onlyEigenvectors][];
            for (int i = 0; i < onlyEigenvectors; i++) {
                evecsOfEval[i] = arrayToString(generalizedEigenvector.get(eval).get(i));
            }
            getFirstEigenvectors()[eval] = evecsOfEval;
        }
    }

    public void vectorsToBlock(List<List<double[]>> blocks) {
        setBlocksOfVectors(new String[blocks.size()][][]);
        listToArrayString(getBlocksOfVectors(), blocks);
    }

    public void listToArrayString(String[][][] array, List<List<double[]>> blocks) {
        for (int iBlock = 0; iBlock < blocks.size(); iBlock++) {
            String[][] evecsOfEval = new String[blocks.get(iBlock).size()][];
            for (int i = 0; i < blocks.get(iBlock).size(); i++) {
                evecsOfEval[i] = arrayToString(blocks.get(iBlock).get(i));
            }
            array[iBlock] = evecsOfEval;
        }
    }

    public String[][][] getFirstEigenvectors() {
        return firstEigenvectors;
    }

    public void setFirstEigenvectors(String[][][] firstEigenvectors) {
        this.firstEigenvectors = firstEigenvectors;
    }

    public String[][][] getMatricesForEigenvector() {
        return matricesForEigenvector;
    }

    public void setMatricesForEigenvector(String[][][] matricesForEigenvector) {
        this.matricesForEigenvector = matricesForEigenvector;
    }

    public String[][][] getMatricesForEigenvectorGEM() {
        return matricesForEigenvectorGEM;
    }

    public void setMatricesForEigenvectorGEM(String[][][] matricesForEigenvectorGEM) {
        this.matricesForEigenvectorGEM = matricesForEigenvectorGEM;
    }

    public String[][][] getBlocksOfVectors() {
        return blocksOfVectors;
    }

    public void setBlocksOfVectors(String[][][] blocksOfVectors) {
        this.blocksOfVectors = blocksOfVectors;
    }

    public String[][][] getCoeff() {
        return coeff;
    }

    public void setCoeff(String[][][] coeff) {
        this.coeff = coeff;
    }

    public String[][][] getEigenvectors() {
        return eigenvectors;
    }

    public void setEigenvectors(String[][][] eigenvectors) {
        this.eigenvectors = eigenvectors;
    }

    public String[][][][] getBeforeGen() {
        return beforeGen;
    }

    public void setBeforeGen(String[][][][] beforeGen) {
        this.beforeGen = beforeGen;
    }

    public String[][][][] getAfterGen() {
        return afterGen;
    }

    public void setAfterGen(String[][][][] afterGen) {
        this.afterGen = afterGen;
    }

    public List<int[]> getCantGen() {
        return cantGen;
    }

    public void setCantGen(List<int[]> cantGen) {
        this.cantGen = cantGen;
    }

    public String[][][] getrCoeff() {
        return rCoeff;
    }

    public void setrCoeff(String[][][] rCoeff) {
        this.rCoeff = rCoeff;
    }
}
