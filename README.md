# NexoApp

Esto proyecto ha sido generdo con [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

# Frontend de la Aplicación de Personas Desaparecidas

Este es el frontend de una aplicación web dedicada a la gestión de personas desaparecidas. Proporciona una interfaz interactiva para registrar casos, realizar seguimientos, visualizar comentarios, subir imágenes y consultar información geolocalizada en un mapa.

## Características

- **Interfaz de usuario moderna**: Diseñada con Angular Material y Bootswatch.
- **Gestión de casos**: Visualización, registro y actualización de desapariciones.
- **Seguimiento de casos**: Permite a los usuarios seguir casos específicos.
- **Comentarios**: Sistema para añadir y gestionar comentarios.
- **Subida de imágenes**: Interfaz para subir fotos relacionadas con casos.
- **Geolocalización interactiva**: Integración con Leaflet para mostrar mapas interactivos.
- **Autenticación basada en roles**: Diferentes vistas según el rol del usuario (civil o administrador).

## Tecnologías Utilizadas

- **Angular**: Framework principal para el desarrollo del frontend.
- **Angular Material**: Componentes estilizados para una mejor experiencia de usuario.
- **Ng Bootstrap**: Componentes adicionales para diseño responsive.
- **Bootswatch**: Temas personalizados para Bootstrap.
- **Leaflet**: Mapas interactivos para mostrar ubicaciones de desapariciones.
- **JWT (JSON Web Tokens)**: Autenticación y autorización segura con el backend.

## Instalación

1. **Clonar el repositorio**:
   ```bash
   https://github.com/rafadiecas/nexoAppFront.git
   cd nombre-del-repositorio-frontend

2. **Instalar dependencias**:
   
   ```bash
   npm install
   
  - En caso de error con leaflet, se puede instalar manualmente:
   
    ```bash
    npm install leaflet @types/leaflet

3. **Ejecutar la aplicación**:
   ```bash
   ng serve --proxy-config proxy.conf.json
   
  - Accede a la aplicación en http://localhost:4200

## Scripts Disponibles

  - `npm run build`: Compila la aplicación para producción.
  - `npm run lint`: Analiza el código en busca de errores y estándares de calidad.

## Contribución

1. **Realiza un fork del repositorio.**

2. **Crea tu rama para tu funcionalidad**
   
   ```bash
   git checkout -b feature/nueva-funcionalidad
   
4. **Realiza un pull request con tus cambios.**
 

## Más ayuda

Para obtener más ayuda usa `ng help` o visita [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
