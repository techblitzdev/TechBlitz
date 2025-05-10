'use server';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { getUser } from '../authed/get-user';

/**
 * Upon user signup, we create a 60% off their first 3 three
 * months of TechBlitz premium.
 * Eligible for 72 hours after signup.
 */
export const createCouponOnSignup = async () => {
  const user = await getUser();
  if (!user) {
    throw new Error('User not found');
  }

  const productId = process.env.STRIPE_PREMIUM_PRODUCT_ID;
  if (!productId) {
    throw new Error('STRIPE_PREMIUM_PRODUCT_ID is not set');
  }

  // construct a custom coupon name using the users username
  // convert blank spaces to underscores
  const couponName = `${user.username?.replace(/\s+/g, '_') || ''}60`;
  const expiresAt = Math.floor(Date.now() / 1000 + 72 * 60 * 60);

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
    redeem_by: expiresAt,
    // can only be redeemed once
    max_redemptions: 1,
  });

  // update the user record to reflect the new coupon
  await prisma.users.update({
    where: {
      uid: user.uid,
    },
    data: {
      userCustomCoupon: coupon.name,
      hasCreatedCustomSignupCoupon: true,
      userCustomCouponExpiresAt: new Date(expiresAt * 1000),
    },
  });

  return coupon;
};
