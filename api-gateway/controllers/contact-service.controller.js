import fetch from 'node-fetch';

const CONTACT_SERVICE_URL = 'http://localhost:3002/api/contacts';

export async function postContactMessage(req, res) {
    const { senderName, senderEmail, subject, messageBody } = req.body;
    // Validar que todos los campos requeridos estén presentes
    if (!senderName || !senderEmail || !subject || !messageBody) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }   
    const contactData = { senderName, senderEmail, subject, messageBody };
    try {
        const response = await fetch(CONTACT_SERVICE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contactData)
        });
        if (!response.ok) {
            throw new Error(`Error al enviar el mensaje de contacto: ${response.statusText}`);
        }
        const result = await response.json();
        res.status(201).json(result);
    } catch (error) {
        console.error('Error al enviar el mensaje de contacto:', error.message);
        res.status(500).json({ message: 'Error al procesar el mensaje de contacto.' });
    }
}

export async function getAllContactMessages(req, res) {
    try {
        const response = await fetch(`${CONTACT_SERVICE_URL}/messages`);
        if (!response.ok) {
            throw new Error(`Error al obtener los mensajes de contacto: ${response.statusText}`);
        }
        const messages = await response.json();
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error al obtener los mensajes de contacto:', error.message);
        res.status(500).json({ message: 'Error al recuperar los mensajes de contacto.' });
    }
}