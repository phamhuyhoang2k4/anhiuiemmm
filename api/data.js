const { Octokit } = require('@octokit/rest');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const path = 'data.json';

  if (!token || !owner || !repo) {
    return res.status(500).json({ error: 'Cấu hình API chưa đúng. Kiểm tra GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO.' });
  }

  const octokit = new Octokit({ auth: token });
  const defaultData = { anniversaries: [], photos: [], messages: [] };

  try {
    if (req.method === 'GET') {
      try {
        const { data } = await octokit.repos.getContent({ owner, repo, path });
        const content = Buffer.from(data.content, 'base64').toString('utf-8');
        return res.json(JSON.parse(content));
      } catch (e) {
        if (e.status === 404) return res.json(defaultData);
        throw e;
      }
    }

    if (req.method === 'POST') {
      let current = defaultData;
      let sha = null;
      try {
        const { data } = await octokit.repos.getContent({ owner, repo, path });
        current = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'));
        sha = data.sha;
      } catch (e) {
        if (e.status !== 404) throw e;
      }

      const updates = req.body || {};
      const newData = {
        anniversaries: updates.anniversaries !== undefined ? updates.anniversaries : (current.anniversaries || []),
        photos: updates.photos !== undefined ? updates.photos : (current.photos || []),
        messages: updates.messages !== undefined ? updates.messages : (current.messages || [])
      };

      const content = JSON.stringify(newData, null, 2);
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        content: Buffer.from(content, 'utf-8').toString('base64'),
        message: 'Cập nhật nhật ký tình yêu',
        sha
      });
      return res.json({ success: true, data: newData });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message || 'Lỗi server' });
  }
}
