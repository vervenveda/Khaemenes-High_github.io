"use strict";
const REACTIONS=[{"name":"Formation of water","equation":"2H₂(g) + O₂(g) → 2H₂O(l)","reactants":[{"formula":"H₂","correct":2,"atoms":{"H":2}},{"formula":"O₂","correct":1,"atoms":{"O":2}}],"products":[{"formula":"H₂O","correct":2,"atoms":{"H":2,"O":1}}]},{"name":"Combustion of methane","equation":"CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)","reactants":[{"formula":"CH₄","correct":1,"atoms":{"C":1,"H":4}},{"formula":"O₂","correct":2,"atoms":{"O":2}}],"products":[{"formula":"CO₂","correct":1,"atoms":{"C":1,"O":2}},{"formula":"H₂O","correct":2,"atoms":{"H":2,"O":1}}]},{"name":"Formation of ammonia","equation":"N₂(g) + 3H₂(g) ⇌ 2NH₃(g)","reactants":[{"formula":"N₂","correct":1,"atoms":{"N":2}},{"formula":"H₂","correct":3,"atoms":{"H":2}}],"products":[{"formula":"NH₃","correct":2,"atoms":{"N":1,"H":3}}]},{"name":"Thermal decomposition of calcium carbonate","equation":"CaCO₃(s) → CaO(s) + CO₂(g)","reactants":[{"formula":"CaCO₃","correct":1,"atoms":{"Ca":1,"C":1,"O":3}}],"products":[{"formula":"CaO","correct":1,"atoms":{"Ca":1,"O":1}},{"formula":"CO₂","correct":1,"atoms":{"C":1,"O":2}}]},{"name":"Precipitation of calcium carbonate","equation":"Na₂CO₃(aq) + CaCl₂(aq) → CaCO₃(s) + 2NaCl(aq)","reactants":[{"formula":"Na₂CO₃","correct":1,"atoms":{"Na":2,"C":1,"O":3}},{"formula":"CaCl₂","correct":1,"atoms":{"Ca":1,"Cl":2}}],"products":[{"formula":"CaCO₃","correct":1,"atoms":{"Ca":1,"C":1,"O":3}},{"formula":"NaCl","correct":2,"atoms":{"Na":1,"Cl":1}}]},{"name":"Oxidation of magnesium","equation":"2Mg(s) + O₂(g) → 2MgO(s)","reactants":[{"formula":"Mg","correct":2,"atoms":{"Mg":1}},{"formula":"O₂","correct":1,"atoms":{"O":2}}],"products":[{"formula":"MgO","correct":2,"atoms":{"Mg":1,"O":1}}]},{"name":"Combustion of propane","equation":"C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(l)","reactants":[{"formula":"C₃H₈","correct":1,"atoms":{"C":3,"H":8}},{"formula":"O₂","correct":5,"atoms":{"O":2}}],"products":[{"formula":"CO₂","correct":3,"atoms":{"C":1,"O":2}},{"formula":"H₂O","correct":4,"atoms":{"H":2,"O":1}}]},{"name":"Zinc and hydrochloric acid","equation":"Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)","reactants":[{"formula":"Zn","correct":1,"atoms":{"Zn":1}},{"formula":"HCl","correct":2,"atoms":{"H":1,"Cl":1}}],"products":[{"formula":"ZnCl₂","correct":1,"atoms":{"Zn":1,"Cl":2}},{"formula":"H₂","correct":1,"atoms":{"H":2}}]}];

(()=>{
  const $ = selector => document.querySelector(selector);
  let current = 0;

  const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);

  function readCoefficient(id) {
    const value = Number($(id).value);
    return Number.isInteger(value) && value >= 1 ? value : null;
  }

  function readAllCoefficients(reaction) {
    const reactants = reaction.reactants.map((_, index) => readCoefficient(`#r${index}`));
    const products = reaction.products.map((_, index) => readCoefficient(`#p${index}`));
    return { reactants, products, all: [...reactants, ...products] };
  }

  function sideTotal(items, coefficients) {
    const totals = {};
    items.forEach((item, index) => {
      const coefficient = coefficients[index];
      if (coefficient === null) return;
      Object.entries(item.atoms).forEach(([element, count]) => {
        totals[element] = (totals[element] || 0) + coefficient * count;
      });
    });
    return totals;
  }

  function render() {
    const reaction = REACTIONS[current];
    $("#equationName").textContent = reaction.name;
    $("#targetEquation").textContent = reaction.equation;

    $("#coefficientGrid").innerHTML = [
      ...reaction.reactants.map((item, index) =>
        `<label>Reactant ${item.formula}<input id="r${index}" type="number" min="1" max="12" step="1" value="${item.correct}" inputmode="numeric"></label>`
      ),
      ...reaction.products.map((item, index) =>
        `<label>Product ${item.formula}<input id="p${index}" type="number" min="1" max="12" step="1" value="${item.correct}" inputmode="numeric"></label>`
      )
    ].join("");

    $("#coefficientGrid").querySelectorAll("input").forEach(input => {
      input.addEventListener("input", audit);
    });
    audit();
  }

  function audit() {
    const reaction = REACTIONS[current];
    const coefficients = readAllCoefficients(reaction);

    if (coefficients.all.some(value => value === null)) {
      $("#atomAudit").innerHTML = "";
      $("#balanceStatus").textContent =
        "Enter a positive whole-number coefficient of at least 1 for every substance.";
      $("#balanceStatus").className = "notice warning";
      return;
    }

    const left = sideTotal(reaction.reactants, coefficients.reactants);
    const right = sideTotal(reaction.products, coefficients.products);
    const elements = [...new Set([...Object.keys(left), ...Object.keys(right)])].sort();

    let atomsMatch = true;
    $("#atomAudit").innerHTML = elements.map(element => {
      const same = (left[element] || 0) === (right[element] || 0);
      atomsMatch = atomsMatch && same;
      return `<div class="${same ? "balanced" : ""}"><strong>${element}</strong><span>${left[element] || 0} → ${right[element] || 0}</span></div>`;
    }).join("");

    const commonFactor = coefficients.all.reduce((factor, value) => gcd(factor, value));
    const lowestRatio = commonFactor === 1;

    if (!atomsMatch) {
      $("#balanceStatus").textContent = "Not balanced: revise the coefficients.";
      $("#balanceStatus").className = "notice warning";
    } else if (!lowestRatio) {
      $("#balanceStatus").textContent =
        `Atom counts match, but divide every coefficient by ${commonFactor} to obtain the lowest whole-number ratio.`;
      $("#balanceStatus").className = "notice warning";
    } else {
      $("#balanceStatus").textContent =
        "Balanced in the lowest whole-number ratio: every atom type matches.";
      $("#balanceStatus").className = "notice success";
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    $("#reactionSelect").innerHTML = REACTIONS.map((reaction, index) =>
      `<option value="${index}">${reaction.name}</option>`
    ).join("");

    $("#reactionSelect").addEventListener("change", event => {
      current = Number(event.target.value);
      render();
    });

    render();
  });
})();
