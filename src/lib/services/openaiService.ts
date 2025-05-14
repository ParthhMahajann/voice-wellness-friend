import OpenAI from 'openai';
import { supabase } from '../supabase/client';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Only for development
});

const SYSTEM_PROMPT = `You are a compassionate and empathetic AI therapist named Voice Wellness Friend. 
Your role is to provide emotional support and guidance through active listening and thoughtful responses.
Key guidelines:
1. Always maintain a warm, supportive tone
2. Focus on understanding and validating feelings
3. Ask open-ended questions to encourage reflection
4. Provide gentle guidance without being directive
5. Recognize when to suggest professional help
6. Keep responses concise and conversational
7. Avoid medical advice or diagnosis
8. Maintain appropriate boundaries`;

export const openaiService = {
  async generateResponse(
    userInput: string,
    sessionId: string,
    userId: string
  ): Promise<{ text: string; mood: string }> {
    try {
      // Get conversation history from Supabase
      const { data: conversationHistory } = await supabase
        .from('messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('timestamp', { ascending: true });

      // Prepare conversation history for OpenAI
      const formattedHistory = conversationHistory?.map(msg => ({
        role: msg.role,
        content: msg.content,
      })) || [];

      // Add system prompt and user input
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...formattedHistory,
        { role: 'user', content: userInput },
      ];

      // Generate response from OpenAI
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 150,
      });

      const response = completion.choices[0].message.content;

      // Save the conversation to Supabase
      await supabase.from('messages').insert([
        {
          session_id: sessionId,
          user_id: userId,
          content: userInput,
          role: 'user',
          timestamp: new Date().toISOString(),
        },
        {
          session_id: sessionId,
          user_id: userId,
          content: response,
          role: 'assistant',
          timestamp: new Date().toISOString(),
        },
      ]);

      // Analyze mood using OpenAI
      const moodAnalysis = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Analyze the emotional tone of the following text and respond with a single word: positive, negative, or neutral.',
          },
          { role: 'user', content: userInput },
        ],
        temperature: 0.3,
        max_tokens: 10,
      });

      const mood = moodAnalysis.choices[0].message.content?.toLowerCase() || 'neutral';

      // Update session mood history
      await supabase
        .from('sessions')
        .update({
          mood_history: supabase.rpc('append_to_array', {
            arr: supabase.from('sessions').select('mood_history').eq('id', sessionId),
            value: mood,
          }),
        })
        .eq('id', sessionId);

      return { text: response, mood };
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw new Error('Failed to generate response. Please try again.');
    }
  },

  async generateSpeech(text: string): Promise<ArrayBuffer> {
    try {
      const response = await openai.audio.speech.create({
        model: 'tts-1',
        voice: 'alloy',
        input: text,
      });

      return await response.arrayBuffer();
    } catch (error) {
      console.error('Error generating speech:', error);
      throw new Error('Failed to generate speech. Please try again.');
    }
  },
}; 