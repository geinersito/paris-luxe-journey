-- Migration: Newsletter Leads & Exit Popup System
-- Created: 2025-12-13
-- Description: Tables for exit intent popup, coupon management and rate limiting

-- ============================================================================
-- TABLE: newsletter_leads
-- Purpose: Store email leads from exit popup with coupon codes
-- ============================================================================

CREATE TABLE IF NOT EXISTS newsletter_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  coupon_code TEXT NOT NULL UNIQUE,
  language TEXT NOT NULL DEFAULT 'en',
  source TEXT DEFAULT 'exit_popup',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  redeemed_at TIMESTAMP WITH TIME ZONE NULL,
  redeemed_booking_id TEXT NULL,
  ip_address TEXT,
  user_agent TEXT,
  
  -- Constraints
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT language_valid CHECK (language IN ('en', 'es', 'fr', 'pt')),
  CONSTRAINT source_valid CHECK (source IN ('exit_popup', 'newsletter', 'manual'))
);

-- ============================================================================
-- INDEXES for newsletter_leads
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_leads(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_coupon ON newsletter_leads(coupon_code);
CREATE INDEX IF NOT EXISTS idx_newsletter_created ON newsletter_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_expires ON newsletter_leads(expires_at);
CREATE INDEX IF NOT EXISTS idx_newsletter_redeemed ON newsletter_leads(redeemed_at) WHERE redeemed_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_leads(expires_at, redeemed_at) 
  WHERE redeemed_at IS NULL AND expires_at > NOW();

-- ============================================================================
-- TABLE: rate_limit_exit_popup
-- Purpose: Rate limiting for exit popup submissions (prevent spam)
-- ============================================================================

CREATE TABLE IF NOT EXISTS rate_limit_exit_popup (
  ip_address TEXT PRIMARY KEY,
  attempts INTEGER DEFAULT 1,
  last_attempt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  blocked_until TIMESTAMP WITH TIME ZONE NULL,
  
  -- Constraints
  CONSTRAINT attempts_positive CHECK (attempts >= 0)
);

-- ============================================================================
-- INDEXES for rate_limit_exit_popup
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_rate_limit_ip ON rate_limit_exit_popup(ip_address);
CREATE INDEX IF NOT EXISTS idx_rate_limit_last_attempt ON rate_limit_exit_popup(last_attempt);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on newsletter_leads
ALTER TABLE newsletter_leads ENABLE ROW LEVEL SECURITY;

-- Policy: Only service role can insert (Edge Functions)
CREATE POLICY "Service role can insert newsletter leads" 
  ON newsletter_leads
  FOR INSERT 
  WITH CHECK (auth.role() = 'service_role');

-- Policy: Service role can update (for redemption)
CREATE POLICY "Service role can update newsletter leads" 
  ON newsletter_leads
  FOR UPDATE 
  USING (auth.role() = 'service_role');

-- Policy: Service role can select all
CREATE POLICY "Service role can select all newsletter leads" 
  ON newsletter_leads
  FOR SELECT 
  USING (auth.role() = 'service_role');

-- Policy: Authenticated users can read their own coupons (if email matches)
CREATE POLICY "Users can read own coupons" 
  ON newsletter_leads
  FOR SELECT 
  USING (
    auth.uid() IS NOT NULL AND 
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Enable RLS on rate_limit_exit_popup
ALTER TABLE rate_limit_exit_popup ENABLE ROW LEVEL SECURITY;

-- Policy: Only service role can manage rate limits
CREATE POLICY "Service role can manage rate limits" 
  ON rate_limit_exit_popup
  FOR ALL 
  USING (auth.role() = 'service_role');

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function: Clean expired rate limits (run daily via cron)
CREATE OR REPLACE FUNCTION clean_expired_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM rate_limit_exit_popup
  WHERE last_attempt < NOW() - INTERVAL '24 hours'
    AND (blocked_until IS NULL OR blocked_until < NOW());
END;
$$;

-- Function: Clean expired coupons (run daily via cron)
CREATE OR REPLACE FUNCTION clean_expired_coupons()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Optionally delete or archive expired unredeemed coupons
  -- For now, just mark them (they're already filtered by expires_at)
  -- You can add archival logic here if needed
  NULL;
END;
$$;

-- Function: Validate coupon (used by booking system)
CREATE OR REPLACE FUNCTION validate_coupon(p_coupon_code TEXT)
RETURNS TABLE (
  valid BOOLEAN,
  discount_percent NUMERIC,
  email TEXT,
  expires_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (redeemed_at IS NULL AND expires_at > NOW()) AS valid,
    10.0 AS discount_percent,
    nl.email,
    nl.expires_at
  FROM newsletter_leads nl
  WHERE nl.coupon_code = p_coupon_code;
END;
$$;

-- ============================================================================
-- COMMENTS (Documentation)
-- ============================================================================

COMMENT ON TABLE newsletter_leads IS 'Stores email leads from exit popup with unique coupon codes';
COMMENT ON TABLE rate_limit_exit_popup IS 'Rate limiting for exit popup to prevent spam (3 attempts per hour per IP)';
COMMENT ON FUNCTION validate_coupon IS 'Validates a coupon code and returns discount information';
COMMENT ON FUNCTION clean_expired_rate_limits IS 'Cleanup function for old rate limit entries (run daily)';

