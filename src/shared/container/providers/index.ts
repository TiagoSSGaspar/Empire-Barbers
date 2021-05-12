import { container } from "tsyringe";

import EtherealMailProvider from "./MailProvider/implementations/EtherealMailProvider";
import IMailProvider from "./MailProvider/models/IMailProvider";

import HandlebarsMailProvider from "./MailTemplateProvider/implementations/HandlebarsMailProvider";
import IMailTemplateProvider from "./MailTemplateProvider/models/IMailTemplateProvider";

import DiskStrorageProvider from "./StoragerProvider/implementations/DiskStorageProvider";
import IStrorageProvider from "./StoragerProvider/models/IStorageProvider";

container.registerSingleton<IStrorageProvider>('StorageProvider',DiskStrorageProvider);
container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandlebarsMailProvider);
container.registerInstance<IMailProvider>('MailProvider',  container.resolve(EtherealMailProvider));