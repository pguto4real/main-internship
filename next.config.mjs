import withTM from 'next-transpile-modules';

// Transpile modules from `@stripe/firestore-stripe-payments`
const withTranspiledModules = withTM(['@stripe/firestore-stripe-payments']);

// Define your Next.js config
const nextConfig = {
  reactStrictMode: true,
};

// Export the configuration wrapped with transpilation
export default withTranspiledModules(nextConfig);
