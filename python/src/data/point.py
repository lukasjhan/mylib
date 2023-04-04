from typing import TypedDict
import math

class Point2D(TypedDict):
    x: float
    y: float

class Point3D(Point2D):
    z: float

def getDistanceBetween(p1: Point2D, p2: Point2D) -> float:
    deltaX = p2.x - p1.x
    deltaY = p2.y - p1.y
    return math.sqrt(deltaX ** 2 + deltaY ** 2)

def getDegreeBetween(p1: Point2D, p2: Point2D) -> float:
    deltaX = p2.x - p1.x
    deltaY = p2.y - p1.y
    return radianToDegree(math.atan2(deltaY, deltaX))

def degreeToRadian(degree: float) -> float:
    return (degree * math.pi) / 180

def radianToDegree(radian: float) -> float:
    return (radian * 180) / math.pi