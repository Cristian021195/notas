//SW
import {registrationSW} from './Sw/registration.js';


//COMPONENTES DOM
import {Menu} from './Components/Menu.js';
import {TablaEB} from './Components/TablaEB.js';
//import {Notas} from './Components/Notas.js';
import {TablaEB_Events} from './Events/TablaEB.js';

//VARIABLES DOM
const $modal = document.getElementById('modal');
const $section = document.getElementById('section');
const $modalForm = document.getElementById('modal-form');

//INDEXDB
var db = new PouchDB('notas');
db.changes({
    since:'now',
    live:true
}).on('change', UINotas)

//INICIO SCRIPTS
registrationSW();

Menu();
//Notas();
UINotas();

$modalForm.addEventListener('submit', async(e)=>{
    e.preventDefault();
    let data = new FormData($modalForm);
    let contenido = Object.fromEntries(data);
    let todo = {
        _id: new Date().toISOString(),
        contenido:contenido.nota,
        completada:false
    }
    try {
        let guardado = await db.put(todo);
        if(guardado){
            console.log('agregada!');
            $modalForm.reset();
        }
    } catch (error) {
        console.log('error!');
    }
})

function UINotas(){
    $section.innerHTML = '';
    let arr_data = [];
    db.allDocs({include_docs:true, descending:true}, (err, doc)=>{
        arr_data = doc.rows.map(doc=>{if(doc.doc){delete doc.doc._rev; return doc.doc}});
        if(arr_data.length > 0){
            $section.appendChild(TablaEB(arr_data, ['editar','eliminar'], {editar:'✏️', eliminar:'🗑️'}));
            TablaEB_Events(db);
        }
    });
}


