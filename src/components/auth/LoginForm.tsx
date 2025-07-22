import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../lib/supabase';
import Card from '../common/Card';

const LoginForm: React.FC = () => {
  return (
    <Card className="max-w-md mx-auto p-8">
      <Auth
        supabaseClient={supabase}
        appearance={{ 
          theme: ThemeSupa,
          // Ensure error messages are clearly visible
          style: {
            message: {
              color: 'red',
              marginBottom: '12px',
            },
          },
        }}
        providers={[]}
        redirectTo={`${window.location.origin}/dashboard`}
        // Set view to both sign in and sign up
        view="sign_in"
        showLinks={true}
      />
    </Card>
  );
};

export default LoginForm;