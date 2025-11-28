import { ServiceModel } from '../models/services.js'; 

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
export async function getServiceByTerm(req, res) {
    // 1. Obtener datos del Router
    const searchTerm = req.query.q; 

    try {
        // Lógica de negocio: llamar al Modelo
        const service = await ServiceModel.findByServiceTerm(searchTerm);

        // 2. Manejo de caso no encontrado (404)
        if (!service) {
            return res.status(404).json({ message: `Servicio con nombre ${searchTerm} no encontrado.` });
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

/**
 * Crea un nuevo servicio.
 */

export async function createService(req, res) {
    // 1. Desestructurar los datos del cuerpo de la solicitud
    const {nombre, imagen, membresia, millasWelc, descripcion, beneficios} = req.body;

    const dataService = {nombre, imagen, membresia, millasWelc, descripcion, beneficios};
    // 2. Validar que todos los campos requeridos estén presentes
    if(!nombre || !membresia || !descripcion) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

    try{
        const newServiceId = await ServiceModel.create(dataService);
        res.status(201).json({ message: 'Servicio creado exitosamente.', serviceId: newServiceId });

    }catch(error){
        console.error('Error al crear el servicio:', error.message);
        res.status(500).json({ message: 'Error interno al crear el servicio.' });
    }
}

/**
 * actualiza un servicio existente.
 */

export async function updateService(req, res) {
    const serviceId = req.params.id;
    const updateData = req.body;
    
    try{
        const {modifiedCount, matchedCount} = await ServiceModel.update(serviceId, updateData);

        if(matchedCount === 0){
            return res.status(404).json({ message: `Servicio con nombre ${serviceId} no encontrado.` });
        }

        if(modifiedCount === 0){
            return res.status(200).json({ message: `El servicio ya contiene esa información, no se requiere actualización.` });
        }
        res.status(200).json({ message: 'Servicio actualizado exitosamente.' });
    }catch(error){
        console.error(`Error al actualizar el servicio ${serviceId}:`, error.message);
        res.status(500).json({ message: 'Error interno al actualizar el servicio.' });
    }
}

/**
 * Elimina un servicio por su ID.
 */

export async function deleteService(req, res) {
    const serviceId = req.params.id;

    try{
        const deletedCount = await ServiceModel.delete(serviceId);
        if(deletedCount === 0){
            return res.status(404).json({ message: `Servicio con nombre ${serviceId} no encontrado.` });
        }
        res.status(200).json({ message: 'Servicio eliminado exitosamente.' });
    }catch(error){
        console.error(`Error al eliminar el servicio ${serviceId}:`, error.message);
        res.status(500).json({ message: 'Error interno al eliminar el servicio.' });
    }
}