import { Redirect } from 'expo-router';

const index = () => {
  // For some reason, root layout doesn't redirect to the dashboard
  // Instead we do manually here
  return <Redirect href='home' />;
};

export default index;
