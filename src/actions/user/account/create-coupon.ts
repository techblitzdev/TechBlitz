'use server';
import { prisma } from '@/lib/prisma';
import { UserRecord } from '@/types/User';
import { stripe } from '@/lib/stripe';

/**
 * Upon user signup, we create a 60% off their first 3 three
 * months of TechBlitz premium.
 * Eligible for 72 hours after signup.
 *
 * We are only hitting this action from within other actions,
 * so we can pass the userUid as a parameter.
 */
export const createCouponOnSignup = async (dbUser: UserRecord) => {
  // construct a custom coupon name using the users username
  const couponName = `${dbUser.username}60`;

  const coupon = await stripe.coupons.create({
    percent_off: 60,
    duration: 'repeating',
    duration_in_months: 3,
    applies_to: {
      products: ['prod_RYas2DNCjrG50L'],
    },
    name: couponName,
  });

  await prisma.users.update({
    where: {
      uid: dbUser.uid,
    },
    data: {
      userCustomCoupon: coupon.name,
    },
  });
  return coupon;
};
