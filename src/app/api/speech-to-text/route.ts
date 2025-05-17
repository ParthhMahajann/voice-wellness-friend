import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { SpeechClient } from '@google-cloud/speech';

const speechClient = new SpeechClient({
  credentials: {
    client_email: process.env.NEXT_PUBLIC_DIALOGFLOW_CLIENT_EMAIL,
    private_key: process.env.NEXT_PUBLIC_DIALOGFLOW_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Convert audio to text using Google Cloud Speech-to-Text
    const buffer = await audioFile.arrayBuffer();
    const audioBytes = Buffer.from(buffer).toString('base64');

    const [response] = await speechClient.recognize({
      audio: {
        content: audioBytes,
      },
      config: {
        encoding: 'WEBM_OPUS',
        sampleRateHertz: 48000,
        languageCode: 'en-US',
      },
    });

    const transcription = response.results
      ?.map(result => result.alternatives?.[0]?.transcript)
      .join('\n');

    if (!transcription) {
      throw new Error('No transcription generated');
    }

    return NextResponse.json({ text: transcription });
  } catch (error) {
    console.error('Speech to text error:', error);
    return NextResponse.json(
      { error: 'Failed to process audio' },
      { status: 500 }
    );
  }
} 