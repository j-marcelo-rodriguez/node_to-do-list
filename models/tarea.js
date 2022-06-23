const { v4: uuidv4 } = require('uuid');

/* 
    { uuid: 12233-34543, desc: 'lo que sea', completadoEn: 2022 }
*/

class Tarea {
    id = ''
    desc = ''
    completadoEn = null

    constructor(desc) {
        this.id = uuidv4()
        this.desc = desc
        this.completadoEn = null
    }
}

module.exports = Tarea