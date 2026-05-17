
# 🏥 Clinique Médicale

Application web de gestion d'une clinique médicale (patients, médecins, rendez-vous, consultations).

## 🛠️ Technologies utilisées

| Couche      | Technologie                        |
|-------------|-------------------------------------|
| Backend     | Java 17, Spring Boot 3, Spring Security, JPA/Hibernate |
| Frontend    | Angular, TypeScript, Bootstrap      |
| Base de données | MySQL 8                         |
| Déploiement | Docker, Docker Compose              |

## 📁 Structure du projet
Clinique-Medicale/
├── backend/               # API REST Spring Boot
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/
│   └── frontend/          # Application Angular
│       ├── src/
│       ├── package.json
│       ├── Dockerfile
│       └── nginx.conf
├── docker-compose.yml
└── README.md

## 🚀 Démarrage rapide avec Docker

### Prérequis
- [Docker](https://www.docker.com/get-started) installé
- [Docker Compose](https://docs.docker.com/compose/install/) installé

### Lancer l'application

```bash
# 1. Cloner le projet
git clone https://github.com/Mohamed-Setti/Clinique-Medicale.git
cd Clinique-Medicale

# 2. Lancer tous les services (DB + Backend + Frontend)
docker-compose up --build

# 3. Accéder à l'application
# Frontend : http://localhost
# API REST  : http://localhost:8080/api
```

### Arrêter l'application

```bash
docker-compose down
```

### Supprimer aussi les données (base de données)

```bash
docker-compose down -v
```

## ⚙️ Démarrage sans Docker (développement local)

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

> Configurer `src/main/resources/application.properties` avec vos infos MySQL locales.

### Frontend

```bash
cd frontend/frontend
npm install
ng serve
# Accès : http://localhost:4200
```

## 🔐 Variables d'environnement (Backend)

| Variable | Description | Valeur par défaut |
|---|---|---|
| `SPRING_DATASOURCE_URL` | URL de connexion MySQL | `jdbc:mysql://localhost:3306/clinique_medicale` |
| `SPRING_DATASOURCE_USERNAME` | Utilisateur MySQL | `clinique_user` |
| `SPRING_DATASOURCE_PASSWORD` | Mot de passe MySQL | `clinique_pass` |

## 👥 Contributeurs

- Mohamed Setti




# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.10.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

