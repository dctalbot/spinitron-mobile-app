# Spinitron API React client

This folder contains the Spinitron REST API client. It is designed as a standalone package, so it can be used in any React or React-Native application.

## Example

`App.tsx`

```tsx
// use a proxy like https://github.com/wcbn/spinitron-proxy/
const API_BASE_URL = "https://my-spinitron-proxy.com/api";

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
        <p key={spin.id}>
          {spin.song} - {spin.artist}
        </p>
      ))}
    </div>
  );
}
```

## Type generation

The client is written in Typescript and is based on the OpenAPI specification.

To generate these types, run:

```sh
make generate
```
