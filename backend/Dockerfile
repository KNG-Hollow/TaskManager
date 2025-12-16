FROM golang:alpine AS builder

WORKDIR /app

# This Block Does Not Build But Is Recommended
#COPY ./go.mod ./go.sum ./
#RUN go mod download
#COPY . .

COPY . .
RUN go mod download

EXPOSE 8081
EXPOSE 3306
EXPOSE 5173

ENV DBUSER=kng
ENV DBPASS=Recon777
ENV DBHOST=192.168.0.77
ENV DBPORT=3306

RUN cd ./services && go test -v && cd ../
RUN cd ./controllers && go test -v && cd ../

RUN CGO_ENABLED=0 GOOS=linux go build -o server ./main.go
RUN chmod +x server

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/server .

EXPOSE 8081
EXPOSE 3306
EXPOSE 5173

ENV DBUSER=kng
ENV DBPASS=Recon777
ENV DBHOST=192.168.0.77
ENV DBPORT=3306

CMD [ "./server" ]
