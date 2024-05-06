import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Request, Response } from 'express';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post("customer")
  async createCustomerSession(@Body() body: any, @Res() res: Response) {
    const idToken = body.idToken;
    const customerEmail = body.email;
    const cookieSession = await this.sessionService.createCustomerSessionCookie(idToken, customerEmail);
    res.cookie("swifty_customer_session", cookieSession, {
      maxAge: 60 * 60 * 24 * 7 * 1000,
      httpOnly: true,
      secure: true,
      path: "/",
    });
    res.send({ statusCode: HttpStatus.OK, sessionId: cookieSession });
  }

  @Post("merchant")
  async createMerchantSession(@Body() body: any, @Res() res: Response) {
    const idToken = body.idToken;
    const merchantEmail = body.email;
    const cookieSession = await this.sessionService.createMerchantSessionCookie(idToken, merchantEmail);
    res.cookie("swifty_merchant_session", cookieSession, {
      maxAge: 60 * 60 * 24 * 7 * 1000,
      httpOnly: true,
      secure: process.env.PRODUCTION === "true" ? true : false,
      path: "/",
    });
    res.send({ statusCode: HttpStatus.OK, sessionId: cookieSession});
  }

  @Get("customer")
  async getCustomerData(@Req() req: Request, @Res() res: Response) {
    const sessionCookie = req.cookies["swifty_customer_session"];
    if(!sessionCookie) {
      return res.send({ statusCode: HttpStatus.UNAUTHORIZED, message: "Unauthorized" });
    }
    const customer = await this.sessionService.getCustomerData(sessionCookie);
    res.send({ statusCode: HttpStatus.OK, data: customer });
  }

  @Get("merchant")
  async getMerchantData(@Req() req: Request, @Res() res: Response) {
    const sessionCookie = req.cookies["swifty_merchant_session"];
    if(!sessionCookie) {
      return res.send({ statusCode: HttpStatus.UNAUTHORIZED, message: "Unauthorized" });
    }
    const merchant = await this.sessionService.getMerchantData(sessionCookie);
    res.send({ statusCode: HttpStatus.OK, data: merchant });
  }
}
