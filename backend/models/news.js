import { getDB } from '../config/db.js';

export class NewsModel {
    static COLLECTION_NAME = 'news';

    static async findAll() {
        try {
            const db = getDB();
            const newsList = await db.collection(this.COLLECTION_NAME)
                .find()
                .sort({ publishDate: -1 })
                .toArray();
            return newsList;
        } catch (error) {
            console.error('Error en NewsModel.findAll:', error);
            throw new Error('No se pudieron obtener las noticias.');
        }
    }


    static async findBySlug(slug) {
        try {
            const db = getDB();
            const article = await db.collection(this.COLLECTION_NAME).findOne({ slug: slug });
            return article;
        } catch (error) {
            console.error(`Error en NewsModel.findBySlug(${slug}):`, error);
            throw new Error('No se pudo obtener el detalle de la noticia.');
        }
    }
}