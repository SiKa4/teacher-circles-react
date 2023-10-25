import { makeAutoObservable } from 'mobx';

class AppStore {
    private _userInfo : {role : string, user_id: string} | null = null

    private _isOpenLeftSidebar = true;

    constructor() {
        makeAutoObservable(this);
    }

    public setUserInfo(userInfo: {role : string, user_id: string}) {
        this._userInfo = userInfo;
    }
    public get getUserInfo() {
        return this._userInfo;
    }

    public setIsOpenLeftSidebar(){
        this._isOpenLeftSidebar = !this._isOpenLeftSidebar;
    }

    public get getIsOpenLeftSidebar() {
        return this._isOpenLeftSidebar;
    }
}

export const appStore = new AppStore();