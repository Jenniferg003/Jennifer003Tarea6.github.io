function calcularCredito() {
    const ms = parseFloat(document.getElementById('valorVivienda').value) * 0.8;
    const tasaInteres = parseFloat(document.getElementById('tasaInteres').value) / 100 / 12;
    const p = parseInt(document.getElementById('plazo').value) * 12;

    const pm = (ms * tasaInteres) / (1 - Math.pow(1 + tasaInteres, -p));
    const salarioMinimoRequerido = pm / 0.4;

    const salarioNeto = parseFloat(document.getElementById('salario').value);
    const fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
    const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();

    let resultadoHtml = `<p>Monto a pagar mensualmente: $${pm.toFixed(2)}</p>`;
    resultadoHtml += `<p>Salario mínimo requerido: $${salarioMinimoRequerido.toFixed(2)}</p>`;
    resultadoHtml += `<p>${salarioNeto >= salarioMinimoRequerido ? 'Monto de salario suficiente para el crédito' : 'Monto de salario insuficiente'}</p>`;
    resultadoHtml += `<p>${(edad > 22 && edad < 55) ? 'Cliente con edad suficiente para crédito' : 'Cliente no califica para crédito por edad'}</p>`;
    resultadoHtml += `<p>Porcentaje a financiar: ${(ms / parseFloat(document.getElementById('valorVivienda').value) * 100).toFixed(2)}%</p>`;

    document.getElementById('resultado').innerHTML = resultadoHtml;

    // Guardar en LocalStorage
    localStorage.setItem('creditoData', JSON.stringify({
        email: document.getElementById('email').value,
        nombre: document.getElementById('nombre').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        salario: document.getElementById('salario').value,
        tasaInteres: document.getElementById('tasaInteres').value,
        plazo: document.getElementById('plazo').value,
        valorVivienda: document.getElementById('valorVivienda').value
    }));
}

function mostrarProyeccion() {
    const ms = parseFloat(document.getElementById('valorVivienda').value) * 0.8;
    const tasaInteres = parseFloat(document.getElementById('tasaInteres').value) / 100 / 12;
    const p = parseInt(document.getElementById('plazo').value) * 12;

    const pm = (ms * tasaInteres) / (1 - Math.pow(1 + tasaInteres, -p));
    let saldo = ms;

    let proyeccionHtml = '<h2 style="color: #007bff; text-align: center">Crédito Happy Eart</h2>';
     proyeccionHtml += '<h5 style="color: #007bff; text-align: center">Proyección de Crédito</h5>';
    proyeccionHtml += '<table class="table" style="width: 100%; border-collapse: collapse; margin-top: 10px;">';
    proyeccionHtml += '<thead style="background-color: #f8f9fa;"><tr><th>Mes</th><th>Pago Mensual</th><th>Intereses</th><th>Amortización</th><th>Saldo</th></tr></thead><tbody>';
    
    for (let mes = 1; mes <= p; mes++) {
        const interes = saldo * tasaInteres;
        const amortizacion = pm - interes;
        saldo -= amortizacion;
        proyeccionHtml += `<tr><td>${mes}</td><td>${pm.toFixed(2)}</td><td>${interes.toFixed(2)}</td><td>${amortizacion.toFixed(2)}</td><td>${saldo.toFixed(2)}</td></tr>`;
    }

    proyeccionHtml += '</tbody></table>';
    document.getElementById('proyeccion').innerHTML = proyeccionHtml;
}

// Cargar datos de LocalStorage al iniciar
window.onload = function() {
    const data = JSON.parse(localStorage.getItem('creditoData'));
    if (data) {
        document.getElementById('email').value = data.email;
        document.getElementById('nombre').value = data.nombre;
        document.getElementById('fechaNacimiento').value = data.fechaNacimiento;
        document.getElementById('salario').value = data.salario;
        document.getElementById('tasaInteres').value = data.tasaInteres;
        document.getElementById('plazo').value = data.plazo;
        document.getElementById('valorVivienda').value = data.valorVivienda;
        document.querySelector('output').value = data.plazo;
    }
};