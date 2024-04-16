import { useCallback, useEffect } from 'react';

export default function useInterval(
    callback: Function,
    delay: number,
    pause = false,
    dependencies: any[]
) {
    const callbackMemo = useCallback(callback, dependencies);

    useEffect(() => {
        if (pause) return;

        const loop = setTimeout(callbackMemo, delay);
        return () => clearTimeout(loop);
    }, [callbackMemo, pause]);
}
