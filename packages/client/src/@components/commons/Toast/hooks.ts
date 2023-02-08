import {useContext, useEffect, useState} from 'react'
import {ToastContext} from 'src/@components/commons/Toast/Provider'

export const useProgress = (delayMS: number) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        let startTime = 0
        let animationFrameId: number | null = null

        const handleProgress = (currentProgress: number) => {
            if (currentProgress < 100) {
                setProgress(Math.ceil(currentProgress))

                animationFrameId = requestAnimationFrame((nextTime) => {
                    const nextProgress = ((nextTime - startTime) / delayMS) * 100

                    return handleProgress(nextProgress)
                })
            }
        }

        animationFrameId = requestAnimationFrame((timestamp) => {
            startTime = timestamp

            return handleProgress(0)
        })

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId)
            }
        }
    }, [])

    return progress
}

export const useToast = () => {
    return useContext(ToastContext)
}
