import { SetMetadata } from '@nestjs/common';

export const Roles = (roles: string[]) => SetMetadata('expectedRoles', roles);
