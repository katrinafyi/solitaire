import 'interactjs';

export function dragMoveListener(event: Interact.InteractEvent) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x') || '0')) + event.dx;
  var y = (parseFloat(target.getAttribute('data-y') || '0')) + event.dy;

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x.toString());
  target.setAttribute('data-y', y.toString());
}
