import { Module } from "@nestjs/common";
import { users } from "../data";
import { CommsController } from "./controllers/app.comms.controller";
import { AppController } from "./controllers/app.controller";
import { PricingService } from "./services/app.pricing.service";
import { AppService } from "./services/app.service";
import { TemplateValuesService } from "./services/app.template-values.service";
import { UserService } from "./services/app.user.service";

@Module({
  imports: [],
  controllers: [AppController, CommsController],
  providers: [
    AppService,
    {
      provide: UserService,
      useFactory: () => new UserService(users),
    },
    PricingService,
    TemplateValuesService,
  ],
})
export class AppModule {}
