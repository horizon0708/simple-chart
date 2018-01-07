import { Container } from "inversify";
import Store from "../services/store";

const container = new Container({ defaultScope: "Singleton" });
container.bind<Store>(Store).toSelf();

export { container };
