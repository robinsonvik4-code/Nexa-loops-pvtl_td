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

type Web3FormsResult = {
  success?: boolean;
  message?: string;
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

const jsonResponse = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });

const sendWeb3FormsNotification = async (lead: LeadPayload, submissionId: string) => {
  const accessKey = typeof __WEB3FORMS_ACCESS_KEY__ === 'string' ? __WEB3FORMS_ACCESS_KEY__.trim() : '';

  if (!accessKey) {
    return {
      ok: false,
      message: 'Web3Forms access key is not available in this website build. Please redeploy after checking the Vercel environment variable.'
    };
  }

  const payload: Record<string, string | boolean> = {
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
    website_source: window.location.hostname,
    botcheck: false
  };

  if (lead.email?.trim()) payload.email = lead.email.trim();

  try {
    const response = await originalFetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = (await response.json().catch(() => null)) as Web3FormsResult | null;

    if (!response.ok || !result?.success) {
      return {
        ok: false,
        message:
          typeof result?.message === 'string' && result.message.trim()
            ? `Web3Forms: ${result.message}`
            : `Web3Forms rejected the enquiry (HTTP ${response.status}).`
      };
    }

    return { ok: true, message: result.message || 'Email sent successfully.' };
  } catch (error) {
    return {
      ok: false,
      message: `Web3Forms connection failed: ${error instanceof Error ? error.message : 'Unknown browser network error'}`
    };
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

  // Preserve validation/rate-limit/server errors unchanged.
  if (!response.ok || lead.website?.trim()) return response;

  const result = await response.clone().json().catch(() => null);
  if (!result?.ok || typeof result?.submissionId !== 'string' || !result.submissionId) {
    return response;
  }

  // Web3Forms documentation expects normal API submissions to happen from the
  // browser. Wait for that result so the React form only shows success after
  // Web3Forms confirms the email submission.
  const delivery = await sendWeb3FormsNotification(lead, result.submissionId);

  if (!delivery.ok) {
    console.warn('[lead] browser Web3Forms delivery failed', delivery.message);
    return jsonResponse(
      {
        ok: false,
        code: 'WEB3FORMS_BROWSER_DELIVERY_FAILED',
        message: delivery.message
      },
      502
    );
  }

  console.info('[lead] browser Web3Forms delivery succeeded', {
    submissionId: result.submissionId
  });

  return jsonResponse(
    {
      ...result,
      ok: true,
      forwarded: true
    },
    200
  );
};
