<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en Desarrollo
1. Clonar el repositorio
2. Ejecutar
```
yarn install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Clonar el archivo __.env.template__ y renombrarla a __.env__

6. Asignar los valores a la variables de entorno del archivo __.env__

7. Levantar la aplicacion corrientdo el comando: 
```
yarn start:dev
```
8. Reconstruir la Base de datos con una semilla. 
   __Ojo__ Que esto __Borrara__ todos los Datos existentes.
```
http://localhost:3000/api/v2/seed/
```
## Stack usado

* MongoBD
* NestJs