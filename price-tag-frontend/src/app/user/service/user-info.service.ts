import {User} from '../model/user';
import {Injectable} from '@angular/core';

export interface UserInStorage {
    user: User;
    langList: string[];
}

export interface LoginInfoInStorage {
    message: string;
    landingPage: string;
    userAndToken?: UserInStorage;
}

@Injectable()
export class UserInfoService {

    public currentUserKey = 'currentUser';
    public storage: Storage = sessionStorage;

    constructor() {
    }

    // Store the user and token to the session storage like a string
    storeUserTokenInfo(userInfoString: string) {
        console.log('UserInfoService - storeUserTokenInfo');

        this.storage.setItem(this.currentUserKey, userInfoString);
    }

    // Remove the user and token from session storage
    removeUserTokenInfo() {
        this.storage.removeItem(this.currentUserKey);
    }

    // get the UserInStorage from session storage
    getUserInfo(): UserInStorage | null {
        //     console.log('UserInfoService - getUserInfo');

        try {
            const userInfoString: string = this.storage.getItem(this.currentUserKey);
            if (userInfoString) {
                return JSON.parse(this.storage.getItem(this.currentUserKey));
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    }

    isLoggedIn(): boolean {
        console.log('UserInfoService - isLoggedIn');

        return !!this.storage.getItem(this.currentUserKey);
    }


    // get usernameString from session storage
    getUsername(): string {
        const userInStorage: UserInStorage = this.getUserInfo();
        if (userInStorage !== null) {
            return userInStorage.user.fullname;
        }
        return 'no-user';
    }

    getUserLang(): string {
        const userInStorage: UserInStorage = this.getUserInfo();
        if (userInStorage !== null) {
            return userInStorage.user.lang;
        }
        return 'EN';
    }

    getLanguages(): string[] | null {
        const userInStorage: UserInStorage = this.getUserInfo();
        if (userInStorage !== null) {
            return userInStorage.langList;
        }
        return null;
    }

}
