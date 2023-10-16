import {pool} from '../db_connection.js';

const get_salones_disponibles = async(req, res)=>{
    try{
    const [result] = await pool.query('SELECT * FROM salones WHERE Mesas_Disponibles > 0');
    res.json(result);
    }catch(err){
        res.status(500);
        res.send(err.message);
    }
}

const get_salon = async(req, res)=>{
    try{
    const id = req.params.id;
    const [rows] = await pool.query(`SELECT * FROM salones WHERE ID = ${id}`);
    console.log(rows);
    if(rows.length <= 0){
        return res.status(404).json({
            massage: 'No existe este salon'
        })
    }
    res.json(rows[0]);
    }catch(err){
        res.status(500);
        res.send(err.message);
    }
}

const add_salon = async (req, res) => {
    try{
        const values = req.body;
        console.log(values);
        await pool.query(`INSERT INTO salones (ID, Horario, Mesas, Mesas_Disponibles) VALUES ('${values.ID}', '${values.Horario}', '${values.Mesas}', '${values.Mesas_Disponibles}')`);
        res.json("Salon agregado");
        }catch(err){
            res.status(500);
            res.send(err.message);
        }
};

const delete_salon = async (req, res) => {
    try{
        const id = req.params.id;
        const [rows] = await pool.query(`DELETE FROM salones WHERE ID = ${id}`);
        if(rows.affectedRows == 0 ){
            return res.status(404).json({
                massage: 'No existe este salon'
            })
        }
        res.sendStatus(204);
        }catch(err){
            res.status(500);
            res.send(err.message);
        }
};

const update_salon = async (req, res) => {
    try{
        const id = req.params.id;
        const {Horario, Mesas, Mesas_Disponibles, Imagen} = req.body;
        const [query] = await pool.query('UPDATE salones SET Horario = IFNULL(?, Horario), Mesas = IFNULL(?, Mesas) , Mesas_Disponibles = IFNULL(?, Mesas_disponibles), Imagen = IFNULL(?, Imagen) WHERE ID = ?', [Horario, Mesas, Mesas_Disponibles, Imagen, id]);
        if(query.affectedRows == 0 ){
            return res.status(404).json({
                message: 'No existe este salon'
        })
    }
        const [row_updated] = await pool.query(`SELECT * FROM salones WHERE ID = ${id}`);
        res.json(row_updated[0]);
    }catch(err){
        res.status(500);
        res.send(err.message);
    }
}

 export const methods = {
    get_salones_disponibles,
    add_salon,
    get_salon,
    delete_salon,
    update_salon
};