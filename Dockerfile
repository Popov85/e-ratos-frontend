# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy the production build files to the Nginx HTML directory
COPY dist /usr/share/nginx/html

# Copy the nginx.conf to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]