package bp.application.jordanFormCalculator.controller;

import bp.application.CalculatorManager;
import bp.application.jordanFormCalculator.MainJordanFormCalculator;
import bp.application.jordanFormCalculator.resources.JordanFormResource;
import bp.application.jordanFormCalculator.resources.SolutionResource;
import bp.application.outputModels.MainJordanFormCalculatorOutput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/")
public class SystemController {

    @Autowired
    private CalculatorManager calculatorManager;

    @GetMapping("")
    private String showMainSite() {
        return "index";
    }

    @PostMapping("postMinPol")
    public String solveWithMinPolynomial(@RequestBody JordanFormResource jordanFormResource) {
        calculatorManager.setMainJordanFormCalculator(new MainJordanFormCalculator(jordanFormResource));
        return "redirect: ";
    }

    @GetMapping("minPolynomial")
    public @ResponseBody
    MainJordanFormCalculatorOutput sendMinPolynomial() {
        calculatorManager.setResultWithMinPolynomial();
        return calculatorManager.getMainJordanFormCalculatorOutput();
    }

    @PostMapping("postCharPol")
    public String solveWithCharPolynomial(@RequestBody JordanFormResource jordanFormResource) {
        calculatorManager.setMainJordanFormCalculator(new MainJordanFormCalculator(jordanFormResource));
        return "redirect: ";
    }

    @GetMapping("charPolynomial")
    public @ResponseBody
    MainJordanFormCalculatorOutput charPolynomial() {
        calculatorManager.setResultWithCharPolynomial();
        return calculatorManager.getMainJordanFormCalculatorOutput();
    }

    @PostMapping("postCheckSolution")
    public String checkSolution(@RequestBody SolutionResource solutionResource) {
        calculatorManager.multiplyPJP1GetA(solutionResource);
        return "redirect: ";
    }

    @GetMapping("checkSolution")
    public @ResponseBody
    String[][] checkSolution() {
        return calculatorManager.getJordanFormString().getSolutionMatrix();
    }

    @PostMapping("postCalculateInv")
    public String calculateInv(@RequestBody SolutionResource solutionResource) {
        calculatorManager.calculateP1(solutionResource.getMatrixP());
        return "redirect: ";
    }

    @GetMapping("calculateInv")
    public @ResponseBody
    String[][] calculateInv() {
        return calculatorManager.getJordanFormString().getSolutionMatrix();
    }


}
