# Usa una imagen base de Node.js
FROM node:22

# 1. Establece la raíz del proyecto
WORKDIR /app

# 2. Copia los archivos de definición de dependencias de la RAÍZ (el package.json).
COPY package*.json ./

# 3. Copia el módulo compartido
COPY shared-db-config ./shared-db-config

COPY ./api-gateway/package.json ./api-gateway/

# 4. EJECUTA npm install en la RAÍZ (/app). ¡Paso Crucial!
#    Esto instala 'mongodb' y todos los node_modules en /app/node_modules.
RUN npm install

# 5. Copia el código específico del servicio api-gateway
COPY ./api-gateway ./api-gateway 

# 6. Establece el WORKDIR al directorio del servicio para la ejecución.
WORKDIR /app/api-gateway 

# 7. Expone el puerto y define el comando de inicio
EXPOSE 4000
CMD ["node", "index.js"]