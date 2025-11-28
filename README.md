# 🏦 BCP Web Platform

Monorepo con microservicios para la aplicación web del Banco de Crédito del Perú (BCP).

## 🏗️ Arquitectura

```
proyecto-web-bcp/
├── backend/          # Express + MongoDB (Port 3000)
├── frontend/         # Vite (Port 5173)
├── product-service/  # Microservicio (Port 3001)
├── contact-service/  # Microservicio (Port 3002)
└── api-gateway/      # Gateway (Port 4000)
```

## 🚀 Quick Start

```bash
# Instalar
git clone https://github.com/Ricardo-0506/proyecto-web-bcp.git
cd proyecto-web-bcp
npm install

# Configurar .env en cada servicio
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=bcp_db
PORT=3000  # Varía por servicio

# Ejecutar desarrollo
npm run dev
```

## 📊 Servicios

| Servicio | Puerto | URL |
|----------|--------|-----|
| Frontend | 5173 | http://localhost:5173 |
| API Gateway | 4000 | http://localhost:4000 |
| Backend | 3000 | http://localhost:3000 |
| Product Service | 3001 | http://localhost:3001 |
| Contact Service | 3002 | http://localhost:3002 |

## 🔌 Endpoints Principales

### Backend (Port 3000) [1](#2-0) 
- `GET /api/statements/:type` - Misión/Visión
- `GET /api/form-stats` - Estadísticas formulario
- `GET /api/news` - Noticias
- `POST /api/contact` - Contacto

### Gateway (Port 4000)
- `GET/POST /api-gateway/products` - Productos
- `GET/POST /api-gateway/contacts` - Contactos

## 🛠️ Tecnologías

- **Frontend**: Vite + HMR
- **Backend**: Express.js + MongoDB
- **Microservicios**: Arquitectura separada
- **Dev**: nodemon + concurrently [2](#2-1) 

## 🧪 Testing

Usa archivos `.http` con REST Client en VS Code:
- `backend/api.http` - Pruebas backend
- `api-gateway/api.http` - Pruebas gateway