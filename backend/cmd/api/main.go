package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

// version is the application api version
const version = "1.0.0"

type config struct {
	port int
	env  string
}

// AppStatus contains information about the application (e.g. the current environment or version)
type AppStatus struct {
	Environment string `json:"environment"`
	Status      string `json:"status"`
	Version     string `json:"version"`
}

type application struct {
	config   config
	infoLog  *log.Logger
	errorLog *log.Logger
}

func main() {
	var cfg config

	flag.IntVar(&cfg.port, "port", 4000, "Server port to listen on")
	flag.StringVar(&cfg.env, "environment", "development", "Applicatio environment (development|production)")
	flag.Parse()

	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stderr, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)

	app := application{
		config:   cfg,
		infoLog:  infoLog,
		errorLog: errorLog,
	}

	srv := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.port),
		Handler:      app.routes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	infoLog.Printf("Starting server on port %d", cfg.port)

	err := srv.ListenAndServe()
	if err != nil {
		errorLog.Fatal(err)
	}
}
