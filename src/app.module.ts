import { Module } from "@nestjs/common";
import { users } from "../data";
import { CommsController } from "./app.comms.controller";
import { AppController } from "./app.controller";
import { PricingService } from "./app.pricing.service";
import { AppService } from "./app.service";
import { TemplateValuesService } from "./app.template-values.service";
import { UserService } from "./app.user.service";

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
