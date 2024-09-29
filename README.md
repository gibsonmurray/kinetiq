# Kinetiq

> Pronunciation: /kɪˈnetɪk/ (ki-ne-tik)

Kinetiq, derived from the word "kinetic" meaning "relating to motion," embodies the concept of dynamic state management in React applications.

Kinetiq is a lightweight React library that provides simple and efficient global state management. It offers an intuitive and flexible way to handle shared state across components in functional React applications.

## Features

-   Simple and intuitive API
-   Lightweight with minimal overhead
-   TypeScript support
-   Easy to integrate into existing React projects
-   Flexible global state management
-   Support for multiple independent global states

## Installation

You can install Kinetiq using your preferred package manager:

```bash
npm install kinetiq
```

or

```bash
bun add kinetiq
```

## Usage

Kinetiq exports two main functions that each offer different ways to manage global state.

-   `useGlobal` is a pre-built custom hook that takes an id and an (optional) initial value and returns a stateful value and a function to update it.
-   `createGlobal` is a function that takes an initial value and returns a custom hook that can be used to manage a specific global state.

### `useGlobal`

This hook is essentially `useState` with a global scope. The key is necessary to map the state to a specific value regardless of where it is in the component tree.

No matter where you apply `useGlobal`, you need the key.

```tsx
const [count, setCount] = useGlobal("count", 0)
```

The above snippet will initialize the global `count` state with a value of `0`.
Here is how we can use this in multiple components:

```tsx
const App = () => {
    return (
        <div>
            <Button />
            <Display />
        </div>
    )
}

const Button = () => {
    const [count, setCount] = useGlobal("count", 0) // we don't really need to use the 'count' value here but we have to destructure it to get the setCount function.

    return (
        <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    )
}

const Display = () => {
    const [count] = useGlobal("count") // Notice how we dont need to provide an initial value here.

    return <p>Count: {count}</p>
}
```

### `createGlobal`

This function is essentially a smaller version of Jotai's `atom` function. This allows users to create their own global `useState`-ish hooks. Instead of a mapping approach, you export a hook from the `createGlobal` function and use it anywhere in your application.

```tsx
// global.ts
export const useCount = createGlobal()
```

```tsx
// App.tsx
import { useCount } from "./global" // import the hook for usage

const App = () => {
    return (
        <div>
            <Button />
            <Display />
        </div>
    )
}

const Button = () => {
    const [count, setCount] = useCount(0) // practically useState

    return (
        <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    )
}

const Display = () => {
    const [count] = useCount() // similar to useGlobal, we don't need to provide an initial value here.

    return <p>Count: {count}</p>
}
```

## API Reference

### `useGlobal<T>(key: string, initialValue?: T): [T, (newValue: T | ((prevValue: T) => T)) => void]`

A hook for managing global state.

-   `key`: A unique string identifier for the state.
-   `initialValue`: An optional initial value for the state.
-   Returns: A tuple containing the current state value and a function to update it.

### `createGlobal<T>(): (initialValue?: T) => [T, (newValue: T | ((prevValue: T) => T)) => void]`

Creates a new global state hook.

-   Returns: A custom hook for managing a specific global state.

## TypeScript Support

Kinetiq is written in TypeScript and provides type definitions out of the box. No additional setup is required to use it in a TypeScript project.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

_Making your life easier, one line of code at a time,_ 

Cheers, 
[Gibson Murray](https://gibsonmurray.com)

## Acknowledgments

-   [React](https://react.dev/) team for the cringetastic and unintuitive useContext API (ily guys fr)
-   All contributors and users of Kinetiq
