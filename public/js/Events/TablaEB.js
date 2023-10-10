//DOM REFERENCES
const $edit = document.getElementById('edit');
const $notaEdit = document.getElementById('nota-edit');
const $editForm = document.getElementById('edit-form');
const $section = document.getElementById('section');
const $status = document.getElementById('status');
let finder; let deleted; let clicked; let data;

/*$status.addEventListener('click',(e)=>{ // reset
    finder = undefined; deleted = undefined; clicked  = undefined; data  = undefined;
})*/
export function TablaEB_Events(db){    
    let edit = new bootstrap.Modal($edit, {
        keyboard: false
    })
    
    /*document.querySelector('body').addEventListener('click', async (e)=>{
        console.log(edit._isShown)
    });*/

    document.querySelector('table').addEventListener('click', async (e)=>{        
        clicked = e.target;
        if(clicked.dataset.eliminar !== undefined){//ELIMINAR
            $section.innerHTML = '';
            try {
                finder = await db.get(clicked.dataset.eliminar);
                deleted = await db.remove(clicked.dataset.eliminar, finder._rev);
            } catch (error) {
                console.log(error);
            }
        }else if(clicked.dataset.editar !== undefined){//EDITAR            
            edit.show();            
            try {
                finder = await db.get(clicked.dataset.editar);
                data = finder;
                $notaEdit.value = finder.contenido;
            } catch (error) {
                console.log(error);
            }
            $editForm.addEventListener('submit',async (e)=>{
                e.preventDefault();
                try {                    
                    data.contenido = $notaEdit.value;
                    let newedit = await db.put(data);
                    if(newedit){
                        edit.hide();
                    }
                } catch (error) {
                    //console.log(error);
                }
            })
        }else if(clicked.dataset.imprimir !== undefined){//IMPRIMIR SI EXISTE
            //console.log('imprimir',clicked.dataset.imprimir);
        }
    })
}