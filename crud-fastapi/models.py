from sqlalchemy import Boolean, Column, ForeignKey,Integer, String
from database import Base


class Books(Base):
    __tablename__='Books'

    id=Column(Integer,primary_key=True,index=True)
    title=Column(String, index=True)
    year=Column(Integer,index=True)
    score=Column(Integer,index=True)

