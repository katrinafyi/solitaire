import { concat, dropLeft, lookup, takeLeft, updateAt } from 'fp-ts/lib/Array';
import { flow, pipe } from 'fp-ts/lib/function';
import { getOrElse } from 'fp-ts/lib/Option';
import { toNullable } from 'fp-ts/lib/Option';
import { Lens, lens } from 'monocle-ts/Lens';
import type { Optional } from 'monocle-ts/lib/Optional';

const drop = <A>(n: number): Lens<A[], A[]> =>
  lens(
    dropLeft(n),
    as => full => concat(as)(takeLeft(n)(full))
  );

const indexArray = <A>(n: number): Lens<A[], A> =>
  lens(
    flow(lookup(n), getOrElse<A>(() => { throw new Error()})),
    a => flow(updateAt(n, a), getOrElse<A[]>(() => []))
  );

export const error = <A>(): A => {
  throw new Error();
};

export const forceOptional = <S, A>(opt: Optional<S, A>): Lens<S, A> =>
  lens(
    flow(opt.getOption, getOrElse<A>(error)),
    opt.set
  );
