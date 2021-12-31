FROM golang:latest as builder

WORKDIR /usr/src/app

COPY . .

RUN go build app.go

FROM busybox:latest as run

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

CMD ["./app"]