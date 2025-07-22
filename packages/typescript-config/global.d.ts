// biome-ignore lint/correctness/noUnusedVariables: <explanation>
interface Window {
  ReactNativeWebView: {
    postMessage: (message: string) => void
  }
}
