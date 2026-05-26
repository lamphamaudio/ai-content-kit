from pathlib import Path

import psycopg
from dotenv import dotenv_values


ROOT = Path(__file__).resolve().parents[1]
MIGRATIONS_DIR = ROOT / "supabase" / "migrations"


def main() -> None:
    env = dotenv_values(ROOT / ".env")
    database_url = env.get("DATABASE_URL")
    if not database_url:
        raise SystemExit("DATABASE_URL is missing in .env")

    files = sorted(MIGRATIONS_DIR.glob("*.sql"))
    if not files:
        raise SystemExit("No migration files found")

    with psycopg.connect(database_url, autocommit=False) as conn:
        with conn.cursor() as cursor:
            for path in files:
                print(f"Applying {path.name}")
                cursor.execute(path.read_text(encoding="utf-8"))
        conn.commit()

    print(f"Applied {len(files)} migration files")


if __name__ == "__main__":
    main()
