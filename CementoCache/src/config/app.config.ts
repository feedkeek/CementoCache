import { ApplicationConfigType } from './types';

export function InitApplicationConfig(): ApplicationConfigType {
  return {
    PORT: parseInt(process.env.PORT),
    BUILDINGS_TTL: +(process.env.BUILDINGS_TTL || 5000),
    CHECKLISTS_TTL: +(process.env.CHECKLISTS_TTL || 5000),
    CONFIG_TTL: +(process.env.CONFIG_TTL || 5000),
    MEMBERS_TTL: +(process.env.MEMBERS_TTL || 5000),

    IS_DEVELOPMENT: process.env.NODE_ENV === 'dev',
  };
}
