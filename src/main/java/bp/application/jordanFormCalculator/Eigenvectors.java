package bp.application.jordanFormCalculator;

import bp.application.helpers.Fraction;

import java.util.*;

import static java.lang.Math.round;

public class Eigenvectors extends MatrixResult {
    private List<List<double[]>> vectorCoefficients;
    private List<List<double[]>> generalizedEigenvector;
    private List<double[][]> matricesForEigenvector;
    double[][][] matricesForEigenvectorGEM; //after Gauss-Jordan Elimination
    private Integer[][] pivots;
    private int[] cantGeneralizeVector; //null row on left side = null row on right in matrix
    private List<List<double[]>> eigenvectorsInBlock;
    private double[][] n5and2Blocks;
    private boolean n5and3Blocks;
    private List<List<double[][]>> beforeGeneralize;
    private List<List<double[][]>> afterGeneralize;
    private boolean makeResult2;
    private List<int[]> cantGen;
    private List<List<double[]>> realCoeff;

    public Eigenvectors(HashMap<Double, Integer> eigenvalueMap) {
        setGeneralizedEigenvector(new ArrayList<>());
        setVectorCoefficients(new ArrayList<>());
        setMatricesForEigenvector(new ArrayList<>());
        setMatricesForEigenvectorGEM(new double[eigenvalueMap.size()][][]);
        setPivots(new Integer[eigenvalueMap.size()][]);
        setEigenvectorsInBlock(new ArrayList<>());
        setBeforeGeneralize(new ArrayList<>());
        setAfterGeneralize(new ArrayList<>());
    }

    public void calculateEigenvectors(HashMap<Double, Integer> eigenvalueMap, double[][] A) {

        int eigenvalueOrder = 0;

        for (Double eVal : eigenvalueMap.keySet()) {
            getGeneralizedEigenvector().add(new ArrayList<>());
            getVectorCoefficients().add(new ArrayList<>());
            getBeforeGeneralize().add(new ArrayList<>());
            getAfterGeneralize().add(new ArrayList<>());

            createMatrixWithCountDownEigenvalue(A, eVal);   //(A-λI)
            findEigenvectorForEigenvalue(eigenvalueMap.get(eVal), eigenvalueOrder++);
        }
        splitIntoBlocks();

    }

    private void splitIntoBlocks() {
        setEigenvectorsInBlock(new ArrayList<>());
        setRealCoeff(new ArrayList<>());
        for (int eigenvalue = 0; eigenvalue < getVectorCoefficients().size(); eigenvalue++) {
            for (int block = 0; block < getVectorCoefficients().get(eigenvalue).get(0).length; block++) {
                getEigenvectorsInBlock().add(new ArrayList<>());
                getRealCoeff().add(new ArrayList<>());
                findBlock(eigenvalue, block);
            }

        }
    }

    private void findBlock(int eval, int block) {
        if (nBlockOfEval(eval) == getGeneralizedEigenvector().get(eval).size())
            lastEigenvectorsInBlock().add(getGeneralizedEigenvector().get(eval).get(block));
        else if (nBlockOfEval(eval) == 1) {
            for (int vector = 0; vector < getGeneralizedEigenvector().get(eval).size(); vector++)
                lastEigenvectorsInBlock().add(getGeneralizedEigenvector().get(eval).get(vector));
        } else if (getN5and2Blocks() != null)
            block2and5sameEigenvalue(eval, block);
        else if (isMakeResult2()) {
            secondMakeResult(eval, block);
        } else if (isN5and3Blocks())
            block3and5sameEigenvalue(eval, block);
        else if ((nBlockOfEval(eval) - getCantGeneralizeVector().length) == 2) //3blocks, 1 null(5), 2blocks, 0 null(4)
            easyGeneralizationAfterHard(eval, block);
        else {
            fromHardGenerationToBlock(eval, block);

        }

    }

    private void secondMakeResult(int eval, int block) {
        if (eigenvectorWithoutCoefficient(eval, block)) {
            lastEigenvectorsInBlock().add(getGeneralizedEigenvector().get(eval).get(getCantGeneralizeVector()[block]));
            getRealCoeff().get(eval).add(getVectorCoefficients().get(eval).get(block));
        } else {

            if (getCantGeneralizeVector()[0] == 1) {
                vectorMultipliedByCoefficient(getBeforeGeneralize().get(eval).get(0), new double[]{getVectorCoefficients().get(eval).get(3)[0], 0});
                getRealCoeff().get(eval).add(new double[]{getVectorCoefficients().get(eval).get(3)[0], 0});
            } else {
                vectorMultipliedByCoefficient(getBeforeGeneralize().get(eval).get(0), new double[]{0, getVectorCoefficients().get(eval).get(3)[0]});
                getRealCoeff().get(eval).add(new double[]{0, getVectorCoefficients().get(eval).get(3)[0]});
            }

            vectorMultipliedByCoefficient(getBeforeGeneralize().get(eval).get(1), getVectorCoefficients().get(eval).get(3));

            for (int index = getVectorCoefficients().get(eval).size() - 1; index < getGeneralizedEigenvector().get(eval).size(); index++)
                lastEigenvectorsInBlock().add(getGeneralizedEigenvector().get(eval).get(index));
        }

    }

    private void fromHardGenerationToBlock(int eval, int block) {
        if (eigenvectorWithoutCoefficient(eval, block)) {
            lastEigenvectorsInBlock().add(getGeneralizedEigenvector().get(eval).get(getCantGeneralizeVector()[block]));
            getRealCoeff().get(eval).add(getVectorCoefficients().get(eval).get(block));

        } else {
            for (int coeff = nBlockOfEval(eval); coeff < getVectorCoefficients().get(eval).size(); coeff++) {
                vectorMultipliedByCoefficient(makeResult(eval, 0, getVectorCoefficients().get(eval).get(coeff).length), getVectorCoefficients().get(eval).get(coeff));
                getRealCoeff().get(eval).add(getVectorCoefficients().get(eval).get(coeff));
            }
            for (int index = getVectorCoefficients().get(eval).size() - 1; index < getGeneralizedEigenvector().get(eval).size(); index++)
                lastEigenvectorsInBlock().add(getGeneralizedEigenvector().get(eval).get(index));

            if (eval == 0 && getVectorCoefficients().get(0).size() == 5 && getVectorCoefficients().get(0).get(0).length == 3 && getVectorCoefficients().get(0).get(4)[3] != 1 && getVectorCoefficients().get(0).get(4)[3] != 0) {
                for (int m = 0; m < 5; m++) {
                    lastEigenvectorsInBlock().get(0)[m] *= getVectorCoefficients().get(0).get(4)[3];
                }
            }
        }
    }

    private boolean eigenvectorWithoutCoefficient(int eval, int block) {
        return (getCantGeneralizeVector().length > block && !(getCantGeneralizeVector().length == nBlockOfEval(eval) && getCantGeneralizeVector().length - 1 == block));
    }

    public void easyGeneralizationAfterHard(int eval, int block) {
        if (block == 0) {
            getBeforeGeneralize().get(eval).remove(getBeforeGeneralize().get(eval).size() - 1);
            getAfterGeneralize().get(eval).remove(getAfterGeneralize().get(eval).size() - 1);

            getBeforeGeneralize().get(eval).remove(getBeforeGeneralize().get(eval).size() - 1);
            getAfterGeneralize().get(eval).remove(getAfterGeneralize().get(eval).size() - 1);
        }

        if (getCantGeneralizeVector().length > block)
            lastEigenvectorsInBlock().add(getGeneralizedEigenvector().get(eval).get(getCantGeneralizeVector()[block]));
        else {
            for (int i = 0; i < getGeneralizedEigenvector().get(eval).size(); i++) {
                if (getVectorCoefficients().get(eval).get(i)[findCanGen( block)] == 1)
                    lastEigenvectorsInBlock().add(getGeneralizedEigenvector().get(eval).get(i));
            }
        }
    }

    private int findCanGen( int block) {
        if (getCantGeneralizeVector().length > 0) {
            if (getCantGeneralizeVector()[0] >= block)
                return block - 1;
            return block;
        } else
            return block;
    }

    private int nBlockOfEval(int eigenvalue) {
        return getVectorCoefficients().get(eigenvalue).get(0).length;
    }

    private void block3and5sameEigenvalue(int eigenvalue, int block) {
        if (block == 0) {
            lastEigenvectorsInBlock().add(getGeneralizedEigenvector().get(eigenvalue).get(getCantGeneralizeVector()[0]));
        } else if (block == 1) {
            vectorMultipliedByCoefficient(makeResult(eigenvalue, 0, getVectorCoefficients().get(eigenvalue).get(3).length), getVectorCoefficients().get(eigenvalue).get(3));
            lastEigenvectorsInBlock().add(getGeneralizedEigenvector().get(eigenvalue).get(3));
        } else {
            vectorMultipliedByCoefficient(makeResult(eigenvalue, 0, getVectorCoefficients().get(eigenvalue).get(4).length), getVectorCoefficients().get(eigenvalue).get(4));
            lastEigenvectorsInBlock().add(getGeneralizedEigenvector().get(eigenvalue).get(4));

        }
    }


    private void block2and5sameEigenvalue(int eigenvalue, int block) {
        if (block == 0) {
            getBeforeGeneralize().get(eigenvalue).remove(1);
            getAfterGeneralize().get(eigenvalue).remove(1);

            firstBlockFrom2(eigenvalue);
        } else {
            secondBlockFrom2(eigenvalue);
        }
    }

    private void firstBlockFrom2(int eigenvalue) {
        double[] whichVector = (lastCoefficientListValue()[0] == 0) ? new double[]{1.0, 0.0} : new double[]{0.0, 1.0};
        vectorMultipliedByCoefficient(makeResult(0, 0, 2), whichVector);
        vectorMultipliedByCoefficient(getN5and2Blocks(), whichVector);
        getRealCoeff().get(eigenvalue).add(whichVector);
    }

    private void secondBlockFrom2(int eigenvalue) {
        vectorMultipliedByCoefficient(makeResult(0, 0, 2), lastCoefficientListValue());
        vectorMultipliedByCoefficient(getN5and2Blocks(), lastCoefficientListValue());
        lastEigenvectorsInBlock().add(getGeneralizedEigenvector().get(eigenvalue).get(2));
        getRealCoeff().get(eigenvalue).add(lastCoefficientListValue());
    }

    private void vectorMultipliedByCoefficient(double[][] vectors, double[] coefficients) {
        double[] vector = new double[vectors.length];

        for (int i = 0; i < vectors.length; i++)
            for (int j = 0; j < vectors[0].length; j++)
                vector[i] += vectors[i][j] * coefficients[j];
        getEigenvectorsInBlock().get(getEigenvectorsInBlock().size() - 1).add(vector);
    }


    public void findEigenvectorForEigenvalue(int orderEigenvalue, int eigenvalueOrder) {

        findKernel(eigenvalueOrder);

        if (orderEigenvalue > lastEigenvectorList().size())
            generalize(orderEigenvalue);


    }

    private void findKernel(int eigenvalueOrder) {

        getMatricesForEigenvectorGEM()[eigenvalueOrder] = copyMatrix(lastMatrixForEigenvector());
        List<Integer> pivot = new ArrayList<>();
        double[][] kernel = matrixResult(getMatricesForEigenvectorGEM()[eigenvalueOrder], pivot);
        getPivots()[eigenvalueOrder] = pivot.toArray(new Integer[0]);


        removeFraction(kernel);
        giveKernelToGeneralizedEigenvector(kernel);
    }

    public void generalize(int orderEigenvalue) {
        if (!generalizeWithoutParameter(orderEigenvalue))
            generalizeWithParameter(orderEigenvalue);
    }


    private void generalizeWithParameter(int orderEigenvalue) {
        setCantGen(new ArrayList<>());
        for (int i = 0; i < 2; i++) {
            List<Integer> pivot = new ArrayList<>();
            //GEM with result = string with all previous vectors
            getBeforeGeneralize().get(getAfterGeneralize().size() - 1).add(makeResult());
            double[][] resultVectorGEM = matrixResultInhomogeneousHard(lastMatrixForEigenvector(), makeResult(), pivot);
            getAfterGeneralize().get(getAfterGeneralize().size() - 1).add(resultVectorGEM);

            if (chooseGeneralizationWithParameter(resultVectorGEM, pivot, i)) return;

            if (orderEigenvalue == lastEigenvectorList().size()) break;
        }

        if (orderEigenvalue > lastEigenvectorList().size())
            easyGeneralization(lastEigenvectorList().size() - 1); //after second generation
    }

    private boolean chooseGeneralizationWithParameter(double[][] resultVectorGEM, List<Integer> pivot, int i) {
        List<Integer> cantGenerate = findCoefficients(resultVectorGEM, pivot); //add coeff to vector and return number of vector, which cant change

        if (i == 0) setCantGeneralizeVector(cantGenerate); //save which vectors must be eigenvectors

        if (cantGenerate.size() == 0 && resultVectorGEM[0].length == 2 && lastMatrixForEigenvector().length == 5 && getMatricesForEigenvectorGEM().length == 1) {
            calculateN5and2Blocks(pivot, resultVectorGEM);
            return true; //end finding eigenvalue, others will be calculated
        } else if ((resultVectorGEM[0].length - cantGenerate.size()) == 2 && i == 0) { //3blocks, 1 null(5), 2blocks, 0 null(4)
            dontNeedCoefficients(resultVectorGEM[0].length, cantGenerate);
        } else if (lastMatrixForEigenvector().length == 5 && nBlockOfEval(0) == 3 && controlCantGenerate())
            calculateN5and3Blocks(pivot, resultVectorGEM);
        else
            needCoefficients(resultVectorGEM, pivot);  //multiply and find result vector
        return false; //continue in calculating
    }

    private boolean controlCantGenerate() {
        if (getCantGeneralizeVector().length == 2) {
            for (int i = 0; i < 2; i++) {
                if (getVectorCoefficients().get(0).get(3)[getCantGeneralizeVector()[i]] != 0)
                    return true;
            }

        }
        return false;
    }

    private void calculateN5and3Blocks(List<Integer> pivot, double[][] resultVectorGEM) {
        setN5and3Blocks(true);
        needCoefficients(resultVectorGEM, pivot);  //multiply and find first generalized vector
        for (int i = 0; i < 3; i++)
            if (lastCoefficientList().get(3)[i] == 0) {
                hardGeneralizationWithoutCoeff(i, 3);
            }
    }

    private void calculateN5and2Blocks(List<Integer> pivot, double[][] resultVectorGEM) {
        getBeforeGeneralize().get(getAfterGeneralize().size() - 1).add(resultVectorGEM);
        double[][] firstEigenvectorsWithParameters = firstGeneralizeVector(pivot, resultVectorGEM);
        getAfterGeneralize().get(getAfterGeneralize().size() - 1).add(firstEigenvectorsWithParameters);

        setN5and2Blocks(copyMatrix(firstEigenvectorsWithParameters));
        getBeforeGeneralize().get(getAfterGeneralize().size() - 1).add(firstEigenvectorsWithParameters);
        double[][] secondResultVectorGEM = matrixResultInhomogeneousHard(lastMatrixForEigenvector(), firstEigenvectorsWithParameters, new ArrayList<>());
        getAfterGeneralize().get(getAfterGeneralize().size() - 1).add(secondResultVectorGEM);


        List<Integer> cantGenerate = findCoefficients(secondResultVectorGEM, pivot); //add coeff to vector and return number of vector, which cant change
        needCoefficients(secondResultVectorGEM, pivot);  //multiply and find result vector

    }

    private double[][] firstGeneralizeVector(List<Integer> pivot, double[][] resultVectorGEM) {
        double[][] vector = new double[resultVectorGEM.length][resultVectorGEM[0].length];
        for (int i = 0; i < pivot.size(); i++)
            System.arraycopy(resultVectorGEM[i], 0, vector[pivot.get(i)], 0, resultVectorGEM[0].length);

        return vector;
    }


    private void needCoefficients(double[][] cResultVector, List<Integer> pivot) {
        double[] vector = new double[cResultVector.length];

        for (int i = 0; i < pivot.size(); i++)
            for (int j = 0; j < cResultVector[0].length; j++)
                vector[pivot.get(i)] += cResultVector[i][j] * lastCoefficientList().get(lastCoefficientList().size() - 1)[j];
        lastEigenvectorList().add(vector);
    }

    private void dontNeedCoefficients(int coeffLength, List<Integer> cantGenerate) {
        lastCoefficientList().remove(lastCoefficientList().size() - 1);

        for (int indexVector = 0; indexVector < coeffLength; indexVector++) {
            if (!cantGenerate.contains(indexVector))
                hardGeneralizationWithoutCoeff(indexVector, coeffLength);
        }
    }

    private void hardGeneralizationWithoutCoeff(int indexVector, int coeffLength) {
        easyGeneralization(indexVector);
        double[] coeff = new double[coeffLength];
        coeff[indexVector] = 1.0;
        lastCoefficientList().add(coeff);
    }


    protected List<Integer> findCoefficients(double[][] cResultVector, List<Integer> pivot) {

        List<Integer> cantGenerate = new ArrayList<>();

        double[] coefficient = new double[cResultVector[0].length];
        coefficient[coefficient.length - 1] = 1.0;
        for (int nullRow = cResultVector.length - 1; nullRow >= pivot.size(); nullRow--) {
            List<Integer> notZero = notZeroInNullRowInMatrix(new ArrayList<>(), cResultVector, nullRow);

            if (notZero.size() == 1) {
                coefficient[notZero.get(0)] = 0.0;
                if (!cantGenerate.contains(notZero.get(0)))
                    cantGenerate.add(notZero.get(0));

                if (coefficient.length == 2) {
                    coefficient[1 - notZero.get(0)] = 1.0;
                    break;
                }
            } else if (notZero.size() == 2) {
                if (!cantGenerateContains(cantGenerate, notZero)) {

                    coefficient[notZero.get(0)] = cResultVector[nullRow][notZero.get(1)] * (-1);
                    coefficient[notZero.get(1)] = cResultVector[nullRow][notZero.get(0)];
                    cantGenerate.add(notZero.get(0));
                    cantGenerate.add(notZero.get(1));
                }
            }
        }

        checkCoefficientNotNull(coefficient, cantGenerate);
        int max = 0;
        while (controlResultWontBeNullVector(coefficient, pivot.size(), cResultVector) == 0 && max++ < coefficient.length) {
            for (int i = 0; i < coefficient.length; i++) {
                if (!cantGenerate.contains(i))
                    coefficient[i] = 1.0;
            }
        }
        lastCoefficientList().add(changeNegativeCoeff(coefficient));
        addCant(cantGenerate);
        return cantGenerate;
    }

    private void addCant(List<Integer> cantGenerate) {
        int[] array = new int[cantGenerate.size()];
        for (int i = 0; i < cantGenerate.size(); i++) {
            array[i] = cantGenerate.get(i);
        }
        getCantGen().add(array);

    }

    private boolean cantGenerateContains(List<Integer> cantGenerate, List<Integer> notZero) {
        for (Integer integer : notZero) {
            if (cantGenerate.contains(integer))
                return true;
        }

        return false;
    }

    private double[] changeNegativeCoeff(double[] cantGenerate) {
        if (cantGenerate[0] < 0) {
            for (int i = 0; i < cantGenerate.length; i++) {
                cantGenerate[i] *= (-1);
            }
        }

        if (isMakeResult2() && cantGenerate[0] == 0.0) {
            cantGenerate[0] = 1.0;
            cantGenerate[1] = cantGenerate[2] = 0.0;
        }

        return cantGenerate;
    }

    private double controlResultWontBeNullVector(double[] coefficient, int size, double[][] cResultVector) {
        double sum = 0;
        for (int i = 0; i < size; i++)
            for (int j = 0; j < coefficient.length; j++)
                sum += cResultVector[i][j] * coefficient[j];
        return sum;
    }

    private List<Integer> notZeroInNullRowInMatrix(List<Integer> notZero, double[][] cResultVector, int nullRow) {
        for (int resultColumn = 0; resultColumn < cResultVector[0].length; resultColumn++) {
            if (cResultVector[nullRow][resultColumn] != 0)
                notZero.add(resultColumn);
        }
        return notZero;
    }

    private void checkCoefficientNotNull(double[] coefficient, List<Integer> cantGenerate) {
        int sum = 0;
        for (double v : coefficient) sum += v;
        if (sum == 0) {
            for (int i = 0; i < coefficient.length; i++) {
                if (!cantGenerate.contains(i))
                    coefficient[i] = 1.0;
            }
        }
    }

    private double[][] makeResult() { //r+s+t...string with all previous vectors
        if (lastEigenvectorList().size() > lastCoefficientList().get(0).length && lastCoefficientList().get(0).length == 2)
            return makeResult2(getGeneralizedEigenvector().size() - 1, 0, lastEigenvectorList().size());
        return makeResult(getGeneralizedEigenvector().size() - 1, 0, lastEigenvectorList().size());
    }

    private double[][] makeResult2(int eigenvalue, int from, int to) {
        double[][] result = new double[lastEigenvectorList().get(0).length][to - from];

        int sec = lastCoefficientList().get(0).length;
        for (int i = from + sec; i < to; i++)
            for (int j = 0; j < lastEigenvectorList().get(0).length; j++)
                result[j][to - i - 1] = getGeneralizedEigenvector().get(eigenvalue).get(to - i + sec - 1)[j];

        setMakeResult2(true);


        for (int i = from; i < from + sec; i++)
            for (int j = 0; j < lastEigenvectorList().get(0).length; j++)
                result[j][sec - i + from] = getGeneralizedEigenvector().get(eigenvalue).get(from + sec - i - 1)[j];

        return result;
    }

    private double[][] makeResult(int eigenvalue, int from, int to) { //r+s+t...string with all previous vectors
        double[][] result = new double[lastEigenvectorList().get(0).length][to - from];

        for (int i = from; i < to; i++)
            for (int j = 0; j < lastEigenvectorList().get(0).length; j++)
                result[j][to - i - 1] = getGeneralizedEigenvector().get(eigenvalue).get(to - i - 1)[j];

        return result;
    }

    private void easyGeneralization(int indexOfVector) {
        getBeforeGeneralize().get(getBeforeGeneralize().size() - 1).add(makeVector(indexOfVector));
        double[] result = matrixReslutInhomogeneousEasy(lastMatrixForEigenvector(), makeVector(indexOfVector), getAfterGeneralize().get(getAfterGeneralize().size() - 1));
        lastEigenvectorList().add(result);

    }

    private boolean generalizeWithoutParameter(int orderEigenvalue) {

        if (lastCoefficientList().get(0).length == 1) {
            while (orderEigenvalue > lastEigenvectorList().size()) {
                easyGeneralization(lastEigenvectorList().size() - 1);
            }
            return true;
        }
        return false;
    }

    private double[][] makeVector(int indexOfVector) {
        double[][] result = new double[lastEigenvectorList().get(0).length][1];

        for (int i = 0; i < lastEigenvectorList().get(0).length; i++)
            result[i][0] = lastEigenvectorList().get(indexOfVector)[i];

        return result;
    }

    public void giveKernelToGeneralizedEigenvector(double[][] kernel) {
        for (int col = 0; col < kernel[0].length; col++) {
            double[] vector = new double[kernel.length];
            double[] coefficient = new double[kernel[0].length];

            coefficient[col] = 1;

            for (int row = 0; row < kernel.length; row++)
                vector[row] = kernel[row][col];

            lastEigenvectorList().add(vector);
            lastCoefficientList().add(coefficient);
        }

    }

    public void createMatrixWithCountDownEigenvalue(double[][] A, double eigenvalue) {
        double[][] matrix = new double[A.length][A.length];

        for (int i = 0; i < A.length; i++) {

            for (int j = 0; j < A.length; j++) {
                matrix[i][j] = A[i][j];

                if (i == j)
                    matrix[i][j] = roundIfNecessary(matrix[i][j] - eigenvalue);
            }
        }

        getMatricesForEigenvector().add(matrix); //add matrix (A-I*lambda)
    }

    public void removeFraction(double[][] kernel) {
        Double[] pow = new Double[kernel.length];
        Fraction fraction = new Fraction();

        for (int vector = 0; vector < kernel[0].length; vector++) {
            Arrays.fill(pow, 1.0);

            if (isFraction(pow, fraction, kernel, vector))
                multiplyVector(kernel, pow, vector, fraction);
        }
    }

    private boolean isFraction(Double[] pow, Fraction fraction, double[][] kernel, int vector) {
        boolean isFraction = false;

        for (int r = 0; r < kernel.length; r++) {
            if (kernel[r][vector] % 1 != 0.0) {
                pow[r] = fraction.denominator(String.valueOf(kernel[r][vector]));

                if (pow[r] == null) {
                    isFraction = false;
                    break;
                }

                isFraction = true;
            }
        }

        return isFraction;
    }

    private void multiplyVector(double[][] kernel, Double[] pow, int vector, Fraction fraction) {
        double leastCommonMultiple = fraction.lcm(pow);

        for (int row = 0; row < kernel.length; row++)
            kernel[row][vector] = round(kernel[row][vector] * leastCommonMultiple);
    }

    public List<double[][]> getMatricesForEigenvector() {
        return matricesForEigenvector;
    }

    public void setMatricesForEigenvector(List<double[][]> matricesForEigenvector) {
        this.matricesForEigenvector = matricesForEigenvector;
    }

    public List<List<double[]>> getVectorCoefficients() {
        return vectorCoefficients;
    }

    public void setVectorCoefficients(List<List<double[]>> vectorCoefficients) {
        this.vectorCoefficients = vectorCoefficients;
    }

    public List<List<double[]>> getGeneralizedEigenvector() {
        return generalizedEigenvector;
    }

    public void setGeneralizedEigenvector(List<List<double[]>> generalizedEigenvector) {
        this.generalizedEigenvector = generalizedEigenvector;
    }

    private List<double[]> lastCoefficientList() {
        return getVectorCoefficients().get(getVectorCoefficients().size() - 1);
    }

    private double[] lastCoefficientListValue() {
        return getVectorCoefficients().get(getVectorCoefficients().size() - 1).get(getVectorCoefficients().get(getVectorCoefficients().size() - 1).size() - 1);
    }

    private List<double[]> lastEigenvectorList() {
        return getGeneralizedEigenvector().get(getGeneralizedEigenvector().size() - 1);
    }

    private double[][] lastMatrixForEigenvector() {
        return getMatricesForEigenvector().get(getMatricesForEigenvector().size() - 1);
    }

    private List<double[]> lastEigenvectorsInBlock() {
        return getEigenvectorsInBlock().get(getEigenvectorsInBlock().size() - 1);
    }

    public double[][][] getMatricesForEigenvectorGEM() {
        return matricesForEigenvectorGEM;
    }

    public void setMatricesForEigenvectorGEM(double[][][] matricesForEigenvectorGEM) {
        this.matricesForEigenvectorGEM = matricesForEigenvectorGEM;
    }

    public int[] getCantGeneralizeVector() {
        return cantGeneralizeVector;
    }

    public void setCantGeneralizeVector(int[] cantGeneralizeVector) {
        this.cantGeneralizeVector = cantGeneralizeVector;
    }

    public void setCantGeneralizeVector(List<Integer> cantGenerate) {
        int[] vector = new int[cantGenerate.size()];
        for (int i = 0; i < cantGenerate.size(); i++) {
            vector[i] = cantGenerate.get(i);
        }
        setCantGeneralizeVector(vector);
    }

    public List<List<double[]>> getEigenvectorsInBlock() {
        return eigenvectorsInBlock;
    }

    public void setEigenvectorsInBlock(List<List<double[]>> eigenvectorsInBlock) {
        this.eigenvectorsInBlock = eigenvectorsInBlock;
    }

    public double[][] getN5and2Blocks() {
        return n5and2Blocks;
    }

    public void setN5and2Blocks(double[][] n5and2Blocks) {
        this.n5and2Blocks = n5and2Blocks;
    }

    public Integer[][] getPivots() {
        return pivots;
    }

    public void setPivots(Integer[][] pivots) {
        this.pivots = pivots;
    }

    public boolean isN5and3Blocks() {
        return n5and3Blocks;
    }

    public void setN5and3Blocks(boolean n5and3Blocks) {
        this.n5and3Blocks = n5and3Blocks;
    }

    public List<List<double[][]>> getBeforeGeneralize() {
        return beforeGeneralize;
    }

    public void setBeforeGeneralize(List<List<double[][]>> beforeGeneralize) {
        this.beforeGeneralize = beforeGeneralize;
    }

    public List<List<double[][]>> getAfterGeneralize() {
        return afterGeneralize;
    }

    public void setAfterGeneralize(List<List<double[][]>> afterGeneralize) {
        this.afterGeneralize = afterGeneralize;
    }

    public boolean isMakeResult2() {
        return makeResult2;
    }

    public void setMakeResult2(boolean makeResult2) {
        this.makeResult2 = makeResult2;
    }

    public List<int[]> getCantGen() {
        return cantGen;
    }

    public void setCantGen(List<int[]> cantGen) {
        this.cantGen = cantGen;
    }

    public List<List<double[]>> getRealCoeff() {
        return realCoeff;
    }

    public void setRealCoeff(List<List<double[]>> realCoeff) {
        this.realCoeff = realCoeff;
    }
}
