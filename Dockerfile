FROM mcr.microsoft.com/playwright:v1.60.0-noble
COPY . .
RUN npm ci
CMD ["npm", "t"]