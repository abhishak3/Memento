#!/bin/bash
FRONTEND_DIR="./frontend"
BACKEND_DIR="./backend"
VENV_DIR=".venv"
REQUIREMENTS="requirements.txt"
BACKEND_ENDPOINT="http://localhost:8000"
FRONTEND_ENDPOINT="http://localhost:4200"

start_frontend() {
    cd $FRONTEND_DIR
    echo "[FRONTEND] Installing Angular Dependencies"
    npm install > frontend.log 2>&1
    echo "[FRONTEND] Angular Dependencies Installed"
    echo "[FRONTEND] Starting Angular Server @ $FRONTEND_ENDPOINT"
    ng serve > frontend.log 2>&1 &
    FRONTEND_PID=$!
    cd ..
}

start_backend() {
    cd $BACKEND_DIR
    if [ ! -d "$VENV_DIR" ]; then
        echo "[BACKEND] Virtual environment not found"
        echo "[BACKEND] Creating virtual environment"
        pip3 install virtualenv > backend.log 2>&1
        python3 -m venv "$VENV_DIR" > backend.log 2>&1
        echo "[BACKEND] Virtual Environment Created"
    fi
    echo "[BACKEND] Starting Virtual Environment"
    source "$VENV_DIR/bin/activate" > backend.log 2&1
    echo "[BACKEND] Installing python dependencies"
    pip install -r "$REQUIREMENTS" > backend.log 2>&1
    echo "[BACKEND] Starting FastAPI Server @ $BACKEND_ENDPOINT"
    python3 -m uvicorn main:app --reload > backend.log 2>&1 &
    BACKEND_PID=$!
    cd ..
}

check_servers() {
    echo "[APP] Checking if both frontend and backend are up..."
    while true; do
        # Send a request to the backend API (change the URL to your backend endpoint)
        backend_response=$(curl -s -o /dev/null -w "%{http_code}" $BACKEND_ENDPOINT)
        # Send a request to the frontend (change the URL to your frontend endpoint)
        frontend_response=$(curl -s -o /dev/null -w "%{http_code}" $FRONTEND_ENDPOINT)

        if [ "$backend_response" = "200" ] && [ "$frontend_response" = "200" ]; then
            echo "[APP] Both frontend and backend are up and serving."
            echo "[APP] BACKEND@$BACKEND_ENDPOINT | FRONTEND@$FRONTEND_ENDPOINT"
            break
        fi
        echo "[APP] Servers not yet up. Waiting..."
        sleep 2
    done
}

terminate() {
    echo "TERMINATING..."
    kill $FRONTEND_PID
    kill $BACKEND_PID
}

trap terminate SIGINT

start_backend
start_frontend
check_servers
wait
