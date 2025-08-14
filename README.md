# Rental Property Assistant

A modern chat application that uses Vercel's AI SDK to provide real-time property information from Zillow's API.

## Features

- 🤖 AI-powered chat interface using OpenAI GPT-4o-mini
- 🏠 Real-time property data from Zillow API
- 🛠️ Server-side API calls for security
- 💬 Modern, responsive chat UI
- ⚡ Built with Next.js 15 and Vercel AI SDK

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment variables:**
   Create a `.env.local` file in the root directory with:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   RAPIDAPI_KEY=3983e5f152msh6744058b4f9f095p1fb1d4jsn074b64bd50db
   ```

3. **Get your OpenAI API key:**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Add it to your `.env.local` file

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

The chat assistant can help you with:

- **Property Information:** Ask about specific properties using ZPID or Zillow URLs
- **Example queries:**
  - "Get information about property ZPID 197832"
  - "What's the price of this property: https://www.zillow.com/homedetails/..."
  - "Tell me about the property at 101 California Ave, Santa Monica"

## Architecture

- **Frontend:** Next.js 15 with React 19, Tailwind CSS
- **AI Integration:** Vercel AI SDK with OpenAI
- **API Tools:** Custom Zillow property tool using RapidAPI
- **Server-side:** API routes for secure API calls

## API Integration

The app uses the Zillow API through RapidAPI to fetch:
- Property details
- Pricing information
- Location data
- Property features

All API calls are made server-side for security and performance.

## Technologies Used

- **Framework:** Next.js 15
- **AI SDK:** Vercel AI SDK
- **Styling:** Tailwind CSS
- **API:** Zillow API (via RapidAPI)
- **Language:** TypeScript
- **Deployment:** Vercel-ready

## Security

- API keys are stored in environment variables
- All external API calls are made server-side
- No sensitive data is exposed to the client

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```
