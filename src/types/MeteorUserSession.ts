interface MeteorUserSession {
    Id: number;
    UserId: number;
    Email: string;
    DeviceId: number;
    DeviceAuthorized: boolean;
    TokenId: number;
    Token: string;
    TwoFactor: number;
    TwoFa: boolean;
    FirstLogin: boolean;
    Modal: any;
}

export default MeteorUserSession;
