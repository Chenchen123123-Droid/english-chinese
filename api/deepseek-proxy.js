const axios = require('axios');

// DeepSeek API配置
const DEEPSEEK_API_KEY = 'sk-vs9057822df3e2c693e7545603490193';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

module.exports = async (req, res) => {
  // 输出调试信息
  console.log('API代理被调用', new Date().toISOString());
  console.log('请求URL:', req.url);
  console.log('请求方法:', req.method);
  console.log('请求头:', JSON.stringify(req.headers));
  
  // 设置CORS头，允许所有来源访问
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

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
    console.log('请求体:', JSON.stringify(req.body));
    
    const { model, messages, temperature, max_tokens } = req.body;
    
    // 打印请求详情
    console.log('正在向DeepSeek API发送请求...');
    console.log('请求参数:', {
      model, 
      messages: JSON.stringify(messages),
      temperature,
      max_tokens
    });
    
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
      },
      // 添加超时设置
      timeout: 30000
    });

    console.log('DeepSeek API响应状态码:', response.status);
    
    // 返回DeepSeek API的响应
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('API代理错误:', error);
    console.error('错误详情:', error.response ? JSON.stringify(error.response.data) : '无响应数据');
    
    // 返回友好的错误信息
    return res.status(error.response?.status || 500).json({
      error: '调用DeepSeek API出错',
      message: error.message,
      status: error.response ? error.response.status : 'unknown',
      details: error.response ? error.response.data : null,
      timestamp: new Date().toISOString()
    });
  }
}; 