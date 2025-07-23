# Proyecto NestJS - Hexagonal

Este proyecto utiliza el framework [NestJS](https://nestjs.com/) y una arquitectura hexagonal para construir aplicaciones escalables y mantenibles.

## Requisitos

- Node.js >= 16
- npm >= 8

## Instalación

```bash
npm install
```

## Configuración de variables de entorno

Copia el archivo `.env.example` a `.env` y completa los valores necesarios:

```bash
cp .env.example .env
```

## Ejecución del proyecto

Modo desarrollo:

```bash
npm run start:dev
```

## Endpoints de la API

### Empresa

- **POST /empresa**
  - Crea una nueva empresa.
  - Body:
    ```json
    {
      "nombre": "string", // requerido
      "fecha_adhesion": "YYYY-MM-DD" // opcional
    }
    ```

- **GET /empresa/last-month**
  - Obtiene las empresas creadas en el último mes.

- **GET /empresa/with-transferencias-last-month**
  - Obtiene las empresas con transferencias en el último mes.

### Transferencia

- **POST /transferencia**
  - Crea una nueva transferencia.
  - Body:
    ```json
    {
      "empresa_id": "uuid", // requerido
      "monto": 1000, // requerido
      "fecha_transferencia": "YYYY-MM-DD" // opcional
    }
    ```
