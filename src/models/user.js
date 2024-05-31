class User {
    constructor(username = '', password = '', email = '', nickname = '', passwordChk = ''){
        this.username = username;
        this.password = password;
        this.email = email;
        this.nickname = nickname;
        this.passwordChk = passwordChk;
    }
}

export default User;