from sqlalchemy import Column, Integer, String
from .database import Base


class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True, index=True)
    meeting_id = Column(String, unique=True, index=True)
    title = Column(String)
    description = Column(String)
    date = Column(String)
    time = Column(String)
    duration = Column(Integer)
    invite_link = Column(String)