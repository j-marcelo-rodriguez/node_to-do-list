const Tarea = require('./tarea')
/* 
    _listado:
    { 'uuid-2131-21321: {id: 123, desc: 'wedw', completadoEn: 123123}' }
*/
class Tareas {
    _listado = {}

    get listadoArr() {
        const listado = []
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })

        return listado
    }

    constructor() {
        this._listado = {}
    }

    borrarTarea(id = '') {

        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        })
    }

    // se crea una nueva tarea y se la agrega como propiedad al objeto "_listado"
    crearTarea(desc = '') {
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }

    listadoCompleto() {

        console.log()

        this.listadoArr.forEach((tarea, i) => {

            const idx = `${i + 1}`.green
            const { desc, completadoEn } = tarea
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red

            console.log(`${idx}. ${desc} :: ${estado}`)

        })
    }

    listarPendientesCompletadas(completadas = true) {

        console.log()
        let contador = 0

        this.listadoArr.forEach(tarea => {

            const { desc, completadoEn } = tarea
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red

            if (completadas) {

                if (completadoEn) {

                    contador ++
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`)
                    
                }
                
            } else {
                
                if (!completadoEn) {

                    contador ++
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`)
                    
                }

            }

        })

    }

    toggleCompletadas(ids = []) {

        ids.forEach(id => {
            // console.log(this._listado)
            const tarea = this._listado[id]

            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach(tarea => {

            if (!ids.includes(tarea.id)) {
                const tareaPendiente = this._listado[tarea.id]

                tareaPendiente.completadoEn = null
            }
        })
    }
}

module.exports = Tareas