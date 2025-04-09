exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: 'Preflight OK',
    };
  }

  // Handle form submission (POST)
  try {
    const data = JSON.parse(event.body);

    // You can log it or send to Zapier here
    console.log('Form submitted:', data);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ success: true, message: 'Form received' }),
    };
  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Form processing failed' }),
    };
  }
};
