export async function handler(event, context) {
  const data = JSON.parse(event.body);

  const response = await fetch("https://hooks.zapier.com/hooks/catch/21839270/20h3ccc/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Sent to Zapier successfully!" }),
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to send to Zapier." }),
    };
  }
}
