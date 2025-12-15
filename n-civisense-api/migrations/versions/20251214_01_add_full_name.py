"""add full_name to users

Revision ID: 20251214_01
Revises: 
Create Date: 2025-12-14
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '20251214_01'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('users', sa.Column('full_name', sa.String(length=255), nullable=True))
    # Optional: backfill empty string for existing rows
    op.execute("UPDATE users SET full_name = '' WHERE full_name IS NULL")
    op.alter_column('users', 'full_name', nullable=False)


def downgrade():
    op.drop_column('users', 'full_name')
