FROM registry-dev.excelsecu.com/library/nginx:alpine
ADD ./dist/ /usr/share/nginx/html/
