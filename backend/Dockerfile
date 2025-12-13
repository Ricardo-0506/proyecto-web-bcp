# Usa una imagen base de Node.js
FROM node:22

# 1. Establece la raíz del proyecto
WORKDIR /app

# 2. Copia los archivos de definición de dependencias de la RAÍZ (el package.json que tiene 'mongodb').
COPY package*.json ./

# 3. Copia el módulo compartido
COPY shared-db-config ./shared-db-config

COPY ./backend/package.json ./backend/

# 4. Ejecuta npm install en la RAÍZ (/app).
#    Esto instala 'mongodb' y todos los node_modules en /app/node_modules.
RUN npm install

# 5. Copia el código específico del servicio a una subcarpeta.
#    Asumiendo que este es el Dockerfile para el servicio 'backend':
COPY ./backend ./backend 

# 6. Establece el WORKDIR al directorio del servicio para la ejecución.
WORKDIR /app/backend

# 7. Expone el puerto y define el comando de inicio
EXPOSE 3000

# Usamos 'index.js' o 'app.js' según tu servicio.
CMD ["node", "app.js"]