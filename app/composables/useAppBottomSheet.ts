export function useAppBottomSheet() {
  const open = useState('app-bottom-sheet-open', () => false)

  function openSheet(): void {
    open.value = true
  }

  function closeSheet(): void {
    open.value = false
  }

  return {
    open,
    openSheet,
    closeSheet,
  }
}
