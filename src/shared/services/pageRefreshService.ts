let active = false;
let refreshing = false;

function handleClick(event: MouseEvent): void {
  if (!event.isTrusted || refreshing) return;
  refreshing = true;
  console.log("rafraichir")
  //window.location.reload();
}

/** Active le rechargement complet de la page au clic utilisateur. */
export function startRefreshOnClick(): void {
  if (active) return;
  active = true;
  refreshing = false;
  console.log("rafraichir")
  document.addEventListener('click', handleClick, true);
}

/** Retire l’écouteur, notamment au démontage du composant React. */
export function stopRefreshOnClick(): void {
  document.removeEventListener('click', handleClick, true);
  active = false;
  refreshing = false;
}

export const pageRefreshService = {
  start: startRefreshOnClick,
  stop: stopRefreshOnClick,
};
