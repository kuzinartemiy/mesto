export class UserInfo {
  constructor({userNameSelector, userJobSelector, avatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfoValues = {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent
    }
    return userInfoValues;
  }

  setUserInfo(userInfoValues) {
    this._userName.textContent = userInfoValues.name;
    this._userJob.textContent = userInfoValues.about;
    this._userID = userInfoValues._id;
    this._avatar.style.backgroundImage = `url('${userInfoValues.avatar}')`;
  }

  setUserAvatar(newAvatarLink) {
    this._avatar.style.backgroundImage = `url(${newAvatarLink})`;
  }

  getUserId() {
    return this._userID;
  }

}