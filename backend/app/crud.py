import uuid

from sqlalchemy.orm import Session
from datetime import date

from . import models, schemas


def create_meeting(db: Session, meeting: schemas.MeetingCreate):
    meeting_id = str(uuid.uuid4())[:8]

    invite_link = f"http://localhost:3000/meeting/{meeting_id}"

    db_meeting = models.Meeting(
        meeting_id=meeting_id,
        title=meeting.title,
        description=meeting.description,
        date=meeting.date,
        time=meeting.time,
        duration=meeting.duration,
        invite_link=invite_link,
    )

    db.add(db_meeting)
    db.commit()
    db.refresh(db_meeting)

    return db_meeting

def get_upcoming_meetings(db):
    today = date.today().isoformat()

    return (
        db.query(models.Meeting)
        .filter(models.Meeting.date >= today)
        .order_by(models.Meeting.date.asc())
        .all()
    )


def get_recent_meetings(db):
    today = date.today().isoformat()

    return (
        db.query(models.Meeting)
        .filter(models.Meeting.date < today)
        .order_by(models.Meeting.date.desc())
        .all()
    )

def get_meeting_by_id(db, meeting_id: str):
    return (
        db.query(models.Meeting)
        .filter(models.Meeting.meeting_id == meeting_id)
        .first()
    )