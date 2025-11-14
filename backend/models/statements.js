import { getDB } from '../config/db.js';

export class StatementModel {
    static COLLECTION_NAME = 'company_statements';


    static async findByType(type) {
        try {
            const db = getDB();
            const statement = await db.collection(this.COLLECTION_NAME).findOne({ type: type });
            return statement;
        } catch (error) {
            console.error(`Error en StatementModel.findByType(${type}):`, error);
            throw new Error('No se pudo obtener la declaración corporativa.');
        }
    }
}