export const hideVideoInfoDialog = (style: HTMLStyleElement): void => {
  style.textContent = `
.video-info-dialog {
  display: none !important;
  visibility: hidden !important;
}
`
}
