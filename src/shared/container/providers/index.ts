import { container } from "tsyringe";
import DiskStrorageProvider from "./StroragerProvider/implementations/DiskStrorageProvider";
import IStrorageProvider from "./StroragerProvider/models/IStrorageProvider";

container.registerSingleton<IStrorageProvider>('StrorageProvider',DiskStrorageProvider);