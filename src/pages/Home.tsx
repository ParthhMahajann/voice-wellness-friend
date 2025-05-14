import { Link } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthProvider';

export function Home() {
  const { user } = useAuth();

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-background p-8 sm:p-12">
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Your Compassionate AI Voice Companion
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Available whenever you need to talk. Experience supportive conversations and
            guided therapeutic techniques through natural voice interaction.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {user ? (
              <Link
                to="/session"
                className="rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-200 hover:shadow-xl hover:scale-105"
              >
                Start Session
              </Link>
            ) : (
              <Link
                to="/profile"
                className="rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-200 hover:shadow-xl hover:scale-105"
              >
                Get Started
              </Link>
            )}
            <Link
              to="/resources"
              className="text-lg font-semibold leading-6 text-foreground hover:text-primary transition-colors duration-200"
            >
              Learn more <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Features that support your mental wellness
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our AI voice companion is designed to provide accessible mental health
              support through natural conversation and evidence-based techniques.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div 
                  key={feature.name} 
                  className="flex flex-col rounded-2xl bg-card p-8 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                >
                  <dt className="text-xl font-semibold leading-7 text-foreground">
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Safety Notice */}
      <section className="rounded-2xl bg-muted/50 p-8 text-center backdrop-blur-sm border border-border/40">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Important Notice</h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          This AI voice companion is designed to provide supportive conversations and
          guided techniques, but it is not a replacement for professional mental health
          services. If you're experiencing a crisis, please contact emergency services
          or a mental health professional immediately.
        </p>
      </section>
    </div>
  );
}

const features = [
  {
    name: 'Natural Voice Interaction',
    description:
      'Engage in natural conversations with our AI companion, designed to understand and respond to your needs with empathy and care.',
  },
  {
    name: 'Evidence-Based Techniques',
    description:
      'Access guided exercises and techniques based on established therapeutic approaches, including CBT and mindfulness practices.',
  },
  {
    name: '24/7 Availability',
    description:
      'Get support whenever you need it, with our AI companion available around the clock to provide a listening ear and guidance.',
  },
]; 