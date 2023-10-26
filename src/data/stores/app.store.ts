import {makeAutoObservable} from 'mobx';

class AppStore {
    private _userInfo: {
        first_name: string,
        last_name: string,
        surname: string,
        id: number, id_role: number
    } | null = null

    private _isOpenLeftSidebar = true;

    constructor() {
        makeAutoObservable(this);
    }

    public setUserInfo(userInfo: {
        first_name: string,
        last_name: string,
        surname: string,
        id: number, id_role: number
    } | null) {
        this._userInfo = userInfo;
    }

    public get getUserInfo() {
        return this._userInfo;
    }

    public setIsOpenLeftSidebar() {
        this._isOpenLeftSidebar = !this._isOpenLeftSidebar;
    }

    public get getIsOpenLeftSidebar() {
        return this._isOpenLeftSidebar;
    }
}

export const appStore = new AppStore();