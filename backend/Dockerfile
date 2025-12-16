FROM golang:alpine

WORKDIR /app

COPY . .

RUN go mod download

EXPOSE 8081
EXPOSE 3306
#EXPOSE 5173

ENV DBUSER=kng
ENV DBPASS=Recon777
ENV DBHOST=192.168.0.77
ENV DBPORT=3306

RUN cd ./services && go test -v && cd ../
RUN cd ./controllers && go test -v && cd ../

RUN go build -o /godocker

CMD [ "/godocker" ]
