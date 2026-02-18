
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateWallpaper(prompt: string, aspectRatio: "9:16" | "1:1" = "9:16"): Promise<string> {
    const model = 'gemini-2.5-flash-image';
    
    const enhancedPrompt = `High quality, ultra-detailed mobile phone wallpaper, cinematic lighting, 8k resolution, artistic style: ${prompt}`;

    try {
      const response = await this.ai.models.generateContent({
        model: model,
        contents: {
          parts: [{ text: enhancedPrompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio,
          }
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      
      throw new Error("No image data returned from model");
    } catch (error) {
      console.error("Error generating wallpaper:", error);
      throw error;
    }
  }

  async suggestPrompts(baseTheme: string): Promise<string[]> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Suggest 4 highly creative, artistic, and short prompts for a mobile phone wallpaper based on the theme: "${baseTheme}". Return only the list of prompts separated by new lines, no numbers or bullets.`,
    });

    const text = response.text || '';
    return text.split('\n').filter(p => p.trim().length > 0).slice(0, 4);
  }
}

export const geminiService = new GeminiService();
