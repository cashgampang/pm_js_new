import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';

import { LocalAuthGuard } from '../../Infrastructure/Guards/local-auth.guard';
import { Public } from '../../Infrastructure/Decorators/public.decorator';
import { TYPE, USERTYPE } from 'src/Shared/Enums/Users/Users.enum';
import { RegisterUseCase } from '../../Applications/Services/Register.usecase';
import { LoginUseCase } from '../../Applications/Services/Login.usecase';
import { Response } from 'express';
import { Roles } from '../../Infrastructure/Decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly LoginUseCase: LoginUseCase, //
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  // Guest: Register
  // @Roles(USERTYPE.SUPERADMIN)
  @Public()
  @Post('register')
  async register(
    @Body()
    dto: {
      nama: string;
      email: string;
      password: string;
      usertype: USERTYPE;
      type: TYPE;
      marketingCode: string;
      spvId?: number | null;
      isActive: boolean;
    },
  ): Promise<any> {
    return this.registerUseCase.execute(dto);
  }

  // Guest: Login -> pakai LocalAuthGuard

  // Guest: Login
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    // req.user sudah valid, berisi user object
    const tokenDto = await this.LoginUseCase.execute(req.user);

    res.cookie('access_token', tokenDto.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60,
    });

    return { message: 'Login success' };
  }

  // User: hanya yang punya role 'user' atau 'admin'
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(USERTYPE.SUPERADMIN, USERTYPE.ADMIN) // !tambahin cooo
  // @Get('me')
  // async getProfile(@Req() req) {
  //   return { message: 'Profil user terverifikasi', user: req.user };
  // }

  // // Admin only
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(USERTYPE.SUPERADMIN)
  // @Get('superadmin')
  // async getAdminData() {
  //   return { message: 'Halo Admin, data rahasia aman nih 🔐' };
  // }
}
