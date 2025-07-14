import axios from 'axios';

// DeepSeek API配置
// 使用新的API密钥 - 使用内测版API密钥
const DEEPSEEK_API_KEY = 'sk-vs9057822df3e2c693e7545603490193';
// 直接使用DeepSeek的API地址 - 使用内测版API
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// 创建一个axios实例，处理CORS
const apiClient = axios.create({
  baseURL: DEEPSEEK_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
  }
});

interface DeepSeekResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

interface ChineseName {
  name: string;
  name_en: string;
  type: string;
  type_en: string;
  meaning: string;
  meaning_en: string;
}

export async function generateChineseNames(
  englishName: string
): Promise<ChineseName[]> {
  try {
    console.log('正在调用DeepSeek API生成名字...', englishName);
    
    const response = await apiClient.post<DeepSeekResponse>(
      '',
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一个中文名字生成专家，擅长为外国名创建有意义且美丽的中文名。请为每个生成的名字提供类型和含义，并提供英文解释。',
          },
          {
            role: 'user',
            content: `请为外国名"${englishName}"生成6个不同类型的中文名，必须提供6个，不管这个外国名是什么。包括音译、意译、创意型等类型。请以JSON格式返回，格式为：[{"name":"中文名","name_en":"Chinese Name Pronunciation in English","type":"类型","type_en":"Type in English","meaning":"中文含义","meaning_en":"Meaning in English"}]`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }
    );

    console.log('DeepSeek API 响应:', response.data);

    // 解析JSON响应
    const content = response.data.choices[0].message.content;
    console.log('API响应内容:', content);
    
    const jsonMatch = content.match(/\[.*?\]/s);
    
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error('JSON解析错误:', parseError);
      }
    }
    
    // 如果没有找到有效的JSON，尝试手动解析
    console.log('尝试手动解析响应内容...');
    const nameMatches = content.match(/name["\s:]+([^"]+)/g);
    const typeMatches = content.match(/type["\s:]+([^"]+)/g);
    const meaningMatches = content.match(/meaning["\s:]+([^"]+)/g);
    
    if (nameMatches && typeMatches && meaningMatches && 
        nameMatches.length === typeMatches.length && typeMatches.length === meaningMatches.length) {
      const results: ChineseName[] = [];
      
      for (let i = 0; i < nameMatches.length; i++) {
        const nameMatch = nameMatches[i].match(/name["\s:]+([^"]+)/);
        const typeMatch = typeMatches[i].match(/type["\s:]+([^"]+)/);
        const meaningMatch = meaningMatches[i].match(/meaning["\s:]+([^"]+)/);
        
        if (nameMatch && typeMatch && meaningMatch) {
            const name = nameMatch[1].trim();
            const type = typeMatch[1].trim();
            const meaning = meaningMatch[1].trim();
            
            results.push({ 
              name, 
              name_en: name, 
              type, 
              type_en: type === "音译" ? "Transliteration" : 
                      type === "意译" ? "Meaning Translation" : 
                      type === "创意型" ? "Creative" : 
                      type === "音意结合" ? "Combined" : 
                      type === "文艺型" ? "Literary" : "Other",
              meaning, 
              meaning_en: meaning 
            });
        }
      }
      
      return results;
    }
    
    // 如果还是无法解析，尝试全文匹配
    console.log('无法解析JSON，尝试全文匹配...');
    const fullText = content;
    if (fullText.includes('中文名') || fullText.includes('音译') || fullText.includes('意译')) {
      // 简单创建一些结果，即使没有正确解析
      return [
        {
          name: '解析错误-请重试',
          name_en: 'Error-Please try again',
          type: '错误',
          type_en: 'Error',
          meaning: '无法解析AI响应，请再次尝试',
          meaning_en: 'Could not parse AI response, please try again'
        }
      ];
    }
    
    console.log('无法生成名字，返回空数组');
    // 如果还是无法解析，返回空数组
    return [];
  } catch (error) {
    console.error('调用DeepSeek API出错:', error);
    
    // 返回友好的错误信息
    return [{
      name: '连接错误',
      name_en: 'Connection Error',
      type: '错误',
      type_en: 'Error',
      meaning: 'API连接失败，请稍后重试',
      meaning_en: 'API connection failed, please try again later'
    }];
  }
} 