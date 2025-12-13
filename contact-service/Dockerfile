# Usa una imagen base de Node.js
FROM node:22

# 1. Establece la raíz del proyecto
WORKDIR /app

# 2. Copia los archivos de definición de dependencias de la RAÍZ.
COPY package*.json ./

# 3. Copia el módulo compartido
COPY shared-db-config ./shared-db-config

COPY ./contact-service/package.json ./contact-service/

# 4. EJECUTA npm install en la RAÍZ (/app). ¡La instalación va primero!
#    Esto instala 'mongodb' y todos los node_modules en /app/node_modules.
RUN npm install

# --- CONFIGURACIÓN ESPECÍFICA DEL SERVICIO ---

# 5. Copia el código del servicio a su subcarpeta.
COPY ./contact-service ./contact-service 

# 6. Establece el WORKDIR al directorio del servicio para la ejecución.
WORKDIR /app/contact-service

# 7. Expone el puerto y define el comando de inicio
EXPOSE 3002
CMD ["node", "index.js"]