import { openai } from '@ai-sdk/openai';
import { generateText, tool, convertToModelMessages } from 'ai';
import { z } from 'zod';

// Define the Zillow property tool schema
const zillowPropertyTool = tool({
  name: 'get_zillow_property',
  description: 'Get property information from Zillow API',
  inputSchema: z.object({
    zpid: z.string().optional(),
    property_url: z.string().optional(),
  }),
  execute: async ({ zpid, property_url }) => {
    try {
      const url = 'https://zillow-com1.p.rapidapi.com/property';
      const params = new URLSearchParams();
      
      if (zpid) params.append('zpid', zpid);
      if (property_url) params.append('property_url', property_url);
      
      const fullUrl = `${url}?${params.toString()}`;
      
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': process.env.RAPIDAPI_KEY || '3983e5f152msh6744058b4f9f095p1fb1d4jsn074b64bd50db',
          'x-rapidapi-host': 'zillow-com1.p.rapidapi.com'
        }
      };

      const response = await fetch(fullUrl, options);
      
      if (!response.ok) {
        throw new Error(`Zillow API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      return {
        success: true,
        data: result,
        message: 'Property information retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'Failed to retrieve property information'
      };
    }
  },
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await generateText({
    model: openai('gpt-4o'),
    messages: messages,
    // tools: { zillowPropertyTool },
  });

  return Response.json(result);
}
