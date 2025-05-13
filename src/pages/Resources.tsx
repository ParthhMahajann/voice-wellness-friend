import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

interface Resource {
  title: string;
  description: string;
  link: string;
  category: 'crisis' | 'education' | 'self-help' | 'professional';
}

export function Resources() {
  const resources: Resource[] = [
    {
      title: 'National Suicide Prevention Lifeline',
      description: '24/7, free and confidential support for people in suicidal crisis or emotional distress.',
      link: 'https://988lifeline.org',
      category: 'crisis',
    },
    {
      title: 'Crisis Text Line',
      description: 'Text HOME to 741741 to connect with a Crisis Counselor.',
      link: 'https://www.crisistextline.org',
      category: 'crisis',
    },
    {
      title: 'SAMHSA\'s National Helpline',
      description: 'Treatment referral and information service for individuals facing mental health or substance use disorders.',
      link: 'https://www.samhsa.gov/find-help/national-helpline',
      category: 'crisis',
    },
    {
      title: 'Mental Health First Aid',
      description: 'Learn how to identify, understand and respond to signs of mental health and substance use challenges.',
      link: 'https://www.mentalhealthfirstaid.org',
      category: 'education',
    },
    {
      title: 'Psychology Today',
      description: 'Find therapists, psychiatrists, and treatment centers in your area.',
      link: 'https://www.psychologytoday.com',
      category: 'professional',
    },
    {
      title: 'Headspace',
      description: 'Guided meditation and mindfulness exercises for stress reduction and better sleep.',
      link: 'https://www.headspace.com',
      category: 'self-help',
    },
    {
      title: 'Calm',
      description: 'Meditation, sleep stories, and relaxation techniques.',
      link: 'https://www.calm.com',
      category: 'self-help',
    },
    {
      title: 'Mental Health America',
      description: 'Resources for mental health education, advocacy, and support.',
      link: 'https://www.mhanational.org',
      category: 'education',
    },
  ];

  const categories = {
    crisis: 'Emergency Resources',
    education: 'Educational Content',
    'self-help': 'Self-Help Tools',
    professional: 'Professional Help',
  };

  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Wellness Resources</h1>
        <p className="text-muted-foreground">
          Educational content and tools to support your mental wellbeing journey.
        </p>
      </div>
      
      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="techniques">Techniques</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles" className="space-y-6">
          {articles.map((article, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                <Link 
                  to="#" 
                  className="text-primary font-medium hover:underline text-sm"
                >
                  Read more
                </Link>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="techniques" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {techniques.map((technique, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <span className="text-2xl">{technique.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{technique.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{technique.description}</p>
                  <Link 
                    to="#" 
                    className="text-primary font-medium hover:underline text-sm"
                  >
                    Learn this technique
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="emergency" className="space-y-6">
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-amber-900 mb-4">
                Crisis Resources
              </h3>
              <p className="mb-6 text-amber-800">
                If you or someone you know is experiencing a mental health crisis, 
                please use these resources for immediate help:
              </p>
              
              <div className="space-y-6">
                {Object.entries(groupedResources).map(([category, categoryResources]) => (
                  <section key={category} className="space-y-4">
                    <h2 className="text-2xl font-semibold">{categories[category as keyof typeof categories]}</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {categoryResources.map((resource) => (
                        <div
                          key={resource.title}
                          className="rounded-lg border p-6 transition-colors hover:bg-muted"
                        >
                          <h3 className="text-lg font-semibold">{resource.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {resource.description}
                          </p>
                          <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block text-sm text-primary hover:underline"
                          >
                            Visit Resource →
                          </a>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Sample data
const articles = [
  {
    title: "Understanding Anxiety: Causes and Management Strategies",
    excerpt: "Anxiety is a natural response to stress, but when it becomes overwhelming, it may interfere with daily activities. Learn about different types of anxiety and evidence-based strategies to manage symptoms."
  },
  {
    title: "The Science of Mindfulness: How Being Present Changes Your Brain",
    excerpt: "Research shows that mindfulness meditation can actually change the structure and function of the brain. Discover the neurological benefits of mindfulness and how to incorporate it into your daily routine."
  },
  {
    title: "Sleep and Mental Health: The Crucial Connection",
    excerpt: "Sleep and mental health are closely connected. Poor sleep can worsen mental health conditions, and mental health issues can make it harder to sleep. Learn strategies for improving both simultaneously."
  },
  {
    title: "Building Resilience: Bouncing Back from Life's Challenges",
    excerpt: "Resilience is the ability to adapt well in the face of adversity, trauma, or significant sources of stress. Explore practical ways to build your resilience and improve your mental wellbeing."
  }
];

const techniques = [
  {
    icon: "🧘",
    title: "5-Minute Meditation",
    description: "A simple guided meditation technique that you can practice anywhere to quickly reduce stress and improve focus."
  },
  {
    icon: "🫁",
    title: "4-7-8 Breathing",
    description: "A breathing technique that promotes relaxation by regulating your breath pattern to calm your nervous system."
  },
  {
    icon: "🧠",
    title: "Cognitive Reframing",
    description: "Learn to identify negative thought patterns and transform them into more balanced and helpful perspectives."
  },
  {
    icon: "🌱",
    title: "Gratitude Practice",
    description: "A simple daily practice of acknowledging things you're thankful for to improve mood and wellbeing."
  },
  {
    icon: "📝",
    title: "Expressive Writing",
    description: "A therapeutic technique that involves writing about your thoughts and feelings to process emotions."
  },
  {
    icon: "🏃‍♂️",
    title: "Movement for Mood",
    description: "Simple physical activities that can be done anywhere to boost your mood through movement."
  }
];
