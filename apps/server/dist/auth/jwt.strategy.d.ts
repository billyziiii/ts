declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor();
    validate(payload: any): Promise<{
        username: string;
        id: string;
        coinBalance: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
