from pydantic import BaseModel


class UsageResponse(BaseModel):
    plan: str
    used: int
    limit: int

