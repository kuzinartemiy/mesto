export class UserInfo {
  constructor({userNameSelector, userJobSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    const userInfoValues = {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent
    }
    return userInfoValues;
  }

  setUserInfo(userInfoValues) {
    this._userName.textContent = userInfoValues.userName;
    this._userJob.textContent = userInfoValues.userJob;
  }
}