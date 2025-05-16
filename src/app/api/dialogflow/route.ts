import { NextResponse } from 'next/server';
import { SessionsClient } from '@google-cloud/dialogflow';

const projectId = process.env.NEXT_PUBLIC_DIALOGFLOW_PROJECT_ID!;
const clientEmail = process.env.NEXT_PUBLIC_DIALOGFLOW_CLIENT_EMAIL!;
const privateKey = process.env.NEXT_PUBLIC_DIALOGFLOW_PRIVATE_KEY!.replace(/\\n/g, '\n');

const sessionClient = new SessionsClient({
  credentials: {
    client_email: clientEmail,
    private_key: privateKey,
  },
});

export async function POST(request: Request) {
  try {
    const { text, sessionId } = await request.json();
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    const dialogflowRequest = {
      session: sessionPath,
      queryInput: {
        text: {
          text,
          languageCode: 'en-US',
        },
      },
    };

    const [response] = await sessionClient.detectIntent(dialogflowRequest);
    const result = response.queryResult;

    return NextResponse.json({
      text: result?.fulfillmentText ?? '',
      mood:
        result?.fulfillmentMessages?.find((m) => m.payload?.fields?.mood)?.payload?.fields?.mood?.stringValue ??
        'neutral',
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
} 