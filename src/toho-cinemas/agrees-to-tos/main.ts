const checkbox = document.getElementById('terms_check') as HTMLInputElement | null

if (checkbox !== null && !checkbox.checked) {
  checkbox.click()
}
