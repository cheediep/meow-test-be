import { Controller, Get, HttpStatus, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { PricingService } from "./app.pricing.service";
import { TemplateValuesService } from "./app.template-values.service";
import { UserService } from "./app.user.service";

@Controller("comms")
export class CommsController {
  constructor(
    private readonly userService: UserService,
    private readonly pricingService: PricingService,
    private readonly templateValuesService: TemplateValuesService
  ) {
    this.userService = userService;
    this.pricingService = pricingService;
    this.templateValuesService = templateValuesService;
  }

  @Get("your-next-delivery/:userId")
  getNextDelivery(@Param("userId") userId: string, @Res() res: Response) {
    const user = this.userService.findOne(userId);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: "404" });
    }

    const activeCats = this.pricingService.filterInactiveCats(user.cats);
    if (activeCats.length === 0) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: "No active subscriptions" });
    }

    const catNames = this.templateValuesService.getSentenceFormattedNames(
      activeCats.map((cat) => cat.name)
    );
    const totalPrice =
      this.pricingService.getTotalSubscriptionPrice(activeCats);

    return res.status(HttpStatus.OK).json({
      title: `Your next delivery for ${catNames}`,
      message: `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${this.templateValuesService.possessiveFormat(catNames)} fresh food.`,
      totalPrice: totalPrice,
      freeGift: this.pricingService.hasFreeGift(totalPrice),
    });
  }
}
