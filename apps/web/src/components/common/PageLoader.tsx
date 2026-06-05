import { LoadingState } from './LoadingState';

export function PageLoader() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-24">
      <div className="mb-10 max-w-3xl">
        <div className="h-3 w-36 animate-pulse rounded-full bg-gold/30" />
        <div className="mt-5 h-10 w-3/4 animate-pulse rounded-full bg-episcopal/10" />
        <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-episcopal/10" />
      </div>
      <LoadingState />
    </div>
  );
}
