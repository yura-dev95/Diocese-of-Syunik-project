import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';
import { Container } from './Container';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('UI error boundary caught an error', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <section className="grid min-h-[60vh] place-items-center bg-parchment py-20">
        <Container className="max-w-2xl text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-royal/10 text-royal">
            <AlertTriangle className="size-7" />
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold text-episcopal">Տեղի ունեցավ տեխնիկական սխալ</h1>
          <p className="mt-4 leading-7 text-ink/60">
            Էջը ժամանակավորապես չի կարող ցուցադրվել։ Խնդրում ենք թարմացնել էջը կամ վերադառնալ գլխավոր էջ։
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button onClick={() => window.location.reload()} type="button">Թարմացնել էջը</Button>
            <Button href="/" variant="secondary">Գլխավոր էջ</Button>
          </div>
        </Container>
      </section>
    );
  }
}
