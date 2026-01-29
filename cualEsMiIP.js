let velocidadSpin = 1;

function cualEsMiIP() {
    $(document).ready(function () {
        $.getJSON("https://api.ipify.org?format=json", function (data) {
            console.log(data);
            document.getElementById("ip").innerText = data.ip;
        });
    });
}

function cualEsMiIPv6() {
    $(document).ready(function () {
        $.getJSON("https://api6.ipify.org?format=json", function (data) {
            console.log(data);
            document.getElementById("ipv6").innerText = data.ip;
        }).fail(function() {
            document.getElementById("ipv6").innerText = "IPv6 no disponible";
        });
    });
}

function spin() {
    const ip = document.getElementById("ip");
    const ipv6 = document.getElementById("ipv6");

    velocidadSpin += velocidadSpin * .1; // Aumenta la velocidad en un 10% cada vez que se presiona
    let segundos;
    
     // Puedes ajustar esta velocidad según tus preferencias
    segundos = 1/(velocidadSpin); // Divide por 2 para hacer que gire más rápido

    ip.style.animation = "spin3d "+segundos+"s linear infinite";
    ipv6.style.animation = "spin3d "+segundos+"s linear infinite";
    // animation: spin3d 2s linear infinite;
}

//clase no usada, no se para de girar!
function stopSpin() {   
    const ip = document.getElementById("ip");
    const ipv6 = document.getElementById("ipv6");
    
    ip.classList.remove("spin");
    ipv6.classList.remove("spin");
}

function copiarIp() {
    const ip = document.getElementById("ip").innerText;
    const textoACopiar = ip;  
    navigator.clipboard.writeText(textoACopiar).then(function() {
        copiaOk();
        console.log('Texto copiado al portapapeles: ' + textoACopiar);
    }, function(err) {
        console.error('Error al copiar el texto: ', err);
    });
}

function copiaOk() {
    //TOAST:
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = "¡IP copiada al portapapeles!";
    document.body.appendChild(toast);
    
    showToast("¡IP copiada al portapapeles!");

    setTimeout(function() {
        document.body.removeChild(toast);
    }, 3000);
}

function showToast(mensaje) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = mensaje;
    document.body.appendChild(toast);
    
    setTimeout(function() {
        toast.classList.add("show");
    }, 100);

    // Quitar clase show después de 2.5 segundos
    setTimeout(function() {
        toast.classList.remove("show");
    }, 2500);
    
    // Eliminar el elemento del DOM después de la animación
    setTimeout(function() {
        document.body.removeChild(toast);
    }, 3000);
}


document.addEventListener("DOMContentLoaded", function() {
    
    const button = document.getElementById("spinButton");
    
    // Cuando presiona el botón - empieza a girar
    button.addEventListener("mousedown", spin);

    button.addEventListener("mousedown", copiarIp);
    
    // Cuando suelta el botón - deja de girar
    // button.addEventListener("mouseup", stopSpin);
    
    // También dejar de girar si el mouse sale del botón mientras está presionado
    // button.addEventListener("mouseleave", stopSpin);
    
    // Soporte para dispositivos táctiles
    button.addEventListener("touchstart", spin);
    // button.addEventListener("touchend", stopSpin);
});