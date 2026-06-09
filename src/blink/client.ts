import { createClient } from '@blinkdotnew/sdk';

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'kela-assistance-app-s1rn7gth',
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_sgh80M0N2m0RlQo3bw_cJLgmMWnJ8tge',
  authRequired: false,
  auth: { mode: 'managed' },
});
