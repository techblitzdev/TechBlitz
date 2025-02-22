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
export const createCouponOnSignup = async (dbUser: Partial<UserRecord>) => {
  if (dbUser.hasCreatedCustomSignupCoupon) {
    return;
  }

  const productId = process.env.STRIPE_PREMIUM_PRODUCT_ID;
  if (!productId) {
    throw new Error('STRIPE_PREMIUM_PRODUCT_ID is not set');
  }

  // construct a custom coupon name using the users username
  const couponName = `${dbUser.username}60`;

  // otherwise, begin the creation process
  const coupon = await stripe.coupons.create({
    percent_off: 60,
    duration: 'repeating',
    duration_in_months: 3,
    // only applies to monthly premium subscription
    applies_to: {
      products: [productId],
    },
    name: couponName,
    // must be redeemed within 72 hours
    redeem_by: Math.floor(Date.now() / 1000) + 72 * 60 * 60,
    // can only be redeemed once
    max_redemptions: 1,
  });

  // update the user record to reflect the new coupon
  await prisma.users.update({
    where: {
      uid: dbUser.uid,
    },
    data: {
      userCustomCoupon: coupon.name,
      hasCreatedCustomSignupCoupon: true,
    },
  });

  return coupon;
};
