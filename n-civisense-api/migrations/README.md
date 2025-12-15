Alembic migrations for n-civisense-api

Usage:

- Create a new revision:
  alembic revision -m "add full_name to users"

- Autogenerate (requires models imported in Base):
  alembic revision --autogenerate -m "sync models"

- Apply migrations:
  alembic upgrade head

- Downgrade last migration:
  alembic downgrade -1
