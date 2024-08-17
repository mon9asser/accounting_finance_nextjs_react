import path from 'path';

const isProd = process.env.NODE_ENV === 'production';

console.log(`appication is working in: ${process.env.NODE_ENV} mode`);

export default {
  pageExtensions: ['js', 'jsx'],
  webpack: (config) => {
    // Use the 'build' directory alias only in production
    config.resolve.alias['@'] = isProd
      ? path.join(process.cwd(), 'public/next/build')
      : path.join(process.cwd(), 'src'); // Or another dev-friendly path
    return config;
  },
  distDir: 'build', // This should be fine, but ensure it's not affecting dev mode
};




/*import path from 'path';

const isProd = process.env.NODE_ENV === 'production';

export default {
  pageExtensions: ['js', 'jsx'],
  webpack: (config) => {
    // Use the 'build' directory alias only in production
    config.resolve.alias['@'] = isProd
      ? path.join(process.cwd(), 'public/next/build')
      : path.join(process.cwd(), 'src'); // Or another dev-friendly path
    return config;
  },
  distDir: 'build', // This should be fine, but ensure it's not affecting dev mode
};
 */