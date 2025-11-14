import { StatementModel } from '../models/index.js';

export async function getStatementByType(req, res) {
    const rawType = req.params.type; 
    
    // Normalizar el parámetro a 'Vision' o 'Mission' (primera letra mayúscula)
    const type = rawType.charAt(0).toUpperCase() + rawType.slice(1).toLowerCase();

    try {
        const statement = await StatementModel.findByType(type);

        if (!statement) {
            return res.status(404).json({ message: `Declaración de tipo ${rawType} no encontrada.` });
        }

        res.status(200).json(statement);
    } catch (error) {
        console.error(`Error al obtener la declaración ${rawType}:`, error.message);
        res.status(500).json({ message: 'Error interno al consultar la declaración.' });
    }
}