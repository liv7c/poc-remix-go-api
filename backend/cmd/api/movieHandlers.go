package main

import (
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
)

func (app *application) getOneMovie(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		app.errorLog.Printf("Invalid id parameter: %s. Got error: %v", params.ByName("id"), err)
		app.errorJSON(w, err)
		return
	}

	movie, err := app.models.DB.Get(id)

	if err != nil {
		app.errorJSON(w, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, movie, "movie")
	if err != nil {
		app.errorJSON(w, err)
	}
}

func (app *application) getAllMovies(w http.ResponseWriter, r *http.Request) {
	movies, err := app.models.DB.All()
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, movies, "movies")
	if err != nil {
		app.errorJSON(w, err)
	}
}

// TODO add logic to the following handlers
func (app *application) deleteMovie(w http.ResponseWriter, r *http.Request) {}

func (app *application) insertMovie(w http.ResponseWriter, r *http.Request) {}

func (app *application) updateMovie(w http.ResponseWriter, r *http.Request) {}

func (app *application) searchMovies(w http.ResponseWriter, r *http.Request) {}
