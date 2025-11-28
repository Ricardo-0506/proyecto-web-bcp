import fetch from 'node-fetch';

const PRODUCT_SERVICE_URL = 'http://localhost:3001/api/services';

export async function getAllProducts(req, res) {
    try {
        const response = await fetch(PRODUCT_SERVICE_URL);

        if (!response.ok) {
            throw new Error(`Error al obtener los productos: ${response.statusText}`);
        }

        const products = await response.json();
        res.status(200).json(products);

    } catch (error) {
        console.error('Error al obtener los productos:', error.message);
        res.status(500).json({ message: 'Error al recuperar los productos.' }); 
    }
}

export async function getProductByTerm(req, res) {
    const searchTerm = req.query.q;
    try {
        const response = await fetch(`${PRODUCT_SERVICE_URL}/search?q=${searchTerm}`);
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: `Producto con término ${searchTerm} no encontrado.` });
            }
            throw new Error(`Error al obtener el producto: ${response.statusText}`);
            }

        const product = await response.json();
        res.status(200).json(product);
        
        } catch (error) {
        console.error(`Error al obtener el producto con término ${searchTerm}:`, error.message);
        res.status(500).json({ message: 'Error al recuperar el producto.' }); 
    }
}

export async function createProduct(req, res) {
    const {nombre, imagen, membresia, millasWelc, descripcion, beneficios} = req.body;

    // 2. Validar que todos los campos requeridos estén presentes
    if(!nombre || !membresia || !descripcion) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }
    
    const dataService = {nombre, imagen, membresia, millasWelc, descripcion, beneficios};

    try {
        const response = await fetch(PRODUCT_SERVICE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataService)
        });
        if (!response.ok) {
            throw new Error(`Error al crear el producto: ${response.statusText}`);
        }
        const responseData = await response.json();
        res.status(201).json({ message: 'Producto creado exitosamente.', serviceId: responseData.serviceId});
    }catch (error) {
        console.error('Error al crear el producto:', error.message);
        res.status(500).json({ message: 'Error al crear el producto.' }); 
    }
}

export async function updateProduct(req, res) {
    const productId = req.params.id;
    const updateData = req.body;
    try {
        const response = await fetch(`${PRODUCT_SERVICE_URL}/${productId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
        });

        if (response.status === 200) {
            const responseData = await response.json();
            return res.status(200).json(responseData); // Devuelve el mensaje del servidor
        }

        if (response.status === 204) {
            return res.status(200).json({ message: 'El servicio ya está actualizado.' });
        }

        if (response.status === 404) {
            return res.status(404).json({ message: `Producto con ID ${productId} n encontrado.` });
        }

        // Manejo de otros errores
        if (!response.ok) {
            throw new Error(`Error al actualizar el producto: ${response.statusText}`);
        }
    }catch (error) {
        console.error(`Error al actualizar el producto con ID ${productId}:`, error.message);
        res.status(500).json({ message: 'Error al actualizar el producto.' }); 
    }
}

export async function deleteProduct(req, res) {
    const productId = req.params.id;
    try {
        const response = await fetch(`${PRODUCT_SERVICE_URL}/${productId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: `Producto con ID ${productId} no encontrado.` });
            }
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente.' });
    }catch (error) {
        console.error(`Error al eliminar el producto con ID ${productId}:`, error.message);
        res.status(500).json({ message: 'Error al eliminar el producto.' }); 
    }
}
