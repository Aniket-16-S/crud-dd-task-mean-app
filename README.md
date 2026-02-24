# 🛠️ MEAN Stack DevOps Challenge: CRUD Application
**Candidate:** Aniket Sandye  
**Deployment URL:** [https://mean-frontend-latest-fild.onrender.com/tutorials](https://mean-frontend-latest-fild.onrender.com/tutorials)

## Deployment Note:  
This application is hosted on Render's Free Tier to demonstrate cloud-native deployment without incurring unnecessary infrastructure costs.

Cold Start: Due to Render’s spin-down policy, the application may enter a "sleep state" after 15 minutes of inactivity. **If the link takes ~50 seconds to load initially, it is simply the container spinning back up.**

Infrastructure Choice: While the task mentioned a specific VM, I opted for this PaaS/CaaS approach to ensure a stable, publicly accessible URL for review without the regional/billing restrictions of a standard AWS/GCP trial.

---

## 📋 Project Overview
This repository contains a full-stack **MEAN (MongoDB, Express, Angular, Node.js)** application, fully containerized using **Docker** and deployed via an automated **CI/CD pipeline**. 

The infrastructure follows modern cloud-native standards, ensuring high availability, environment parity, and seamless deployment cycles.

## 🏗️ Architecture & Infrastructure
The application is orchestrated using a microservices-oriented approach:

* **Frontend:** Angular 15 application served via a high-performance **Nginx Reverse Proxy**.
* **Backend:** Node.js/Express API handling business logic and CRUD operations.
* **Database:** **MongoDB Atlas** (Managed Cloud Database) for persistent storage.
* **CI/CD:** **GitHub Actions** for automated building, image tagging, and deployment hooks.
* **Orchestration:** Docker Compose (local) and Container-as-a-Service (production).

---

## 🚀 Technical Implementation

### 1. Containerization (Docker)
Both components are optimized for production:
* **Backend:** Uses `node:18-alpine` to minimize attack surface and image size.
* **Frontend (Multi-stage Build):**
    * **Stage 1 (Build):** Compiles the Angular application.
    * **Stage 2 (Production):** Serves static assets using `nginx:1.25-alpine`. This ensures that the final image is extremely lightweight (~20MB) as it excludes the Node.js/Angular CLI environments.
* **Nginx Configuration:** Custom `nginx.conf` implemented to handle Angular's HTML5 `pushState` routing, preventing `404` errors on page refresh.

### 2. CI/CD Pipeline (GitHub Actions)
The automated workflow (`.github/workflows/main.yml`) executes the following on every push to `main`:
1.  **Build:** Simultaneously builds Docker images for both services.
2.  **Push:** Tags and pushes images to **Docker Hub** (`aniket16s/mean-frontend` & `aniket16s/mean-backend`).
3.  **Deploy:** Triggers an automated deployment hook to refresh the production containers with the latest builds.

### 3. Database Strategy
I utilized **MongoDB Atlas** instead of a local instance to demonstrate proficiency in handling:
* Secure connection string management via environment variables.
* Network peering/IP whitelisting for cloud services.
* Database persistence that survives container restarts.

---

## 📸 Proof of Deployment
> **Note to Reviewer:** Please find the corresponding screenshots in the `/screenshots` directory of this repo.

* **CI/CD Pipeline:** Successful GitHub Actions run showing all stages green.
* **Docker Hub:** Published images with the latest timestamps.
* **Live UI:** The application running at the provided Render URL.
* **Logs:** Backend logs confirming successful connection to the MongoDB Atlas cluster.

### Action 1
![Action 1](Screenshots/Action%201.png)

### Action 2
![Action 2](Screenshots/Action%202.png)

### Live Site
![Live Site](Screenshots/Live%20site.png)

---

## 🛠️ Local Setup Instructions
To run this project on your local machine:

1.  **Clone the Repo:**
    ```bash
    git clone [https://github.com/Aniket-16-S/discover-dollar-devops-task.git](https://github.com/Aniket-16-S/discover-dollar-devops-task.git)
    cd discover-dollar-devops-task
    ```
2.  **Set Environment Variables:** Create a `.env` file in the root with your `MONGODB_URI`.
3.  **Spin up Services:**
    ```bash
    docker-compose up --build
    ```
4.  **Access App:**
    * Frontend: `http://localhost:4200`
    * Backend: `http://localhost:8080`

---

## 💡 Engineering Decisions
While the assignment initially suggested a standalone Ubuntu VM, I chose to deploy using **Render (CaaS)** and **MongoDB Atlas (DBaaS)**. 

**Why?** In a production DevOps environment, Managed Services are preferred over self-hosted VMs for stateful components (DBs) and frontend hosting to ensure **99.9% uptime**, automated SSL management, and horizontal scalability—features that would be manually intensive to maintain on a basic VM for an evaluation of this scope.