declare const __WEB3FORMS_ACCESS_KEY__: string;

type LeadPayload = {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  brandName?: string;
  service?: string;
  budgetRange?: string;
  startTime?: string;
  message?: string;
  website?: string;
};

const originalFetch = window.fetch.bind(window);

const isLeadRequest = (input: RequestInfo | URL) => {
  const value = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
  try {
    return new URL(value, window.location.origin).pathname === '/api/lead';
  } catch {
    return value === '/api/lead';
  }
};

const sendWeb3FormsNotification = async (lead: LeadPayload, submissionId: string) => {
  const accessKey = typeof __WEB3FORMS_ACCESS_KEY__ === 'string' ? __WEB3FORMS_ACCESS_KEY__.trim() : '';
  if (!accessKey) {
    console.warn('Web3Forms notification skipped: access key is not configured.');
    return;
  }

  const payload: Record<string, string> = {
    access_key: accessKey,
    subject: `Nexa Loops Lead | ${lead.service || 'New Enquiry'} | ${lead.fullName || 'Website Visitor'}`,
    from_name: 'Nexa Loops Website',
    name: lead.fullName || 'Not provided',
    phone: lead.phoneNumber || 'Not provided',
    brand: lead.brandName || 'Not provided',
    service: lead.service || 'Not provided',
    budget: lead.budgetRange || 'Not provided',
    timeline: lead.startTime || 'Not provided',
    ticket_id: submissionId,
    message: lead.message || 'No project brief provided',
    website_source: 'Nexa Loops Website'
  };

  if (lead.email?.trim()) payload.email = lead.email.trim();

  const response = await originalFetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload)
  });

  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.success) {
    console.warn('Web3Forms notification failed.', response.status, result?.message || 'No provider message');
  }
};

window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  if (!isLeadRequest(input)) return originalFetch(input, init);

  let lead: LeadPayload = {};
  if (typeof init?.body === 'string') {
    try {
      lead = JSON.parse(init.body) as LeadPayload;
    } catch {
      lead = {};
    }
  }

  const response = await originalFetch(input, init);
  if (!response.ok || lead.website?.trim()) return response;

  const result = await response.clone().json().catch(() => null);
  if (result?.ok && typeof result?.submissionId === 'string' && result.submissionId) {
    void sendWeb3FormsNotification(lead, result.submissionId).catch((error) => {
      console.warn('Web3Forms notification request failed.', error instanceof Error ? error.message : 'unknown');
    });
  }

  return response;
};
