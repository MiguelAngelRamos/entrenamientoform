import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
// 0. La forma de los datos del formulario
type FormData = {
  email: string;  
};

const LoginScreen = () => {
  
  // 1. Crear el formulario con sus valores iniciales
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: { email: '' },
  });

  // Lo que quieres hacer con los datos cuando todo está bien
  const onSubmit = (data: FormData) => {
    console.log(data); // { email: 'lo que escribió el usuario' }
  };

  return (
    <View style={styles.container}>
      {/* 2. Conectar el campo */}
      <Controller
        control={control}          // a qué formulario pertenece
        name="email"               // clave del campo en `data`
        rules={{ 
          required: 'El email es obligatorio',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Formato de email no válido'
          }
        }}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <>
            <TextInput
              value={value}
              onChangeText={onChange}   // ojo: onChangeText, no onChange
              onBlur={onBlur}
              placeholder="Email"
            />
            {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
          </>
        )}
      />

      {/* 3. Enviar */}
      <Button title="Entrar" onPress={() => handleSubmit(onSubmit)()} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 8 },
  error: { color: 'red', marginBottom: 8 },
});
