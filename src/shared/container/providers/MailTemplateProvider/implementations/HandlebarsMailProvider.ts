import handlebars from 'handlebars';

import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import IMailTemplateProvider from "../models/IMailTemplateProvider";

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
    
    
    public async paser({template, variables}: IParseMailTemplateDTO): Promise<string> {
        const parseTaplate = handlebars.compile(template);

        return parseTaplate(variables);
    }
}