# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Copy all project files into container
COPY . ./

# Intelligently detect if package.json is in root or inside frontend directory
RUN if [ -f "./frontend/package.json" ]; then \
        echo "Building from frontend subdirectory..." && \
        cd frontend && npm install && npm run build && cp -r dist /app/final_dist; \
    else \
        echo "Building from root directory..." && \
        npm install && npm run build && cp -r dist /app/final_dist; \
    fi

# Production stage with lightweight Nginx server
FROM nginx:alpine
COPY --from=build /app/final_dist /usr/share/nginx/html

# Enable HTML5 History Mode SPA routing for React Router
RUN echo 'server { \
    listen 80; \
    server_name _; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
