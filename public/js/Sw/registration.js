export async function registrationSW(){
    var url = window.location.href;
    var swLocation = '/notas/sw.js';
    if ( navigator.serviceWorker ) {
        if ( url.includes('localhost') ) {
            swLocation = '/sw.js';
        }
        try {
            let registrado = await navigator.serviceWorker.register( swLocation );
            console.log(registrado);
        } catch (error) {
            console.log('error al registrar')
        }
        

    }
}

