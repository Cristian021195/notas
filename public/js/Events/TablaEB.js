export function TablaEB_Events(db){
    //DOM REFERENCES
    const $edit = document.getElementById('edit');
    const $notaEdit = document.getElementById('nota-edit');
    const $editForm = document.getElementById('edit-form');
    let edit = new bootstrap.Modal($edit, {
        keyboard: false
    })

    document.querySelector('table').addEventListener('click', async (e)=>{
        let clicked = e.target;
        if(clicked.dataset.eliminar !== undefined){//ELIMINAR
            try {
                let finder = await db.get(clicked.dataset.eliminar);
                let deleted = await db.remove(clicked.dataset.eliminar, finder._rev);
                if(deleted){console.log('eliminado!')}
            } catch (error) {
                console.log(error);
            }
        }else if(clicked.dataset.editar !== undefined){//EDITAR
            edit.show();
            let data;
            try {
                let finder = await db.get(clicked.dataset.editar);
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
                    if(newedit){console.log('editado!');}
                } catch (error) {
                    console.log(error);
                }
            })
            /*
                try {
                    let finder = await db.get(clicked.dataset.editar);
                    $nota.value = finder.contenido;
                    edited = finder;
                } catch (error) {
                    console.log(error);
                }
            $btnModal.click();
            $modalForm.addEventListener('submit',async (e)=>{
                e.preventDefault();
                try {
                    edited.contenido = $nota.value;
                    let newedit = await db.put(edited);
                    if(newedit){console.log('editado!'); $modal.dataset.onedit = false; $btnModal.click();}
                } catch (error) {
                    console.log(error);
                }
            })*/
        }else if(clicked.dataset.imprimir !== undefined){//IMPRIMIR SI EXISTE
            console.log('imprimir',clicked.dataset.imprimir);
        }
    })
}