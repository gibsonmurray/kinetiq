import { useState, useEffect, useCallback } from "react"

// Global state storage
const globalState = new Map<string, unknown>()
const listeners = new Set<() => void>()

/**
 * A custom hook for managing global state.
 *
 * @param key - The unique identifier for the state.
 * @param initialValue - The initial value of the state (optional).
 * @returns A tuple containing the current state value and a function to update it.
 */
export function useGlobal<T>(
    key: string,
    initialValue?: T
): [T, (newValue: T | ((prevValue: T) => T)) => void] {
    // Initialize the state with the current value or initialValue
    const [value, setValue] = useState<T>(() => {
        if (!globalState.has(key) && initialValue !== undefined) {
            globalState.set(key, initialValue)
        }
        return globalState.get(key) as T
    })

    useEffect(() => {
        const listener = () => {
            setValue(globalState.get(key) as T)
        }

        listeners.add(listener)
        return () => {
            listeners.delete(listener)
        }
    }, [key])

    const setGlobalState = useCallback(
        (newValue: T | ((prevValue: T) => T)) => {
            const updatedValue =
                typeof newValue === "function"
                    ? (newValue as (prevValue: T) => T)(
                          globalState.get(key) as T
                      )
                    : newValue
            globalState.set(key, updatedValue)
            listeners.forEach((listener) => listener())
        },
        [key]
    )

    return [value, setGlobalState]
}

/**
 * Creates a new global state hook.
 *
 * @returns A custom hook for managing a specific global state.
 */
export function createGlobal<T>() {
    const subscribers = new Set<(value: T) => void>()
    let currentValue: T | undefined

    /**
     * Custom hook for using the created global state.
     *
     * @param initialValue - The initial value of the state (optional).
     * @returns A tuple containing the current state value and a function to update it.
     */
    const useGlobalState = (initialValue?: T) => {
        const [value, setValue] = useState<T>(() => {
            if (currentValue === undefined && initialValue !== undefined) {
                currentValue = initialValue
            }
            return currentValue as T
        })

        useEffect(() => {
            subscribers.add(setValue)
            return () => {
                subscribers.delete(setValue)
            }
        }, [])

        const setGlobalState = useCallback(
            (newValue: T | ((prevValue: T) => T)) => {
                currentValue =
                    typeof newValue === "function"
                        ? (newValue as (prevValue: T) => T)(currentValue as T)
                        : newValue
                subscribers.forEach((subscriber) =>
                    subscriber(currentValue as T)
                )
            },
            []
        )

        return [value, setGlobalState] as const
    }

    return useGlobalState
}
