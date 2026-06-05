import { Button } from '../components/common/Button';
import { Container } from '../components/common/Container';

export function NotFoundPage() {
  return (
    <Container className="grid min-h-[65svh] place-items-center py-24 text-center">
      <div>
        <p className="font-display text-8xl text-gold">404</p>
        <h1 className="mt-5 font-display text-4xl font-bold text-episcopal">Էջը չի գտնվել</h1>
        <Button href="/" className="mt-8">Գլխավոր էջ</Button>
      </div>
    </Container>
  );
}
