import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";

export default interface IMailTemplateProvider {
    paser(data: IParseMailTemplateDTO): Promise<string>; 
}