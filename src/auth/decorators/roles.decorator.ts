import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY } from "src/constants/key-decorators";
import { LEVEL_AUTHORITY } from "src/constants/level-authority";

export const Roles = (...roles: Array<keyof typeof LEVEL_AUTHORITY>) => SetMetadata(ROLES_KEY, roles);