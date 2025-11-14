import { FormStatsModel } from '../models/index.js';


export async function getFormStats(req, res) {
    try {
        const stats = await FormStatsModel.getStats();

        if (!stats) {
            // Si el documento de stats aún no existe (es la primera vez que se consulta)
            return res.status(200).json({ 
                totalSubmissions: 0, 
                message: 'No hay estadísticas registradas aún.' 
            });
        }
        
        // Devolvemos solo el contador principal y la última actualización
        res.status(200).json({
            totalSubmissions: stats.totalSubmissions,
            lastUpdated: stats.lastUpdated
        });
    } catch (error) {
        console.error('Error al obtener las estadísticas:', error.message);
        res.status(500).json({ message: 'Error interno al recuperar las estadísticas del formulario.' });
    }
}