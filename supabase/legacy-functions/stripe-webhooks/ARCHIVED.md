# ARCHIVED — stripe-webhooks

This handler is retired from the deployable source tree. No Stripe LIVE
webhook endpoint currently targets `/functions/v1/stripe-webhooks`, and no
repository caller invoking this function was found during the P0-B-08
read-only endpoint review.

The deployed Supabase runtime remains in place until a separate, explicitly
authorized runtime-delete gate is executed. The intended action is to delete
the deployed function only after that gate rechecks the endpoint inventory and
confirms there is no caller or live traffic dependency.

**No deploy is permitted from this archived path.** Do not restore this file
under `supabase/functions/` as a workaround; any future reactivation requires
a new CTO review.
