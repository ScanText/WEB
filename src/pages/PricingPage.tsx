import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserInfoBlock from '../components/UserInfoBlock';

const PricingPage: React.FC = () => {
  return (
    <>
      <Header isLoggedIn={!!localStorage.getItem('loggedInUser')} username="" hasSubscription={false} />
      <UserInfoBlock />
      <Footer />
    </>
  );
};

export default PricingPage;
