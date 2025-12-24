FROM golang:alpine AS builder

WORKDIR /app

COPY . .
RUN go mod download

# Tests NOT Compatible With Github Actions
#RUN cd ./services && go test -v && cd ../
#RUN cd ./controllers && go test -v && cd ../

# _____________________________________________________

# TODO If Running Production Server            (Release)

#ENV GIN_MODE=release

# ____________________________________________________

RUN CGO_ENABLED=0 GOOS=linux go build -o server ./main.go
RUN chmod +x server

FROM alpine:latest
WORKDIR /app
RUN apk update && apk --no-cache add ca-certificates
RUN update-ca-certificates
COPY --from=builder /app/server /app/taskmanager-backend.crt /app/taskmanager-backend.key ./

EXPOSE 8081
EXPOSE 8443
EXPOSE 3306
EXPOSE 5173

CMD [ "./server" ]
