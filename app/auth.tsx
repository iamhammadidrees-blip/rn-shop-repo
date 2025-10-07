import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity,
  } from 'react-native';
  import { useForm, Controller } from 'react-hook-form';
  import * as zod from 'zod';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { Redirect, Stack } from 'expo-router';
  import { supabase } from './lib/supabase';
  import { Toast } from 'react-native-toast-notifications';
  import { useAuth } from './providers/auth-provider';
  
  const authSchema = zod.object({
    email: zod.string().email({ message: 'Invalid email address' }),
    password: zod
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
  });
  
  export default function Auth() {
    const { session } = useAuth();
  
    if (session) return <Redirect href='/(shop)' />;
  
    const { control, handleSubmit, formState } = useForm({
      resolver: zodResolver(authSchema),
      defaultValues: {
        email: '',
        password: '',
      },
    });
  
  const signIn = async (data: zod.infer<typeof authSchema>) => {
    console.log('Attempting sign in with:', data.email);
    const { data: signInData, error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      console.error('Sign in error:', error);
      Toast.show(`Sign in failed: ${error.message}`, {
        type: 'danger',
        placement: 'top',
        duration: 3000,
      });
    } else {
      console.log('Sign in successful, session:', signInData?.session);
      Toast.show('Signed in successfully', {
        type: 'success',
        placement: 'top',
        duration: 1500,
      });
      // Navigation will happen automatically via the useAuth hook
    }
  };
  
  const signUp = async (data: zod.infer<typeof authSchema>) => {
    console.log('Attempting sign up with:', data.email);
    const { data: signUpData, error } = await supabase.auth.signUp(data);

    if (error) {
      console.error('Sign up error:', error);
      Toast.show(`Sign up failed: ${error.message}`, {
        type: 'danger',
        placement: 'top',
        duration: 3000,
      });
      return;
    }

    console.log('Sign up response:', signUpData);

    // If email confirmation is disabled, Supabase returns a session here
    if (signUpData?.session) {
      console.log('Sign up successful with session:', signUpData.session);
      Toast.show('Signed up successfully', {
        type: 'success',
        placement: 'top',
        duration: 1500,
      });
      return; // navigation handled by session redirect
    }

    // If confirmation is required, try to sign in (will fail with not confirmed)
    console.log('No session from sign up, attempting sign in...');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword(data);
    if (signInError) {
      console.log('Sign in after sign up failed:', signInError);
      Toast.show(`Check your email for verification. Error: ${signInError.message}`, {
        type: 'success',
        placement: 'top',
        duration: 3000,
      });
    } else {
      console.log('Sign in after sign up successful:', signInData?.session);
      Toast.show('Signed in successfully', {
        type: 'success',
        placement: 'top',
        duration: 1500,
      });
      // navigation handled by session redirect
    }
  };
  
    return (
      <ImageBackground
        source={{
          uri: 'https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />
        <Stack.Screen options={{ headerShown : false }} />
  
        <View style={styles.container}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Please Authenticate to continue</Text>
  
          <Controller
            control={control}
            name='email'
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  placeholder='Email'
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholderTextColor='#aaa'
                  autoCapitalize='none'
                  editable={!formState.isSubmitting}
                />
                {error && <Text style={styles.error}>{error.message}</Text>}
              </>
            )}
          />
  
          <Controller
            control={control}
            name='password'
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  placeholder='Password'
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  placeholderTextColor='#aaa'
                  autoCapitalize='none'
                  editable={!formState.isSubmitting}
                />
                {error && <Text style={styles.error}>{error.message}</Text>}
              </>
            )}
          />
  
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(signIn)}
            disabled={formState.isSubmitting}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.signUpButton]}
            onPress={handleSubmit(signUp)}
            disabled={formState.isSubmitting}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
  
  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      width: '100%',
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 18,
      color: '#ddd',
      marginBottom: 32,
    },
    input: {
      width: '90%',
      padding: 12,
      marginBottom: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 8,
      fontSize: 16,
      color: '#000',
    },
    button: {
      backgroundColor: '#6a1b9a',
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
      width: '90%',
      alignItems: 'center',
    },
    signUpButton: {
      backgroundColor: 'transparent',
      borderColor: '#fff',
      borderWidth: 1,
    },
    signUpButtonText: {
      color: '#fff',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
    error: {
      color: 'red',
      fontSize: 12,
      marginBottom: 16,
      textAlign: 'left',
      width: '90%',
    },
  });
  