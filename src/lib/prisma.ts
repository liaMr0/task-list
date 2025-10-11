import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL
            }
        },
        // Disable prepared statements for pgBouncer compatibility
        ...(process.env.DATABASE_URL?.includes('pooler.supabase.com') && {
            datasources: {
                db: {
                    url: `${process.env.DATABASE_URL}?pgbouncer=true&statement_cache_size=0`
                }
            }
        })
    })
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma