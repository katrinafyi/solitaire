import 'interactjs';

export function dragMoveListener(event: Interact.InteractEvent) {
  const el = event.target;
  let [x,y] = JSON.parse(el.dataset.pos ?? '[0,0]');
  x += event.dx;
  y += event.dy;

  // translate the element
  el.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  el.dataset.pos = JSON.stringify([x,y]);
}

export function dragMoveReset(event: Interact.InteractEvent) {
  const el = event.target;
  delete el.dataset.pos;

  el.style.transform = '';

}
