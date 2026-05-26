from fastapi import APIRouter

from app.schemas.product import ProductCreate, ProductResponse

router = APIRouter()


@router.post("", response_model=ProductResponse)
def create_product(payload: ProductCreate):
    return ProductResponse(id="local-product", **payload.model_dump())

