export class CreateAuthDto {
  userId: string;
  userName: string;
  userPassword: string;
  refreshToken?: string;
}
