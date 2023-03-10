export default function robotsHandler(req, res) {
  res.send(`
    User-agent: *
    Allow: /
  `);
};
