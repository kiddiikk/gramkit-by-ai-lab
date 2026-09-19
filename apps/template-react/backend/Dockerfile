# Multi-stage Dockerfile for Template React Backend in Monorepo Workspace
#
# This Dockerfile handles the monorepo structure where:
# - Core infrastructure: /workspace/core/backend/
# - Template React application: /workspace/apps/template-react/backend/
#
# Build stage installs dependencies, runtime stage runs the application

FROM python:3.13-slim AS builder

# Install build dependencies for Python packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    g++ \
    make \
    && rm -rf /var/lib/apt/lists/*

# Install uv package manager
RUN pip install --no-cache-dir uv

WORKDIR /workspace

# Copy dependency files first for better caching
COPY pyproject.toml ./

# Copy core backend (needed for local editable install)
COPY core/backend/ ./core/backend/

# Copy template-react backend (needed for local editable install)
COPY apps/template-react/backend/ ./apps/template-react/backend/

# Install dependencies
# Note: Must copy source before sync because local packages are editable installs
WORKDIR /workspace/apps/template-react/backend
RUN uv sync --all-extras

# Development stage - includes hot reload
FROM python:3.13-slim AS development

# Install postgresql-client for pg_dump (database backups)
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

# Copy entire workspace structure from builder (includes .venv)
COPY --from=builder /workspace/ /workspace/

# Copy Python runtime that uv downloaded (needed because .venv/bin/python is a symlink to it)
COPY --from=builder /root/.local/share/uv/python /root/.local/share/uv/python

# Set Python path to include both core and app source directories
ENV PYTHONPATH=/workspace/core/backend/src:/workspace/apps/template-react/backend/src

# Use virtual environment Python directly
ENV PATH="/workspace/.venv/bin:$PATH"

# Default working directory for runtime
WORKDIR /app

# Default command (overridden in docker-compose for different services)
CMD ["python", "-u", "src/app/webhook/app.py"]

# Production stage - minimal Python image
FROM python:3.13-slim AS production

WORKDIR /workspace

# Copy entire workspace structure from builder (includes .venv)
COPY --from=builder /workspace/ /workspace/

# Copy Python runtime that uv downloaded (needed because .venv/bin/python is a symlink to it)
COPY --from=builder /root/.local/share/uv/python /root/.local/share/uv/python

# Set Python path to include both core and app source directories
ENV PYTHONPATH=/workspace/core/backend/src:/workspace/apps/template-react/backend/src

# Use virtual environment Python directly
ENV PATH="/workspace/.venv/bin:$PATH"

# Default working directory for runtime
WORKDIR /workspace/apps/template-react/backend

# Default command
CMD ["sh", "-c", "cd /workspace/apps/template-react/backend/src && python -m uvicorn app.webhook.app:app --host 0.0.0.0 --port $PORT"]
