export function TablaEB(data, opciones, icons){
    //dom variables
    const $table = document.createElement('table'); $table.classList.add('table'); $table.classList.add('table-striped');
    const $thead = document.createElement('thead');
    const $tbody = document.createElement('tbody');
    const $trh = document.createElement('tr');

    //variables
    let thead = Object.keys(data[0]).map(th=>{return th.toUpperCase()});
    let standard_columns = thead.length;
    opciones = opciones.map(e=>e.toUpperCase());
    thead = [...thead, ...opciones];

    //cabecera
    thead.forEach((th)=>{
        let $th = document.createElement('th'); $th.textContent = th;
        $trh.appendChild($th);
    })

    //refactor data - add delete and edit column
    data.forEach((fila, n_fila) => {
        for(let i = 0; i< opciones.length; i++){
            Object.defineProperty(fila, opciones[i].toLowerCase(),
            {
                value: fila._id,
                writable : true,
                enumerable : true,
                configurable : true
            }
            );
        }
    });

    data.forEach((td, n_fila) => {
        
        let $tr = document.createElement('tr');
        let counter = 0;

        for (const property in td){
            if(counter < standard_columns){
                $tr.innerHTML += `<td>${cortarTexto(td[property])}</td>`;
            }else{
                $tr.innerHTML += `<td><button class="btn btn-outline-light" data-${property}="${td[property]}">${icons[property]}</button></td>`;
            }
            counter++;
        }
        $tbody.appendChild($tr);
        
    });

    function cortarTexto(texto){
        if(texto.length>25){
            return texto.slice(0,25)+'..';
        }else{
            return texto;
        }
        
    }

    $thead.appendChild($trh);
    $table.appendChild($thead);
    $table.appendChild($tbody);

    return $table;

}