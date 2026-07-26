from pydantic import BaseModel


class MeetingCreate(BaseModel):
    title: str
    description: str
    date: str
    time: str
    duration: int


class MeetingResponse(BaseModel):
    meeting_id: str
    title: str
    description: str
    date: str
    time: str
    duration: int
    invite_link: str

    class Config:
        from_attributes = True