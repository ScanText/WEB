import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div style={styles.wrapper}>
     <Header
        isLoggedIn={!!localStorage.getItem('loggedInUser')}
        hasSubscription={localStorage.getItem('subscription') === 'true'}
        userPhoto={localStorage.getItem('userPhoto') || null}
      />
      <main style={styles.content}>{children}</main>
      <Footer />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flexGrow: 1,
    padding: '20px',
  },
};

export default Layout;

