const axios = require('axios');

// DeepSeek API配置
const DEEPSEEK_API_KEY = 'sk-vs9057822df3e2c693e7545603490193';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

module.exports = async (req, res) => {
  // 设置CORS头，允许所有来源访问
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // 处理OPTIONS请求（预检请求）
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 只处理POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持POST请求' });
  }

  try {
    const { model, messages, temperature, max_tokens } = req.body;
    
    // 调用DeepSeek API
    const response = await axios({
      method: 'post',
      url: DEEPSEEK_API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      data: {
        model,
        messages,
        temperature,
        max_tokens
      }
    });

    // 返回DeepSeek API的响应
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('API代理错误:', error);
    
    // 返回友好的错误信息
    return res.status(500).json({
      error: '调用DeepSeek API出错',
      message: error.message,
      status: error.response ? error.response.status : 'unknown'
    });
  }
}; 