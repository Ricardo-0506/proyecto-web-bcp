import { getDB } from '../../shared-db-config/db.js';
import { ObjectId } from 'mongodb';

export class ServiceModel {
    
    // Método estático para obtener todos los servicios
    static async findAll() {
        try {
            const db = getDB();
            // Llama directamente al driver para la operación find()
            const services = await db.collection('services').find().toArray();
            return services;
        } catch (error) {
            console.error('Error en ServiceModel.findAll:', error);
            throw new Error('No se pudieron obtener los servicios.');
        }
    }

    // Método estático para obtener un servicio por su serviceId
    static async findByServiceTerm(terms) {
        try {
            const db = getDB();
            // Normaliza el término de búsqueda
            const regex = new RegExp(terms, 'i');
            // Llama directamente al driver para la operación findOne()
            const service = await db.collection('services').findOne({ nombre: { $regex: regex } });
            return service;
        } catch (error) {
            console.error('Error en ServiceModel.findByServiceId:', error);
            throw new Error('No se pudo encontrar el servicio.');
        }
    }
    
    // Método estático para crear un nuevo servicio
    static async create(serviceData) {
        try {
            const db = getDB();
            // Llama directamente al driver para la operación insertOne()
            const result = await db.collection('services').insertOne(serviceData);
            // Retorna el ID del nuevo documento insertado
            return result.insertedId; 
        } catch (error) {
            console.error('Error en ServiceModel.create:', error);
            throw new Error('Fallo al crear el servicio.');
        }
    }

    static async update(serviceId, updateData) {
        try{
            const db = getDB();
            const objectId = new ObjectId(serviceId);
            const result = await db.collection('services').updateOne(
                { _id: objectId },
                { $set: updateData }
            );
            return {
                modifiedCount: result.modifiedCount,
                matchedCount: result.matchedCount
            };
        }catch(error){
            console.error('Error en ServiceModel.update:', error);
            throw new Error('Fallo al actualizar el servicio.');
        }
    }

    static async delete(serviceId) {
        try{
            const db = getDB();
            const objectId = new ObjectId(serviceId);
            const result = await db.collection('services').deleteOne(
                { _id: objectId }
            );
            return result.deletedCount;
        }catch(error){
            console.error('Error en ServiceModel.delete:', error);
            throw new Error('Fallo al eliminar el servicio.');
        }
    }
}