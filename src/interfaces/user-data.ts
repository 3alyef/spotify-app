export interface UserData {
  display_name: string;
  external_urls: {
    spotify: string[];
  };
  followers: {
    href: string[] | null;
    total: number;
  };
  href: string;
  id: string;
  images: string[];
  type: string;
  url: string;
}
