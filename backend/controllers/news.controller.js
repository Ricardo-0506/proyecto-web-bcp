import { NewsModel } from '../models/index.js';

export async function getAllNews(req, res) {
    try {
        const newsList = await NewsModel.findAll();
        res.status(200).json(newsList);
    } catch (error) {
        console.error('Error al obtener la lista de noticias:', error.message);
        res.status(500).json({ message: 'Error al recuperar las noticias.' });
    }
}


export async function getNewsBySlug(req, res) {
    const slug = req.params.slug;

    try {
        const article = await NewsModel.findBySlug(slug);

        if (!article) {
            return res.status(404).json({ message: 'Noticia no encontrada.' });
        }

        res.status(200).json(article);
    } catch (error) {
        console.error(`Error al obtener la noticia con slug ${slug}:`, error.message);
        res.status(500).json({ message: 'Error interno al obtener el detalle de la noticia.' });
    }
}