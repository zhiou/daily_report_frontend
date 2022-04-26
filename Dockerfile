FROM registry-dev.excelsecu.com/dockerhub/nginx:alpine
ADD ./dist/ /usr/share/nginx/html/
