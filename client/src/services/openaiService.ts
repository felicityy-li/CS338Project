/**
 * service to fetch the openai api
 */

import axios from "axios";

const OPENAI_API_URL = "https://api.openai.com/v1/completions";
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

interface Choice {
  text: string;
  index: number;
  logprobs: any;
  finish_reason: string;
}

interface GenerateDestinationResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
}

export const generateDestination = async (
  passengerData: any[]
): Promise<string> => {
  try {
    const prompt = `Based on the following passenger data, generate a refined travel destination: ${JSON.stringify(
      passengerData
    )}`;

    const response = await axios.post<GenerateDestinationResponse>(
      OPENAI_API_URL,
      { model: "text-davinci-003", prompt, max_tokens: 50 },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error generating destination:", error);
    throw new Error("Failed to generate destination");
  }
};
