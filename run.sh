#!/bin/bash
FRONTEND_DIR="./frontend"
BACKEND_DIR="./backend"
VENV_DIR="$BACKEND_DIR/.venv"
REQUIREMENTS="$BACKEND_DIR/requirements.txt"

start_frontend() {
    cd $FRONTEND_DIR
    echo "[FRONTEND] Installing Angular Dependencies."
    npm install
    echo "[FRONTEND] Starting Angular Server"
    ng serve &
    FRONTEND_PID=$!
    cd ..
}

start_backend() {
    if [ ! -d "$VENV_DIR" ]; then
        echo "[BACKEND] Virtual environment not found."
        echo "[BACKEND] Creating virtual environment."
        pip3 install virtualenv
        python3 -m venv "$VENV_DIR"
    fi
    echo "[BACKEND] Starting Virtual Environment."
    source "$VENV_DIR/bin/activate"
    echo "[BACKEND] Installing python dependencies."
    pip install -r "$REQUIREMENTS"
    echo "[BACKEND] Starting FastAPI Server"
    cd $BACKEND_DIR
    python3 -m uvicorn main:app --reload &
    BACKEND_PID=$!
    cd ..
}

terminate() {
    echo "TERMINATING..."
    kill $FRONTEND_PID
    kill $BACKEND_PID
}

trap terminate SIGINT

start_backend
start_frontend

wait
