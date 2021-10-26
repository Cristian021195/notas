export function Modal(tipo){
    const $dom = document.createElement('div');
    if(tipo.hasForm){
        $dom.innerHTML = `
        <form class="modal-dialog" id="modal-form">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel">Nueva nota</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <textarea class="form-control" placeholder="Nueva nota aqui.." id="nota" name="nota"></textarea>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
          </div>
        </form>
        `;
    }else{
        $dom.innerHTML = `
        <div class="modal-dialog" id="modal-form">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel">Solo info</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Solo texto</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary">Button</button>
            </div>
          </div>
        </div>
        `;
    }
    return $dom;
}