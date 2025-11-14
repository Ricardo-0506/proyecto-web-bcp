import { getDB } from '../config/db.js';

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
    static async findByServiceId(serviceId) {
        try {
            const db = getDB();
            // Llama directamente al driver para la operación findOne()
            const service = await db.collection('services').findOne({ serviceId: serviceId });
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
    
}