import { ContactMessageModel } from '../models/contact-message.js';


export async function postContactMessage(req, res) {
    
        // Validación simple de datos de entrada
        const { senderName, senderEmail, subject, messageBody } = req.body;

        const contactData = { senderName, senderEmail, subject, messageBody };

        if (!senderName || !senderEmail || !subject || !messageBody) {
            return res.status(400).json({ message: 'Todos los campos son requeridos.' });
        }

        
    try {
        // 1. Guardar el mensaje en la colección 'contact_messages'
        await ContactMessageModel.create(contactData);

        // 2. Respuesta exitosa
        res.status(201).json({ message: '¡Gracias! Su mensaje ha sido enviado con éxito.' });

    } catch (error) {
        console.error('Error al procesar el mensaje de contacto:', error.message);
        res.status(500).json({ message: 'Error interno al procesar el formulario.' });
    }
}


export async function getAllContactMessages(req, res) {
    try {
        const messages = await ContactMessageModel.findAll();
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error al obtener los mensajes:', error.message);
        res.status(500).json({ message: 'Error al recuperar los mensajes de contacto.' });
    }
}