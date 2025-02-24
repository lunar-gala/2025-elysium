import { useEffect, useRef } from 'react'
import Sketch from './glslActOne/Sketch'

const ActOneThreeCanvas = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    let sketch
    if (containerRef.current) {
      sketch = new Sketch({ dom: containerRef.current })
    }

    return () => {
      if (sketch) {
        sketch.isPlaying = false
        sketch.renderer.dispose() // Dispose of the renderer to clean up resources
        containerRef.current.removeChild(sketch.renderer.domElement) // Remove the canvas element
      }
      if (containerRef) {
        containerRef.removeChild(renderer.domElement);
      }
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
}

export default ActOneThreeCanvas
