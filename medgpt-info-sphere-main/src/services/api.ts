
// API Service for MedGPT

// Gemini API Configuration
const GEMINI_API_KEY = "AIzaSyChX3ObhMxcH2lg8GoEv-DK_kINq4-QICA";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

// Backend API Configuration
// Update this with the actual deployed URL of your backend
const BACKEND_API_URL = "https://your-medgpt-backend-url.com/api";

// Types
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

// Function to call Gemini API
export const callGeminiAPI = async (userMessage: string): Promise<string> => {
  try {
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `You are MedGPT, a medical AI assistant specializing in medications, drug interactions, 
              and health information. Respond to the following query with accurate medical information. 
              If uncertain, state the limitations of your knowledge. 
              For serious medical concerns, always advise consulting a healthcare professional.
              User query: ${userMessage}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json() as GeminiResponse;
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Unexpected response format from Gemini API");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};

// Function to call the MedGPT backend
export const callBackendAPI = async (endpoint: string, data: any): Promise<any> => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Backend API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error calling ${endpoint}:`, error);
    throw error;
  }
};

// Specific API functions
export const getChatResponse = async (message: string): Promise<string> => {
  try {
    // First try to use your backend
    const response = await callBackendAPI("chat", { message });
    return response.response;
  } catch (error) {
    console.log("Falling back to Gemini API due to backend error:", error);
    // Fall back to Gemini if backend fails
    return callGeminiAPI(message);
  }
};

export const getMedicationInfo = async (medicationId: string): Promise<any> => {
  try {
    const response = await callBackendAPI("medications/info", { medicationId });
    return response;
  } catch (error) {
    console.error("Error getting medication info:", error);
    throw error;
  }
};

export const checkInteractions = async (medications: string[]): Promise<any> => {
  try {
    const response = await callBackendAPI("interactions/check", { medications });
    return response;
  } catch (error) {
    console.error("Error checking interactions:", error);
    throw error;
  }
};
