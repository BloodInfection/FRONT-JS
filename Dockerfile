FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./public /www/data

EXPOSE 80

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]