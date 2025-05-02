# List all available commands
default:
    @just --list

# First-time setup for all projects
setup: setup-api setup-web
    @echo "Setup complete! Run 'just start' to start all servers."

# Setup API for first time use
setup-api:
    @echo "Setting up API for first-time use..."
    cd api && [ -f .env ] || cp .env.example .env
    @echo "Installing dependencies..."
    cd api && bundle install
    @echo "Creating and setting up database..."
    cd api && bin/rails db:create db:migrate db:seed
    @echo "API setup complete!"

# Setup web for first time use
setup-web:
    @echo "Setting up Web dependencies..."
    cd web && npm install
    @echo "Web setup complete!"

# Build all projects (can be run repeatedly)
build: build-api build-web
    @echo "Build complete!"

# Build API
build-api:
    @echo "Building API..."
    cd api && bundle install
    cd api && bin/rails db:migrate

# Build web
build-web:
    @echo "Building web..."
    cd web && npm install
    cd web && npm run build

# Start all development servers
start:
    @echo "Starting development servers..."
    # Set up trap to forward SIGINT to process group
    sh -c '(trap "kill 0" EXIT; (cd api && bin/dev) & (cd web && npm run dev) & wait)'

# Start just the API server
start-api:
    cd api && bin/dev

# Start just the web server
start-web:
    cd web && npm run dev

# Run tests across all projects
test:
    @echo "Running API tests..."
    cd api && bin/rails test
    @echo "Running Web tests..."
    cd web && npm test

# Clean all build artifacts
clean:
    @echo "Cleaning build artifacts..."
    cd api && bin/rails log:clear tmp:clear
    cd web && rm -rf .next out

# Update all dependencies
update:
    @echo "Updating API dependencies..."
    cd api && bundle update
    @echo "Updating Web dependencies..."
    cd web && npm update 