export const subscribeNewsletter = <T>(data: T) => fetch(
    '/api/newsletter/list/add',
    { method: 'POST', body: JSON.stringify(data) },
)
    .then(res => res.json());
