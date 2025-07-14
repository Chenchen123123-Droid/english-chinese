// 简单的测试API路由
module.exports = async (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API服务器正常运行',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
}; 