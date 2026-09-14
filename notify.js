exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { title, message } = JSON.parse(event.body);

  const response = await fetch('https://api.line.me/v2/bot/message/broadcast', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      messages: [{
        type: 'text',
        text: `📢 ${title}\n\n${message}`
      }]
    })
  });

  if (!response.ok) {
    return { statusCode: 500, body: 'LINE API error' };
  }

  return { statusCode: 200, body: JSON.stringify({ success: true }) };
};
