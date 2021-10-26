export function Menu(){
    const $menu = document.getElementById('menu');
    const $side_menu = document.getElementById('side_menu');
    const $titulo = document.getElementById('titulo');
    const $side_titulo = document.getElementById('side_titulo');
    const $side_bar = document.getElementById('side_bar');
    const $navbar = document.getElementsByClassName('navbar')[0];
    const $toggler = document.getElementById('toggler'); $toggler.style.cssText = 'background-color:rgba(255,255,255,0.25); border:none; border-radius:50%; padding:0.5em; width:2.5em;';
    const leftTolerance = window.innerWidth / 8;
    const titulo = 'Mis notas';
    const menu = [
        /*{link:'comprobantes', dropdown:false},
        {link:'productos', dropdown:false},
        {link:'clientes', dropdown:false},
        {link:'usuarios', dropdown:false},*/
        {link:'notas', dropdown:false},
        {link:'adicionales', dropdown:true,
            sub_links:['pwa','contacto']
        }
        /*{link:'analisis', dropdown:true,
            sub_links:['resumen ventas','stock']
        },*/
    ]

    $titulo.textContent = titulo; $side_titulo.textContent = titulo;
    const $menu_f = document.createDocumentFragment();
    menu.forEach((li, n) => {
        const $dropdown_f = document.createDocumentFragment();

        if(li.dropdown){
            let $ul = document.createElement('ul'); $ul.classList.add('dropdown-menu');
            let $li = document.createElement('li'); $li.classList.add('nav-item'); $li.classList.add('dropdown');
            let $a = document.createElement('a'); $a.classList.add('nav-link'); $a.classList.add('dropdown-toggle'); $a.href = `#`; $a.textContent = `${li.link}`; $a.id = `navbarDropdown${n}`;
            $a.setAttribute('role','button'); $a.setAttribute('data-bs-toggle','dropdown'); $a.setAttribute('aria-expanded','false');

            $li.appendChild($a);
            $dropdown_f.appendChild($li);

            li.sub_links.forEach(sub_li=>{
                let $sub_li = document.createElement('li');
                let $sub_a = document.createElement('a'); $sub_a.classList.add('dropdown-item'); $sub_a.href = `#${sub_li}`; $sub_a.textContent = `${sub_li}`;
                $sub_li.appendChild($sub_a);
                $ul.appendChild($sub_li)
            })
            $li.appendChild($ul);
            $menu_f.appendChild($dropdown_f);
        }else{
            let $li = document.createElement('li'); $li.classList.add('nav-item');
            let $a = document.createElement('a'); $a.classList.add('nav-link'); $a.classList.add('active'); $a.href = `#${li.link}`; $a.textContent = `${li.link}`;
            $li.appendChild($a);
            $menu_f.appendChild($li);
        }
        
    })
    const $side_menu_f = $menu_f.cloneNode(true);
    $menu.appendChild($menu_f);
    $side_menu.appendChild($side_menu_f);
    
    //TEMA
    if($navbar.dataset.nm == 'true'){
        $navbar.classList.add('navbar-dark');
        $side_bar.classList.add('navbar-dark');
    }else{
        $navbar.classList.add('navbar-light');
        $side_bar.classList.add('navbar-light');
    }

    $navbar.style.backgroundColor = $navbar.dataset.bg; // $navbar.dataset.bg);
    $side_bar.style.backgroundColor = $side_bar.dataset.bg;
    //DETECCION DE MOVIL
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        let direccion = [];//document.querySelector('.navbar-toggler').style.display = 'none';

        window.addEventListener('touchstart', (e)=>{
            direccion.push(e.touches[0].pageX);
        });
        window.addEventListener('touchend', (e)=>{
            direccion.push(e.changedTouches[0].screenX);
            evaluarDireccion(direccion);
            direccion = [];
        });    
    }

    //FUNCIONES PROPIAS
    function evaluarDireccion(direccion){
        if(direccion[0] < leftTolerance){
            if(direccion[0] < direccion[1] && (direccion[1] / direccion[0]) > 2){
                $toggler.click();
                $toggler.blur();
            }
        }/*else{if(direccion[0] > direccion[1] && (direccion[0] / direccion[1]) > 2){$navbar_toggler.click();}}*/
    }
}
