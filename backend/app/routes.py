
from fastapi import Depends, HTTPException,APIRouter
from sqlalchemy.orm import Session

from . import crud, schemas
from .database import SessionLocal

router = APIRouter()


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/meeting", response_model=schemas.MeetingResponse)
def create_meeting(
    meeting: schemas.MeetingCreate,
    db: Session = Depends(get_db)
):
    return crud.create_meeting(db, meeting)

@router.get("/meetings/upcoming", response_model=list[schemas.MeetingResponse])
def get_upcoming_meetings(db: Session = Depends(get_db)):
    return crud.get_upcoming_meetings(db)


@router.get("/meetings/recent", response_model=list[schemas.MeetingResponse])
def get_recent_meetings(db: Session = Depends(get_db)):
    return crud.get_recent_meetings(db)

@router.get("/meeting/{meeting_id}", response_model=schemas.MeetingResponse)
def get_meeting(meeting_id: str, db: Session = Depends(get_db)):
    meeting = crud.get_meeting_by_id(db, meeting_id)

    if meeting is None:
        raise HTTPException(status_code=404, detail="Meeting not found")

    return meeting