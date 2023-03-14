const renewalEl = document.querySelector(".renewing input");
const expiringEl = document.querySelector(".expiring input");
const submitBtn = document.querySelector(".btn");

// Submit button
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let renewalValue = renewalEl.value.toString();
  let expiringValue = expiringEl.value.toString();
  renewalCalc(renewalValue, expiringValue);
});

function renewalCalc(renewal, expiring) {
  let renewalValue = parseFloat(renewal);
  let expiringValue = parseFloat(expiring);
  let percentageChange = (renewalValue - expiringValue) / expiringValue;
  let premChange = renewalValue - expiringValue;
  if (percentageChange < 0.1) {
    console.log(
      `Per DL FT$${renewalValue} (was $${expiringValue}) approx ${
        percentageChange.toFixed(2) * 100
      }% increase`
    );
  } else if (percentageChange >= 0.1 && premChange < 100) {
    console.log(
      `Per DL FT$${renewalValue} (was $${expiringValue}) approx ${
        percentageChange.toFixed(2) * 100
      }% increase. Within our $100 threshold`
    );
  } else if (percentageChange >= 0.1 && premChange >= 100) {
    console.log("ren.prem.over.threshold");
  } else if (premChange < 0) {
    console.log(
      `Per DL FT$${renewalValue} (was $${expiringValue}) approx ${
        percentageChange.toFixed(2) * 100
      }% decrease`
    );
  }
}
