import { ServiceModel } from '../models/index.js'; 

/**
 * Obtiene todos los servicios disponibles.
 */
export async function getAllServices(req, res) {
    try {
        // Lógica de negocio: llamar al Modelo
        const services = await ServiceModel.findAll();
        
        // Respuesta: enviar los datos o un array vacío si no hay
        res.status(200).json(services);
        
    } catch (error) {
        // Manejo de error y respuesta
        console.error('Error al obtener todos los servicios:', error.message);
        res.status(500).json({ 
            message: 'Error interno del servidor al procesar la lista de servicios.' 
        });
    }
}

/**
 * Obtiene el detalle de un servicio por su ID único.
 */
export async function getServiceById(req, res) {
    // 1. Obtener datos del Router
    const serviceId = req.params.id; 

    try {
        // Lógica de negocio: llamar al Modelo
        const service = await ServiceModel.findByServiceId(serviceId);

        // 2. Manejo de caso no encontrado (404)
        if (!service) {
            return res.status(404).json({ message: `Servicio con ID ${serviceId} no encontrado.` });
        }

        // 3. Respuesta exitosa
        res.status(200).json(service);

    } catch (error) {
        // Manejo de error
        console.error(`Error al obtener el servicio ${serviceId}:`, error.message);
        res.status(500).json({ 
            message: 'Error interno del servidor al obtener el detalle del servicio.' 
        });
    }
}