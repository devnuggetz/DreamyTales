export type Category = {
  id: number;
  categoryName: string;
  thumbnail: string;
  stories: Story[];
};

export type Story = {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  content: string;
  tags?: string[];
  audioFile?: string;
};

export type NavigationAsProps = {
  navigation: any;
};
