import * as bcrypt from 'bcrypt';

export class Encrypt {
  async encrypt(password: string) {
    const saltOrRound = 8;
    return await bcrypt.hash(password, saltOrRound);
  }

  async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
