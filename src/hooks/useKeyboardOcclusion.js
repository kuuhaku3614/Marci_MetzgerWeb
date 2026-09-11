import { useEffect, useRef } from 'react'

/**
 * Hook to prevent mobile keyboard from occluding focused input fields.
 * Uses VisualViewport API with scrollIntoView fallback.
 * Mobile-only - does nothing on desktop.
 *
 * @param {React.RefObject<HTMLElement>} inputRef - Ref to the input/textarea element
 * @param {Object} options - Configuration options
 * @param {number} options.margin - Margin in px above the keyboard (default: 20)
 * @param {boolean} options.enabled - Enable/disable the hook (default: true)
 */
export function useKeyboardOcclusion(inputRef, { margin = 20, enabled = true } = {}) {
  const rafRef = useRef(null)
  const lastViewportHeightRef = useRef(null)

  useEffect(() => {
    if (!enabled) return

    const input = inputRef.current
    if (!input) return

    // Skip on desktop - only mobile browsers have virtual keyboards
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (!isMobile) return

    let isKeyboardOpen = false

    const handleFocus = () => {
      isKeyboardOpen = true
      lastViewportHeightRef.current = window.visualViewport?.height ?? window.innerHeight

      // Use VisualViewport API if available
      if (window.visualViewport) {
        const handleResize = () => {
          if (!isKeyboardOpen) return

          const currentHeight = window.visualViewport.height
          const previousHeight = lastViewportHeightRef.current

          // Keyboard opened if viewport shrank significantly
          if (previousHeight && currentHeight < previousHeight - 100) {
            scrollToAboveKeyboard()
          }

          lastViewportHeightRef.current = currentHeight
        }

        window.visualViewport.addEventListener('resize', handleResize)
        return () => window.visualViewport.removeEventListener('resize', handleResize)
      } else {
        // Fallback: scroll into view after keyboard animation
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = requestAnimationFrame(() => {
            scrollToAboveKeyboard()
          })
        })
      }
    }

    const handleBlur = () => {
      isKeyboardOpen = false
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }

    const scrollToAboveKeyboard = () => {
      if (!inputRef.current) return

      const element = inputRef.current
      const elementRect = element.getBoundingClientRect()
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight

      // Check if element is in the lower half of viewport
      const elementBottom = elementRect.bottom
      const keyboardTop = viewportHeight - margin

      if (elementBottom > keyboardTop) {
        // Element would be hidden - scroll it into view
        const scrollMargin = margin + 10 // Extra buffer

        if (window.visualViewport) {
          // Use VisualViewport API for precise scrolling
          const currentScrollY = window.visualViewport.pageTop
          const targetScrollY = currentScrollY + (elementBottom - keyboardTop) + scrollMargin

          window.visualViewport.scrollTo({
            top: targetScrollY,
            behavior: 'smooth'
          })
        } else {
          // Fallback to scrollIntoView
          element.scrollIntoView({
            block: 'center',
            behavior: 'smooth'
          })
        }
      }
    }

    input.addEventListener('focus', handleFocus)
    input.addEventListener('blur', handleBlur)

    return () => {
      input.removeEventListener('focus', handleFocus)
      input.removeEventListener('blur', handleBlur)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [inputRef, margin, enabled])
}
