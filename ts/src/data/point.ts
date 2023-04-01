export interface Point2D {
  x: number;
  y: number;
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export function getDistanceBetween(
  p1: Point2D,
  p2: Point2D,
) {
  const deltaX = p2.x - p1.x;
  const deltaY = p2.y - p1.y;
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
}

export function getDegreeBetween(
  p1: Point2D,
  p2: Point2D,
) {
  const deltaX = p2.x - p1.x;
  const deltaY = p2.y - p1.y;
  return radianToDegree(Math.atan2(deltaY, deltaX));
}

export function degreeToRadian(degree: number) {
  return (degree * Math.PI) / 180;
}

export function radianToDegree(radian: number) {
  return (radian * 180) / Math.PI;
}
