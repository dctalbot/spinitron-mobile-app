# Spinitron API React client

This folder contains the Spinitron REST API client. It is designed as a standalone package, so it can be used in any React or React-Native application.

## Example

`App.tsx`

```tsx
const API_BASE_URL = "https://my-spinitron-proxy.com"; // spinitron terms of service require a proxy

function App() {
  return (
    <ApiClientProvider baseURL={API_BASE_URL}>
      <MyComponent />
    </ApiClientProvider>
  );
}
```

`MyComponent.tsx`

```tsx
function MyComponent() {
  const spins = useSpins({ playlist_id: 123 });
  return (
    <div>
      {spins.map((spin) => (
        <div key={spin.id}>
          {spin.song} - {spin.artist}
        </div>
      ))}
    </div>
  );
}
```
