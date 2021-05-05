export default interface IHashProvider {
    ganerateHash(payload: string): Promise<string>;
    compareHash(payload: string, hashed: string): Promise<boolean>;
}