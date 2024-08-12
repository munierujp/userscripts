export const appendStyle = (): void => {
  const styleElement = document.createElement('style')
  styleElement.textContent = `.flexible-rstlst-main .list-rst__rst-name {
width: calc(100% - 60px * 3);
}

.list-rst__bookmark {
width: calc(50px * 3);
}

@media screen and (max-width: 1260px) {
.flexible-rstlst-main .list-rst__bookmark {
  width: calc(60px * 3);
}
}

.p-btn-bkm__item {
width: calc(100% / 3);
}

.munierujp-tabelog-blocker-block-icon::before {
content: "\\f619";
}`
  document.head.append(styleElement)
}
