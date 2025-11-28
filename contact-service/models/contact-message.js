import { getDB } from '../../shared-db-config/db.js';

export class ContactMessageModel {
    static COLLECTION_NAME = 'contact_messages';

    static async create(messageData) {
        try {
            const db = getDB();
            // Añade los campos que la ruta no proporciona, pero la DB necesita
            const completeData = {
                ...messageData,
                receivedDate: new Date(),
                status: 'Abierto'
            };
            const result = await db.collection(this.COLLECTION_NAME).insertOne(completeData);
            return result.insertedId;
        } catch (error) {
            console.error('Error en ContactMessageModel.create:', error);
            throw new Error('Fallo al guardar el mensaje de contacto.');
        }
    }


    static async findAll() {
        try {
            const db = getDB();
            const messages = await db.collection(this.COLLECTION_NAME)
                .find()
                .sort({ receivedDate: -1 }) // Ordena del más nuevo al más viejo
                .toArray();
            return messages;
        } catch (error) {
            console.error('Error en ContactMessageModel.findAll:', error);
            throw new Error('No se pudieron obtener los mensajes.');
        }
    }
}