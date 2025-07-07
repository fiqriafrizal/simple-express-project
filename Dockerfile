# Gunakan image Node.js resmi
FROM node:18

# Set working directory
WORKDIR /app

# Salin file package.json dan install dependencies
COPY package*.json ./
RUN npm install

# Salin semua file project ke dalam container
COPY . .

# Buka port 3000
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "index.js"]
