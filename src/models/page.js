class Page {
    constructor(loginId = '', page = -1, itemList = []){
        this.loginId = loginId;
        this.page = page;
        this.itemList = itemList;
    }
}

export default Page;