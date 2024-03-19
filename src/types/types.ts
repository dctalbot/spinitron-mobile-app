interface AppConfig {
  name: string;
  api: {
    url: string;
  };
  donate?: {
    text: string;
    url: string;
  };
  phone?: {
    text: string;
    numberFormatted: string;
    numberRaw: string;
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
    uri: string;
    default: boolean;
    bitrate?: string;
  }[];
  review?: {
    text: string;
  };
}
