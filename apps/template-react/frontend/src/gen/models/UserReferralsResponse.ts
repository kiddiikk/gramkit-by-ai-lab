export type ReferralItem = {
  invited_at: string | null;
  is_active: boolean;
};

export type UserReferralsResponse = {
  link: string | null;
  total: number;
  active: number;
  referrals: ReferralItem[];
};
