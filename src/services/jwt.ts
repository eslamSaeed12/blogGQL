import jwt from "jsonwebtoken";

class jwtService {
  constructor(private secret: string) {}

  sign(payload: any): string {
    return jwt.sign(payload, this.secret);
  }

  verify(token: string): any {
    return jwt.verify(token, this.secret);
  }
}

export default new jwtService(process.env["JWT-SECRET"]);
