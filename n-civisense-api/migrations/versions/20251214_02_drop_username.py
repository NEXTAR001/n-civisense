"""drop username column from users

Revision ID: 20251214_02
Revises: 20251214_01
Create Date: 2025-12-14
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '20251214_02'
down_revision = '20251214_01'
branch_labels = None
depends_on = None


def upgrade():
    # Make username nullable first (if NOT NULL exists)
    try:
        op.alter_column('users', 'username', nullable=True)
    except Exception:
        pass
    # Drop the username column; app no longer uses it
    op.drop_column('users', 'username')


def downgrade():
    # Recreate username column as nullable
    op.add_column('users', sa.Column('username', sa.String(length=255), nullable=True))
