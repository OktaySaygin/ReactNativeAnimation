import React from 'react';
import {AuthProvider} from './src/navigation/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

function App() {

  return (
      <AuthProvider>
          <AppNavigator/>
      </AuthProvider>
  );
}

export default App;
