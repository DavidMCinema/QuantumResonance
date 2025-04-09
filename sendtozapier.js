exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

 try {
  const data = JSON.parse(event.body);
  console.log("Form received:", data);

  const zapierResponse = await fetch("https://hooks.zapier.com/hooks/catch/21839270/20h3ccc/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  // ✅ Log Zapier’s raw response body
  const zapierText = await zapierResponse.text();
  console.log("Zapier response body:", zapierText);

  if (!zapierResponse.ok) {
    throw new Error(`Zapier error: ${zapierResponse.status}`);
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ success: true })
  };
} catch (err) {
  console.error("Netlify Function Error:", err);
  return {
    statusCode: 500,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ error: 'Failed to forward to Zapier' })
  };
}

};
