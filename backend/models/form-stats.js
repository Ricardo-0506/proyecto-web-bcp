import { getDB } from '../../shared-db-config/db.js';

export class FormStatsModel {
    static COLLECTION_NAME = 'form_submissions_stats';
    static STATS_ID = 'stats-contacto-global';


    static async getStats() {
        try {
            const db = getDB();
            const stats = await db.collection(this.COLLECTION_NAME).findOne({ _id: this.STATS_ID });
            return stats;
        } catch (error) {
            console.error('Error en FormStatsModel.getStats:', error);
            throw new Error('No se pudieron obtener las estadísticas.');
        }
    }

    static async incrementTotalSubmissions() {
        try {
            const db = getDB();
            const result = await db.collection(this.COLLECTION_NAME).updateOne(
                { _id: this.STATS_ID },
                { 
                    $inc: { totalSubmissions: 1 }, // Incrementa el contador
                    $set: { lastUpdated: new Date() } // Actualiza la fecha
                },
                { upsert: true } // Si el documento no existe, lo crea
            );
            return result;
        } catch (error) {
            console.error('Error en FormStatsModel.incrementTotalSubmissions:', error);
            throw new Error('Fallo al actualizar el contador de estadísticas.');
        }
    }
}