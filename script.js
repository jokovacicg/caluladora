document.addEventListener('DOMContentLoaded', function () {
  // Select all your input fields
  var inputs = document.querySelectorAll('#volumenVentaPOS, #participacionTD, #participacionTC, #comisionVarCompTD, #comisionVarCompTC, #comisionFijaCompUFTD, #comisionFijaCompUFTC');

  // Attach event listeners to each input field
  inputs.forEach(function (input) {
    input.addEventListener('input', calculateCommissions);
  });

  // Initial calculation call
  calculateCommissions();
});

function calculateCommissions() {
  const volumenVentaPOS = parseFloat(document.getElementById('volumenVentaPOS').value.replace(/[^0-9-]+/g, "")) || 0;
  const participacionTD = parseFloat(document.getElementById('participacionTD').value.replace(",",".")) / 100 || 0;
  const participacionTC = parseFloat(document.getElementById('participacionTC').value.replace(",",".")) / 100 || 0;
  const comisionVarCompTD = parseFloat(document.getElementById('comisionVarCompTD').value.replace(",",".")) || 0;
  const comisionVarCompTC = parseFloat(document.getElementById('comisionVarCompTC').value.replace(",",".")) || 0;
  const comisionFijaCompUFTD = parseFloat(document.getElementById('comisionFijaCompUFTD').value.replace(",",".")) || 0;
  const comisionFijaCompUFTC = parseFloat(document.getElementById('comisionFijaCompUFTC').value.replace(",",".")) || 0;
  const comisionHealthatomTD = parseFloat(document.getElementById('comisionHealthatomTD').value.replace(",",".")) || 0;
  const comisionHealthatomTC = parseFloat(document.getElementById('comisionHealthatomTC').value.replace(",",".")) || 0;


  // Check if any of the required fields are missing or NaN
  if (isNaN(volumenVentaPOS) || isNaN(participacionTD) || isNaN(participacionTC) || 
      isNaN(comisionVarCompTD) || isNaN(comisionVarCompTC) || isNaN(comisionFijaCompUFTD) || isNaN(comisionFijaCompUFTC) ||
      isNaN(comisionHealthatomTD)  || isNaN(comisionHealthatomTC)) {
    // If any field is missing, show an error message
    document.getElementById('error-message').textContent = 'Por favor, complete todos los campos con valores válidos.';
    return; // Exit the function early
  } else {
    // If all fields are present, clear any error message
    document.getElementById('error-message').textContent = '';
  }

  // Calculate total commission for TD and TC
  const comisionTotalCompTD = (comisionVarCompTD + (comisionFijaCompUFTD * 36500 / 60000 * 100));
  const comisionTotalCompTC = (comisionVarCompTC + (comisionFijaCompUFTC * 36500 / 60000 * 100));

  // Placeholder values for Total Tbk and Healthatom, replace with actual calculations as needed
  const totalTbk = volumenVentaPOS * (participacionTD * comisionTotalCompTD /100 + participacionTC * comisionTotalCompTC /100);

  console.log(volumenVentaPOS, participacionTD, comisionTotalCompTD)

  // Placeholder values for Total Healthatom, replace with actual calculations as needed
  const totalHealthatom = volumenVentaPOS * (participacionTD * comisionHealthatomTD /100 + participacionTC * comisionHealthatomTC /100);

  // Placeholder values for Sobrecosto mensual, replace with actual calculations as needed
  const sobrecostoMensual = (totalTbk - totalHealthatom);

  // Update the DOM with the calculated values
  document.getElementById('comisionTotalCompTD').textContent = comisionTotalCompTD.toFixed(2) + '%';
  document.getElementById('comisionTotalCompTC').textContent = comisionTotalCompTC.toFixed(2) + '%';
  document.getElementById('comisionHealthatomTD').textContent = comisionHealthatomTD + '%';
  document.getElementById('comisionHealthatomTC').textContent = comisionHealthatomTC + '%';
  document.getElementById('totalTbk').textContent = Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(totalTbk);
  document.getElementById('totalHealthatom').textContent = Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(totalHealthatom);
  document.getElementById('sobrecostoMensual').textContent = Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(sobrecostoMensual);
}

// You can add event listeners here if you want to calculate commissions on input change rather than button click
document.addEventListener('DOMContentLoaded', function () {
  // Select all your input fields
  var inputs = document.querySelectorAll('#volumenVentaPOS, #participacionTD, #participacionTC, #comisionVarCompTD, #comisionVarCompTC, #comisionFijaCompUFTD, #comisionFijaCompUFTC, #comisionHealthatomTD, #comisionHealthatomTC');

  // Attach event listeners to each input field
  inputs.forEach(function (input) {
    input.addEventListener('input', calculateCommissions);
  });
});


// Handle data types

document.querySelectorAll("input[data-type='currency']").forEach(function(input) {
    input.addEventListener('keyup', function() {
        formatCurrency(this);
    });

    input.addEventListener('blur', function() {
        formatCurrency(this);
    });
});

function formatCurrency(input) {
    var input_val = input.value;

    if (input_val === "") { return; }

    var original_len = input_val.length;
    var caret_pos = input.selectionStart;

    input_val = formatNumber(input_val);
    input_val = "$" + input_val;

    input.value = input_val;

    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input.setSelectionRange(caret_pos, caret_pos);
}

document.querySelectorAll("input[data-type='percentage']").forEach(function(input) {
    input.addEventListener('blur', function() {
        formatPercentage(this);
    });
});

function formatNumber(n) {
    // Format whole number part with commas
    var parts = n.split(",");
    parts[0] = parts[0].replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
}

function formatPercentage(input) {
    var input_val = input.value;

    if (input_val === "") { return; }

    input_val = input_val.replace("%", "")
    input_val = input_val.replace(".", ",")

    var original_len = input_val.length;
    var caret_pos = input.selectionStart;

    // Format input value
    input_val = formatNumber(input_val);
    input_val = input_val + "%";

    input.value = input_val;

    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input.setSelectionRange(caret_pos, caret_pos);
}