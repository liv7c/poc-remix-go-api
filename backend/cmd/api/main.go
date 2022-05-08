package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
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

func main() {
	var cfg config

	flag.IntVar(&cfg.port, "port", 4000, "Server port to listen on")
	flag.StringVar(&cfg.env, "environment", "development", "Applicatio environment (development|production)")
	flag.Parse()

	mux := http.NewServeMux()

	mux.HandleFunc("/status", func(w http.ResponseWriter, r *http.Request) {
		status := AppStatus{
			Status:      "Available",
			Environment: cfg.env,
			Version:     version,
		}

		js, err := json.Marshal(status)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(js)
	})

	err := http.ListenAndServe(fmt.Sprintf(":%d", cfg.port), mux)
	if err != nil {
		log.Fatal(err)
	}
}
