
require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');


const main = async () => {

    let opt = '';
    const tareas = new Tareas()

    const tareasDB = leerDB()

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB)
    }

    do {
        // Imprime el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: ')
                tareas.crearTarea(desc)
                break;

            case '2':
                tareas.listadoCompleto()
                break;

            case '3': // listar completadas
                tareas.listarPendientesCompletadas(true)
                break;

            case '4': // listar pendientes
                tareas.listarPendientesCompletadas(false)
                break;

            case '5': // completado || pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
                
                break;

            case '6': // Borrar tarea
                const id = await listadoTareasBorrar(tareas.listadoArr)

                if (id !== '0') {
                    
                    const ok = await confirmar('¿Esta seguro que desea borrar?')
                    if (ok) {
                        tareas.borrarTarea(id)
                        console.log('Tarea borrada'.red)
                    }
                }
                break;
        }

        guardarDB(tareas.listadoArr)

        await pausa()

    } while (opt !== '0');

}

main();