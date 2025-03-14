import { TokenName } from '@frontend/src/const';
import { UserToken } from '@project/shared-core';

export class Token {
  static getAccessToken() {
    const token = localStorage.getItem(TokenName.Access);

    return token ?? '';
  }

  static getRefreshToken() {
    const token = localStorage.getItem(TokenName.Refresh);

    return token ?? '';
  }

  static save(token: UserToken) {
    localStorage.setItem(TokenName.Access, token.accessToken);
    localStorage.setItem(TokenName.Refresh, token.refreshToken);
  }

  static drop() {
    localStorage.removeItem(TokenName.Access);
  }
}
