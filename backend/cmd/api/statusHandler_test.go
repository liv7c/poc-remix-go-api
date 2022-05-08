package main

import (
	"encoding/json"
	"net/http"
	"testing"
)

func TestStatusHandler(t *testing.T) {
	app := NewTestApplication(t)

	ts := newTestServer(t, app.routes())
	defer ts.Close()

	code, _, body := ts.get(t, "/status")

	if code != http.StatusOK {
		t.Errorf("Expected %d; got %d instead", http.StatusOK, code)
	}

	exp, err := json.MarshalIndent(AppStatus{
		Environment: "development",
		Status:      "Available",
		Version:     version,
	}, "", "\t")

	if err != nil {
		t.Fatal(err)
	}

	if body != string(exp) {
		t.Errorf("Expected body to be %q, got %q instead", exp, body)
	}
}
