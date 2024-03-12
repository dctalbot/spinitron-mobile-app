interface AppConfig {
  api: {
    url: string;
  };
  donate?: {
    text: string;
    url: string;
  };
  call?: {
    text: string;
    phoneFormatted: string;
    phoneRaw: string;
  };
  chat?: {
    text: string;
    url: string;
  };
  share?: {
    text: string;
    message: string;
  };
  streams: {
    text: string;
    url: string;
  }[];
  review?: {
    text: string;
  };
}

export const config: AppConfig = {
  api: {
    url: "https://spinitron-proxy.d08jp15rftr3s.us-east-2.cs.amazonlightsail.com/api",
  },
  donate: {
    text: "Give to WCBN",
    url: "https://leadersandbest.umich.edu/find/#!/give/basket/fund/361991",
  },
  call: {
    text: "Studio request line",
    phoneFormatted: "(734) 763-3500",
    phoneRaw: "17347633500",
  },
  chat: {
    text: "Message the DJ",
    url: "https://hangouts.google.com/chat/person/118357885959401668528",
  },
  streams: [
    {
      text: "Mid quality",
      url: "http://floyd.wcbn.org:8000/wcbn-mid.mp3",
    },
    {
      text: "High quality",
      url: "http://floyd.wcbn.org:8000/wcbn-hi.mp3",
    },
    {
      text: "HD quality",
      url: "http://floyd.wcbn.org:8000/wcbn-hd.mp3",
    },
  ],
  share: {
    text: "Share on social media",
    message: "I'm listening to WCBN-FM Ann Arbor!",
  },
  review: {
    text: "Write a review!",
  },
};
