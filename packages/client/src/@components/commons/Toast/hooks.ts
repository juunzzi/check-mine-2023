import {useContext, useEffect, useRef, useState} from 'react'
import {ToastContext} from 'src/@components/commons/Toast/Provider'

export const useProgress = (delayMS: number) => {
    const [progress, setProgress] = useState(0)
    const animationFrameId = useRef<number>()

    useEffect(() => {
        let startTime = 0

        const handleProgress = (currentProgress: number) => {
            if (currentProgress < 100) {
                setProgress(Math.ceil(currentProgress))

                animationFrameId.current = requestAnimationFrame((nextTime) => {
                    const nextProgress = ((nextTime - startTime) / delayMS) * 100

                    return handleProgress(nextProgress)
                })
            }
        }

        animationFrameId.current = requestAnimationFrame((timestamp) => {
            startTime = timestamp

            return handleProgress(0)
        })

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current)
            }
        }
    }, [])

    return progress
}

export const useToast = () => {
    return useContext(ToastContext)
}
