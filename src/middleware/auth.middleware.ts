import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private readonly sessionService: SessionService) {}
  use(req: Request, res: Response, next: NextFunction) {
		const sessionCookie = req.cookies.swifty_merchant_session;
		if (!sessionCookie) {
			return res.status(401).send('Unauthorized from Middleware');
		}

		this.sessionService.getMerchantId(sessionCookie)
		.then((result) => {
			if (!result) {
				return res.status(401).send('Unauthorized from Middleware');
			}

			req.merchantId = result;
			next();
		})
		.catch((error) => {
			return res.status(401).send('Unauthorized from Middleware');
		});
  }
}