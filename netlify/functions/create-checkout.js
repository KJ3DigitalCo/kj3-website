// Creates a PayMongo Checkout Session for the ₱199 Strategy Call and returns
// its hosted checkout_url. Runs server-side only — the secret key never
// reaches the browser.
export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const secretKey = process.env.PAYMONGO_SECRET_KEY
  if (!secretKey) {
    return new Response(JSON.stringify({ error: 'Server misconfigured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const auth = Buffer.from(`${secretKey}:`).toString('base64')
  const origin = new URL(req.url).origin

  const payload = {
    data: {
      attributes: {
        line_items: [
          {
            amount: 19900,
            currency: 'PHP',
            description:
              '60-minute 1-on-1 diagnostic call with a KJ3 strategist — your offer, ads, and follow-up reviewed, plus a documented action plan.',
            name: '1-on-1 Strategy Call',
            quantity: 1,
          },
        ],
        // Only qrph is activated on this PayMongo account (covers GCash,
        // Maya, and 30+ banks via one code). Add 'card', 'gcash', 'paymaya'
        // here once those individual channels are approved separately.
        payment_method_types: ['qrph'],
        description: '1-on-1 Strategy Call — KJ3 Digital Co.',
        success_url: `${origin}/strategy-call/thank-you`,
        cancel_url: `${origin}/strategy-call`,
        send_email_receipt: true,
        show_line_items: true,
        show_description: true,
      },
    },
  }

  try {
    const response = await fetch('https://api.paymongo.com/v1/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (!response.ok) {
      const detail = result?.errors?.[0]?.detail || 'Failed to create checkout session'
      return new Response(JSON.stringify({ error: detail }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ checkoutUrl: result.data.attributes.checkout_url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Something went wrong creating your checkout session.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
