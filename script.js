function simularCredito() {
        const monto = parseFloat(document.getElementById('monto').value);
        const plazo = parseInt(document.getElementById('plazo').value);
        const tasa = parseFloat(document.getElementById('tasa').value);
        
        if (monto <= 0 || plazo <= 0 || tasa <= 0) {
            mostrarResultado('Por favor, ingrese valores válidos.');
            return;
        }
        
        const tasaMensual = tasa / 100 / 12;
        const cuotaMensual = monto * (tasaMensual / (1 - Math.pow(1 + tasaMensual, -plazo)));
        
        let amortizacion = '';
        let saldoPendiente = monto;

        for (let i = 1; i <= plazo; i++) {
            const interesMensual = saldoPendiente * tasaMensual;
            const capitalAmortizado = cuotaMensual - interesMensual;
            saldoPendiente -= capitalAmortizado;
            
            amortizacion += `
                <tr>
                    <td>${i}</td>
                    <td>${cuotaMensual.toFixed(2)}</td>
                    <td>${interesMensual.toFixed(2)}</td>
                    <td>${capitalAmortizado.toFixed(2)}</td>
                    <td>${saldoPendiente.toFixed(2)}</td>
                </tr>
            `;
        }
        
        mostrarResultado(`Cuota mensual: ${cuotaMensual.toFixed(2)}`, amortizacion);
    }
        function mostrarResultado(mensaje, amortizacion) {
            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.innerHTML = `
                <p>${mensaje}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Mes</th>
                            <th>Cuota</th>
                            <th>Interés</th>
                            <th>Capital</th>
                            <th>A pagar</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${amortizacion}
                    </tbody>
                </table>
            `;
        }