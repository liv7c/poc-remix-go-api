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

	// if err != nil {
	// 	http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
	// 	return
	// }

	err = app.writeJSON(w, http.StatusOK, movie, "movie")
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
	}
}

func (app *application) getAllMovies(w http.ResponseWriter, r *http.Request) {

}
