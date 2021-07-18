const token = process.env.DATO_READ_ONLY_API_TOKEN;

async function saveDuelLog(newDuelLog) {
  const data = await fetch('/api/duel-logs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newDuelLog)
  }).then(response => response.json());

  return data;
}

export { saveDuelLog };
