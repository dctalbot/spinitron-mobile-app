export const config: AppConfig = {
  name: "WXYZ-FM",
  api: {
    url: "https://spinitron-proxy.foo.us-east-2.cs.amazonlightsail.com/api",
  },
  donate: {
    text: "Give to WXYZ",
    url: "https://example.com",
  },
  phone: {
    text: "Studio request line",
    numberFormatted: "(123) 456-7890",
    numberRaw: "1234567890",
  },
  chat: {
    text: "Message the DJ",
    url: "https://hangouts.google.com/chat/person/123",
  },
  streams: [
    {
      text: "Low",
      bitrate: "64 kbps",
      uri: "http://example.com/low.mp3",
      default: false,
    },
    {
      text: "High",
      bitrate: "128 kbps",
      uri: "http://example.com/high.mp3",
      default: true,
    },
  ],
  share: {
    text: "Share on social media",
    message: "I'm listening to WXYZ!",
  },
  review: {
    text: "Write a review!",
  },
};
