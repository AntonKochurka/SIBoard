from contextlib import asynccontextmanager

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from apps import auth, kanbans, notes, todos, users

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

def set_routers(_app: FastAPI):
    router = APIRouter(prefix="/api")

    for app in [auth, kanbans, notes, todos, users]:
        api = app.router.router 
        
        router.include_router(api)
    
    _app.include_router(router)

def get_app() -> FastAPI:
    app = FastAPI(lifespan=lifespan)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    set_routers(app)
    
    return app

app = get_app()