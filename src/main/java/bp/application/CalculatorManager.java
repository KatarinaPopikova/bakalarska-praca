package bp.application;

import bp.application.jordanFormCalculator.JordanForm;
import bp.application.jordanFormCalculator.MainJordanFormCalculator;
import bp.application.jordanFormCalculator.resources.SolutionResource;
import bp.application.outputModels.JordanFormString;
import bp.application.outputModels.MainJordanFormCalculatorOutput;
import org.springframework.stereotype.Service;

@Service
public class CalculatorManager {
    private MainJordanFormCalculator mainJordanFormCalculator;
    private JordanFormString jordanFormString;
    private MainJordanFormCalculatorOutput mainJordanFormCalculatorOutput;


    public CalculatorManager() {
    }

    public void setResultWithCharPolynomial() {
        getMainJordanFormCalculator().setTrace();
        getMainJordanFormCalculator().characteristicPolynomial();

        setDataJordanForm();
    }

    public void setResultWithMinPolynomial() {
        getMainJordanFormCalculator().setTrace();
        getMainJordanFormCalculator().minimalPolynomial();

        setDataJordanForm();
    }

    public void setDataJordanForm() {
        int error = 0;
        if (getMainJordanFormCalculator().getEigenvalues().getImaginaryRoots() != null)
            error = 4;
        else if (getMainJordanFormCalculator().isAllEigenValues()) {
            getMainJordanFormCalculator().createP();
            getMainJordanFormCalculator().createPJPInv();
        } else
            error = 3; //error in string mainmatrix
        setMainJordanFormCalculatorOutput(new MainJordanFormCalculatorOutput(getMainJordanFormCalculator(), error));
    }

    //------------------------CHECK---SOLUTION-----------------------------

    public void multiplyPJP1GetA(SolutionResource solutionResource) {
        JordanForm jordanForm = new JordanForm(solutionResource);
        setJordanFormString(new JordanFormString(jordanForm.getMatrixA(), jordanForm.getError()));
    }

    public void calculateP1(double[][] P) {
        JordanForm jordanForm = new JordanForm(P);
        setJordanFormString(new JordanFormString(jordanForm.getMatrixPInv(), jordanForm.getError()));
    }

    public MainJordanFormCalculator getMainJordanFormCalculator() {
        return mainJordanFormCalculator;
    }

    public void setMainJordanFormCalculator(MainJordanFormCalculator mainJordanFormCalculator) {
        this.mainJordanFormCalculator = mainJordanFormCalculator;
    }

    public JordanFormString getJordanFormString() {
        return jordanFormString;
    }

    public void setJordanFormString(JordanFormString jordanFormString) {
        this.jordanFormString = jordanFormString;
    }

    public MainJordanFormCalculatorOutput getMainJordanFormCalculatorOutput() {
        return mainJordanFormCalculatorOutput;
    }

    public void setMainJordanFormCalculatorOutput(MainJordanFormCalculatorOutput mainJordanFormCalculatorOutput) {
        this.mainJordanFormCalculatorOutput = mainJordanFormCalculatorOutput;
    }
}
