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

### Company

- **POST /company**
  - Crea una nueva empresa.
  - Body:
    ```json
    {
      "name": "string", // requerido
      "adhesion_date": "YYYY-MM-DD" // opcional
    }
    ```

- **GET /company/last-month**
  - Obtiene las empresas creadas en el último mes.

- **GET /company/with-transfers-last-month**
  - Obtiene las empresas con transferencias en el último mes.

### Transfer

- **POST /transfer**
  - Crea una nueva transferencia.
  - Body:
    ```json
    {
      "company_id": "uuid", // requerido
      "amount": 1000, // requerido
      "transfer_date": "YYYY-MM-DD" // opcional
    }
    ```
