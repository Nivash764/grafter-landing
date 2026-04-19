export const api = {
  getHeroContent: async () => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    const response = await fetch('./data/content.json');
    if (!response.ok) throw new Error('Failed to load hero content');
    const data = await response.json();
    return data.hero;
  },
  getFeaturesContent: async () => {
    await new Promise(resolve => setTimeout(resolve, 1400));
    const response = await fetch('./data/content.json');
    if (!response.ok) throw new Error('Failed to load features content');
    const data = await response.json();
    return data.featuresSection;
  },
  getSolutionsContent: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = await fetch('./data/content.json');
    if (!response.ok) throw new Error('Failed to load solutions content');
    const data = await response.json();
    return data.solutionsSection;
  },
  getNavigation: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = await fetch('./data/content.json');
    if (!response.ok) throw new Error('Failed to load nav content');
    const data = await response.json();
    return data.navigation;
  }
};
